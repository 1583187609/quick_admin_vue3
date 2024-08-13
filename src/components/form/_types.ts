import { FormField, Grid } from "@/components/form/_components/FieldItem/_types";
import { BaseDataType, CommonSize, StrNum } from "@/vite-env";
import { PopoverAttrs } from "../_types";

export * from "@/components/form/_components/FieldItem/_types"

// el-form 的属性
export interface FormAttrs {
  rowKey?: string;
  [key: string]: any;
}

// el-form-item 的属性
export interface FormItemAttrs {
  prop?:string;
  label?:string;
  [key: string]: any;
}

export type FormStyleType = "cell" | "";

export type SectionFormItemType = "custom";
export interface SectionFormItemAttrs {
  prop?: string; //同ElementPlus 表单组件的prop，使用此属性后，提交的数据则挂载此属性的子属性上
  title: string;
  type?: SectionFormItemType;
  fold?: boolean; //是否折叠
  grid?: Grid;//栅格（会影响当前块的所有子级）
  fields?: FormField[];
  pureText?: boolean; //是否是纯文本（会影响当前块的所有子级）
  readonly?: boolean; //是否只读（会影响当前块的所有子级）
  disabled?: boolean; //是否禁用（会影响当前块的所有子级）
  size?: CommonSize; //控件大小（会影响当前块的所有子级）
  popover?: string | PopoverAttrs; // popover气泡
  labelWidth?: StrNum; //label宽度（会影响当前块的所有子级）
}
export type SectionFormItem = BaseDataType | SectionFormItemAttrs;

