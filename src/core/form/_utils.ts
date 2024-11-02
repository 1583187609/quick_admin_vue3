import { FormField, FormFieldAttrs, Grid } from "@/core/form/_types";
import { typeOf, propsJoinChar } from "@/core/_utils";
import { CommonObj } from "@/vite-env";
import { handleFormInitData } from "@/core/_utils";
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
 * 是否是合法的字段（同时初始化表单数据）
 * @param formData object 表单数据对象
 * @param field 字段对象属性
 * @param $emit vue $emit
 * @param model 表单初始值
 * @return boolean 这个字段属性是否合法（是否是对象）
 */
interface ResObj {
  data: CommonObj;
  fields: FormFieldAttrs[];
}
export function handleFields(fields: FormField[] = [], $emit: any, modelValue?: CommonObj, inheritAttrs?: CommonObj): ResObj {
  const resObj: ResObj = {
    data: {},
    fields: [],
  };
  fields.forEach((field: FormField, ind: number) => {
    if (typeOf(field) !== "Object") return null;
    const { type, prop, children } = field as FormFieldAttrs;
    const propType = typeOf(prop);
    handleFormInitData(field as FormFieldAttrs, modelValue);
    if (propType === "String") {
      let defVal = modelValue?.[prop as string];
      //是为了处理 el-checkbox 在点击重置按钮后，选中状态不会重置的问题
      if (type === "checkbox" && defVal === undefined) {
        defVal = false;
      } else if (type === "addDel") {
        resObj.data[prop as string] = defVal?.length ? defVal : [getAddDelItem(children)];
      } else {
        const val = children?.length ? handleFields(children, $emit, defVal).data : defVal;
        resObj.data[prop as string] = val;
        val !== undefined && $emit?.("change", val, prop);
      }
    } else if (propType === "Array") {
      //此处不会有children
      const [minProp, maxProp] = prop as [string, string];
      const maxVal = modelValue?.[maxProp];
      const minVal = modelValue?.[minProp];
      const newProp = (prop as string[]).join(propsJoinChar);
      const isAllUnd = minVal === undefined && maxVal === undefined;
      const val = isAllUnd ? undefined : [minVal, maxVal];
      resObj.data[newProp] = val;
      (field as FormFieldAttrs).prop = newProp;
      val !== undefined && $emit?.("change", val, newProp);
    } else if (propType === "Undefined") {
      if (!children?.length) throw new Error("不能同时没有prop和children属性");
      const defVal: CommonObj = {};
      const joinProp = children
        .map((item: any) => {
          const { prop } = item;
          defVal[prop] = modelValue?.[prop];
          return prop;
        })
        .join(propsJoinChar);
      const val = defVal;
      (field as FormFieldAttrs).prop = joinProp;
      resObj.data[joinProp as string] = val;
      Object.keys(val).length && $emit?.("change", val, joinProp);
      console.warn("children不能为空数组");
    } else {
      throw new Error(`暂未处理prop为${propType}类型的值`);
    }
    if (inheritAttrs) merge(field, inheritAttrs);
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
 * 获取el-form透传到el-form-item的属性
 * @param mergeProps
 * @returns
 */
export function getFormLevelAttrs(mergeProps: CommonObj) {
  const { labelSuffix } = mergeProps;
  return {
    labelSuffix,
  };
}
