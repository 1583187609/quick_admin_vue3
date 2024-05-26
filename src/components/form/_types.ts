import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { CommonObj, StrNum } from "@/vite-env";

//表格列的span属性
export interface ColSpanAttrs {
  xs?: number; // <768
  sm?: number; // >=768
  md?: number; // >=992
  lg?: number; // >=1200
  xl?: number; // >=1920
  span?: number;
}

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
  span?: number;
  //表单项及其子级控件的属性
  fieldAttrs?: {
    span?: number; //表单项的属性
    // 所有子级控件的属性
    attrs?: {
      disabled?: boolean;
    };
    [key: string]: any;
  };
  pureText?: boolean; //是否是纯文本（会影响当前块的所有子级）
  popover?: string | CommonObj;
  labelWidth?: StrNum;
}
export type SectionFormItem = false | SectionFormItemAttrs;
