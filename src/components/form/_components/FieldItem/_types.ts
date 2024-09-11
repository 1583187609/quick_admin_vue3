import { FormRules } from "element-plus";
import { BaseRenderData, SlotsType } from "@/components/BaseRender.vue";
import { BaseDataType, CommonSize, OptionItem, StrNum } from "@/vite-env";
import { defaultRulesTypes } from "./_config";
import { DictName } from "@/dict/_types";
import { Popover } from "@/components/_types";

export type RulesType = keyof typeof defaultRulesTypes;

export type FormItemType =
  | "input"
  | "select"
  | "tree-select"
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
  // | "BaseEditor"
  // | "time-picker"
  // | "time-select"
  | "BaseUpload"
  | "addDel"; //新增删除分组

export interface RowAttrs {
  gutter?: number;
  align?: "top" | "middle" | "bottom";
  justify?: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  tag?: string;
}

export interface ColOtherAttrs {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  tag?: string;
}

export type GridAttrs = {
  xs?: number | ColOtherAttrs;
  sm?: number | ColOtherAttrs;
  md?: number | ColOtherAttrs;
  lg?: number | ColOtherAttrs;
  xl?: number | ColOtherAttrs;
};

export type ElColAttrs = GridAttrs & ColOtherAttrs;

export type Grid = number | string | ElColAttrs;

export interface WidgetAttrs {
  placeholder?: string;
  fetchSuggestions?: (queryStr: string, cb: any) => void; //autocomplete 时候的参数
  [key: string]: any;
}

export interface FormFieldAttrs {
  key?: any; //v-for的key，如果不写，则是默认的index作为key
  type?: FormItemType; //控件类型，例：input
  /** 下面是 el-form-item 的属性 **/
  class?: any; //el-form-item 的class属性
  style?: any; //el-form-item 的style属性
  prop?: string | [string, string]; //属性名，当存在children时，可以不传
  label: string;
  size?: CommonSize;
  required?: boolean; //是否必填
  rules?: FormRules[]; //校验规则
  options?: DictName | OptionItem[]; //select、cascader等的options属性
  labelWidth?: string | number; //label文字的宽度
  /** 下面是针对业务需求而新添加的快捷属性 **/
  quickAttrs?: {
    grid?: Grid; //占位栅格子的宽度，同ElementPlus 的 el-col 的属性，可以是数字：1~24
    example?: string; //示例，写在placeholder中的示例文本
    popover?: Popover; //ElementPlus 的 popover组件
    tips?: string; //注意提示语，位于字段的下方
    pureText?: boolean; //是否纯文本展示
    disabled?: boolean; //是否禁用
    readonly?: boolean; //是否只读
    rulesType?: RulesType; //规则类型
    before?: BaseRenderData; //字段前面拼接的内容，可以是文本、组件等
    after?: BaseRenderData; //字段后面拼接的内容，可以是文本、组件等
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

// 表单字段的 prop 类型
export type FieldProp = string;
export type FieldProps = [string, string];
export type FieldPropType = FieldProp | FieldProps;
