import { FormRules } from "element-plus";
import { RenderComponent, SlotsType } from "@/components/BaseRender.vue";
import { BaseDataType, CommonObj, OptionItem, StrNum } from "@/vite-env";
import { BaseRenderData } from "@/components/BaseRender.vue";
import { defaultValidTypes } from "./_config";
import { CascaderName, DictName } from "@/dict";

export type ValidType = keyof typeof defaultValidTypes;

export type FormItemType =
  | "input"
  | "select"
  | "date-picker"
  | "radio-group"
  | "checkbox-group"
  | "input-number"
  | "switch"
  | "cascader"
  | "custom"
  | "BaseNumberRange"
  | "autocomplete"
  | "slider"
  | "checkbox"
  | "empty"
  | "time-picker"
  | "time-select"
  | "BaseUpload"
  | "BaseEditor"
  | "addDel"; //新增删除分组
export interface PopoverAttrs {
  trigger?: "click" | "focus" | "hover" | "contextmenu";
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  content?: string;
  title?: string;
  disabled?: boolean;
  width?: StrNum;
  defaultSlot?: BaseRenderData;
}
export interface FormFieldAttrs {
  key?: any; //v-for的key，如果不写，则是默认的index作为key
  type?: FormItemType; //控件类型，例：input
  /**
   * 下面都是为了迎合业务需求而新添加的属性
   */
  // extraAttrs?: {
  //   span?: number; //占位栅栏的宽度，同ElementPlus 的 span 1~24
  //   example?: string; //示例，写在placeholder中的示例文本
  //   popover?: string | PopoverAttrs; //ElementPlus 的 popover组件
  //   tips?: string; //注意提示语，位于字段的下方
  //   pureText?: boolean; //是否纯文本展示
  //   valid?: ValidType; //校验类型
  //   before?: any; //字段前面拼接的内容，可以是文本、组件等
  //   after?: any; //字段后面拼接的内容，可以是文本、组件等
  //   className?: string | CommonObj | any[]; //写在el-form-item上的类名
  // };
  children?: FormField[];
  //控件的属性，例：placeholder
  attrs?: CommonObj;
  //插槽
  slots?: SlotsType;
  /**
   * 下面是 el-form-item 的属性
   */
  prop?: string | [string, string]; //属性名，当存在children时，可以不传
  label: string;
  class?: any; //el-form-item 的class属性
  style?: any; //el-form-item 的style属性
  required?: boolean; //是否必填
  rules?: FormRules[]; //校验规则
  options?: DictName | CascaderName | OptionItem[]; //select、cascader等的options属性
  labelWidth?: string | number; //label文字的宽度
  fetchSuggestions?: (queryStr: string, cb: any) => void; //autocomplete 时候的参数
}

export interface StandardFormFieldAttrs extends FormFieldAttrs {
  options?: OptionItem[]; //select、cascader等的options属性
}

export type FormField = BaseDataType | FormFieldAttrs;
