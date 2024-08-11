import { FormRules } from "element-plus";
import { RenderComponent, SlotsType } from "@/components/BaseRender.vue";
import { BaseDataType, CommonObj, CommonSize, OptionItem, StrNum } from "@/vite-env";
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

export type PopoverValAttrs = string | PopoverAttrs;

export interface RowAttrs {
  gutter?: number;
  align?: "top" | "middle" | "bottom";
  justify?: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  tag?: string;
}

export interface ColSizeAttrs {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  tag?: string;
}

export type GridAttrs = {
  xs?: number | ColSizeAttrs;
  sm?: number | ColSizeAttrs;
  md?: number | ColSizeAttrs;
  lg?: number | ColSizeAttrs;
  xl?: number | ColSizeAttrs;
};

export type ColAttrs = GridAttrs & ColSizeAttrs;

export type GridValAttrs = number | string | ColAttrs;

export interface WidgetAttrs {
  placeholder?: string;
  fetchSuggestions?: (queryStr: string, cb: any) => void; //autocomplete 时候的参数
  [key: string]: any;
}

export interface FormFieldAttrs {
  key?: any; //v-for的key，如果不写，则是默认的index作为key
  type?: FormItemType; //控件类型，例：input
  /** 下面是 el-form-item 的属性 **/
  prop?: string | [string, string]; //属性名，当存在children时，可以不传
  label: string;
  size?: CommonSize;
  class?: any; //el-form-item 的class属性
  style?: any; //el-form-item 的style属性
  required?: boolean; //是否必填
  rules?: FormRules[]; //校验规则
  options?: DictName | CascaderName | OptionItem[]; //select、cascader等的options属性
  labelWidth?: string | number; //label文字的宽度
  /** 下面都是为了迎合业务需求而新添加的额外的属性 **/
  extraAttrs?: {
    grid?: GridValAttrs; //占位栅格子的宽度，同ElementPlus 的 el-col 的属性，可以是数字：1~24
    example?: string; //示例，写在placeholder中的示例文本
    popover?: PopoverValAttrs; //ElementPlus 的 popover组件
    tips?: string; //注意提示语，位于字段的下方
    pureText?: boolean; //是否纯文本展示
    disabled?: boolean; //是否禁用
    readonly?: boolean; //是否只读
    valid?: ValidType; //校验类型
    before?: any; //字段前面拼接的内容，可以是文本、组件等
    after?: any; //字段后面拼接的内容，可以是文本、组件等
  };
  children?: FormField[]; //字段子项
  /** 控件（input、select……）的属性，例：placeholder **/
  attrs?: WidgetAttrs;
  /** 插槽 **/
  slots?: SlotsType;
}

export interface StandardFormFieldAttrs extends FormFieldAttrs {
  options?: OptionItem[]; //select、cascader等的options属性
}

export type FormField = BaseDataType | FormFieldAttrs;

export interface RuleItem {
  type?: string; // string, number, boolean, method, regexp, integer, float, array, object, enum, date, url, hex, email, any
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  //min, max: type为array, string时，指长度。为number时，指大小
  min?: StrNum;
  max?: StrNum;
  len?: any; //type为array, string时，指长度。为number时，指值
  enum?: any; //例：{ type: 'enum', enum: ['admin', 'user', 'guest'] }
  // Deep Rules 对象的深层规则
  // fields: any; // 对象的属性名，数组的下标
  // defaultField: any; // 应用于对象、数组内的所有成员
  // transform: any; // 方法，对值的预处理
  // validator: any; // 自定义验证方法
  // asyncValidator: any; // 自定义异步验证方法
}
