import { FormField, FormFieldAttrs, FormTplType, Grid } from "@/core/components/form/_types";
import { typeOf, getStandardTplInfo } from "@/core/utils";
import { propsJoinChar } from "@/core/consts";
import { enableTpl } from "@/core/config";
import { CommonObj } from "@/core/_types";
import { defaultFormItemTplsMap } from "./_components/FieldItem/_config";
import { FootBtn } from "./_components/FooterBtns.vue";
import { getBtnObj } from "../BaseBtn";
import { BtnItem, BtnName } from "../BaseBtn/_types";
import _ from "lodash";

const { merge } = _;
/**
 * 获取AddDel分组的每个数组项对象数据
 * @param fields 每个组的字段集和
 */
export function getAddDelItem(fields?: FormField[]) {
  const obj: CommonObj = {};
  fields?.map((item: FormField) => {
    if (typeOf(item) !== "Object") return;
    const { prop } = item as FormFieldAttrs;
    obj[prop as string] = undefined;
  });
  return obj;
}

/**
 * 获取标准的字段
 */
function getStandardFieldAttrs(simpleField: any, tplType: FormTplType = "common") {
  const t = typeOf(simpleField);
  if (t === "Object") {
    let { tpl, ...field } = simpleField;
    if (tpl) field = merge(getStandardTplInfo(tpl, defaultFormItemTplsMap[tplType]), field);
    return field;
  }
  if (t === "String") return getStandardFieldAttrs({ tpl: simpleField }, tplType);
  throw new Error(`暂未处理此类型：${t}`);
}

/**
 * 获取处理后的字段（同时初始化表单数据）
 * @param formData object 表单数据对象
 * @param field 字段对象属性
 * @param model 表单初始值
 */
interface ResObj {
  data: CommonObj;
  fields: FormFieldAttrs[];
}
export function getHandleFields(
  fields: FormField[] = [],
  modelValue?: CommonObj,
  overFieldAttrs?: CommonObj,
  tplType: FormTplType = "common"
): ResObj {
  const resObj: ResObj = { data: {}, fields: [] };
  fields.forEach((originField: FormField) => {
    if (!originField) return;
    // 如果不启用模板，只可能是对象
    const field = enableTpl ? getStandardFieldAttrs(originField, tplType) : originField;
    const { type, prop } = field;
    const t = typeOf(prop);
    if (t === "String") {
      let val = modelValue?.[prop as string];
      if (type === "checkbox" && val === undefined) val = false; // 是为了处理 el-checkbox 在点击重置按钮后，选中状态不会重置的问题
      resObj.data[prop as string] = val;
      // val !== undefined && $emit?.("change", val, prop);
    } else if (t === "Array") {
      const [minProp, maxProp] = prop as [string, string];
      const maxVal = modelValue?.[maxProp];
      const minVal = modelValue?.[minProp];
      const isAllUnd = minVal === undefined && maxVal === undefined;
      const val = isAllUnd ? undefined : [minVal, maxVal];
      const newProp = (prop as string[]).join(propsJoinChar);
      resObj.data[newProp] = val;
      (field as FormFieldAttrs).prop = newProp;
      // val !== undefined && $emit?.("change", val, newProp);
    } else {
      // 如果为custom，即自定义整个表单项，含el-form-item，此时不用传入prop
      if (type !== "custom") throw new Error(`暂未处理prop为${t}类型的值`);
    }
    if (overFieldAttrs) merge(field, overFieldAttrs);
    if (tplType === "query" && field.attrs?.multiple) {
      field.attrs = Object.assign({ collapseTags: true, collapseTagsTooltip: true, maxCollapseTags: 2 }, field.attrs);
    }
    resObj.fields.push(field as FormFieldAttrs);
  });
  return resObj;
}

/**
 * 获取el-col的属性
 * @param grid 栅格属性
 * @returns
 */
export function getElColAttrs(grid: Grid = 24, colAttrs?: CommonObj) {
  if (typeof grid === "number") return { span: grid, ...colAttrs };
  if (typeof grid === "string") {
    const colNum = Number(grid);
    if (isNaN(colNum)) throw new Error(`请传入数字类型`);
    return getElColAttrs(colNum, colAttrs);
  }
  return { ...grid, ...colAttrs };
}

/**
 * 获取栅格属性
 * @param grid 栅格属性
 * @returns
 */
export function getGridAttrs(grid: Grid = 24) {
  if (typeof grid === "number") return { xs: grid, sm: grid, md: grid, lg: grid, xl: grid };
  if (typeof grid === "string") {
    const colNum = Number(grid);
    if (isNaN(colNum)) throw new Error(`请传入数字类型`);
    return getGridAttrs(colNum);
  }
  return grid;
}

/**
 * 判断是否是英文字符
 * @param str 要判断的字符
 * @returns {boolean} 是/否
 */
export function judgeIsEnChar(str: string) {
  if (!str || typeof str !== "string") return false;
  const code = str.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

/**
 * 获取底部按钮的属性（表单底部的按钮）
 * @param isStand 是否是标准的按钮属性对象
 */
export function getFootBtnAttrs(btn: FootBtn, tpl: BtnName, isStand = false): BtnItem | undefined {
  if (!btn) return;
  const t = typeOf(btn);
  if (t === "String") {
    if (judgeIsEnChar(btn as string)) return getBtnObj(btn as BtnName);
    const btnObj = getBtnObj(tpl as BtnName);
    btnObj.text = btn as string;
    return btnObj;
  }
  if (t === "Object") {
    if (isStand) return btn as BtnItem;
    return btn as BtnItem;
  }
  throw new Error(`暂未处理此类型：${t}`);
}
