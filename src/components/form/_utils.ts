import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { typeOf, propsJoinChar, getMaxLength } from "@/utils";
import { CommonObj } from "@/vite-env";
import { merge } from "lodash";
import { handleFormInitData } from "@/utils";

//处理属性继承
function handleAttrsInherit(field: FormFieldAttrs, inheritAttrs?: CommonObj) {
  if (!inheritAttrs) return;
  const { attrs, children } = field;
  const { attrs: subAttrs, ...fieAttrs } = inheritAttrs;
  field.attrs = attrs ? merge({}, subAttrs, attrs) : subAttrs;
  children?.forEach((subField: FormField) => {
    if (typeOf(subField) !== "Object") return false;
    handleAttrsInherit(subField as FormFieldAttrs, inheritAttrs);
  });
  //使用JSON.stringify是为了能够直接修改field对象，且最后以field对象的属性为准
  merge(field, fieAttrs, JSON.parse(JSON.stringify(field)));
  // merge(field, fieAttrs, structuredClone(field));
}

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
 * @param emits vue emits
 * @param model 表单初始值
 * @param inheritAttrs 表单控件继承父级的属性，例：disabled
 * @return boolean 这个字段属性是否合法（是否是对象）
 */
interface ResObj {
  data: CommonObj;
  fields: FormFieldAttrs[];
}
export function handleFields(fields: FormField[] = [], emits: any, modelValue?: CommonObj, inheritAttrs?: CommonObj) {
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
        const val = children?.length ? handleFields(children, emits, defVal).data : defVal;
        resObj.data[prop as string] = val;
        val !== undefined && emits?.("change", prop, val);
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
      val !== undefined && emits?.("change", newProp, val);
    } else if (propType === "Undefined") {
      if (children) {
        if (children.length) {
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
          Object.keys(val).length && emits?.("change", joinProp, val);
        } else {
          console.warn("children不能为空数组");
        }
      } else {
        throw new Error("不能同时没有prop和children属性");
      }
    } else {
      throw new Error(`暂未处理prop为${propType}类型的值`);
    }
    //继承父级的属性
    handleAttrsInherit(field as FormFieldAttrs, inheritAttrs);
    //让子级元素的label宽度自动统一
    if (children?.length) {
      // const maxLabelLen = getMaxLength(children);
      children?.forEach((field: FormField) => {
        if (typeOf(field) !== "Object") return false;
        // const _field = field as FormFieldAttrs;
        // if (_field.labelWidth === undefined) {
        //   _field.labelWidth = maxLabelLen + "em";
        // }
      });
    }
    resObj.fields.push(field as FormFieldAttrs);
  });
  return resObj;
}
