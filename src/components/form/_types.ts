import { FormField, FormFieldAttrs, GridValAttrs } from "@/components/form";
import { CommonObj, StrNum } from "@/vite-env";

export * from "@/components/form/_components/FieldItem";

export type BaseFormType = "cell" | "";

export interface SectionFieldsItemAttrs {
  label: string;
  fields: (FormField | FormFieldAttrs)[];
}

export type SectionFormItemType = "custom";
export interface SectionFormItemAttrs {
  prop?: string; //同ElementPlus 表单组件的prop，使用此属性后，提交的数据则挂载此属性的子属性上
  title: string;
  type?: SectionFormItemType;
  fields?: FormField[];
  fold?: boolean;
  grid?: GridValAttrs;
  pureText?: boolean; //是否是纯文本（会影响当前块的所有子级）
  readonly?: boolean; //是否只读
  disabled?: boolean; //是否禁用
  popover?: string | CommonObj;
  labelWidth?: StrNum;
}
export type SectionFormItem = false | SectionFormItemAttrs;
