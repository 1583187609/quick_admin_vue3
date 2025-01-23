import { FormField } from "@/core/components/form/_components/FieldItem/_types";
import { BaseDataType } from "@/core/_types";
import { PopoverAttrs } from "@/core/_types";

export * from "@/core/components/form/_components/FieldItem/_types";

// el-form 的属性
export interface FormAttrs {
  rowKey?: string;
  [key: string]: any;
}

export type FormStyleType = "cell";

export type SectionFormItemType = "slot";
export interface SectionFormItemAttrs {
  prop?: string; // 同ElementPlus 表单组件的prop，使用此属性后，提交的数据则挂载此属性的子属性上
  title: string;
  type?: SectionFormItemType;
  fold?: boolean; // 是否折叠
  fields?: FormField[];
  description?: string; // 步骤条的描述文字
  popover?: string | PopoverAttrs; // popover气泡
}
export type SectionFormItem = BaseDataType | SectionFormItemAttrs;
