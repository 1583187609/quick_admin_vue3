import { BaseRenderData } from "@/core/components/BaseRender.vue";
import { BaseDataType, CommonSize, OptionItem, StrNum, CommonSlots, CommonObj } from "@/core/_types";
import { DictName } from "@/dict/_types";
import { PopoverType } from "@/core/_types";

export type FormTplType = "common" | "query"; // 常规表单，查询表单
export type FormItemTplType = string;
// element-plus的表单控件类型
export type ElFormItemType =
  | "input"
  | "select"
  | "tree-select"
  | "date-picker"
  | "radio-group"
  | "checkbox-group"
  | "checkbox"
  | "input-number"
  | "switch"
  | "cascader"
  | "autocomplete"
  | "slider"
  | "time-picker"
  | "time-select";
export type SystemFormItemType =
  // 其他
  | "slot"
  | "custom"
  // 内置系统组件
  | "BaseNumberRange"
  | "BaseEditor"
  | "BaseUpload"
  | "BaseAddDelList"
  | "BaseAnyEleList";

export type FormItemType = ElFormItemType | SystemFormItemType;

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
export type FormItemTplTypes =
  | "T_Id"
  | "T_Phone"
  | "T_Password"
  | "T_Identity"
  | "T_Email"
  | "T_Price"
  | "T_Age"
  | "T_Amount"
  | "T_YesNoStatus"
  | "T_EnableStatus"
  | "T_Region"
  | "T_CreateTime"
  | "T_Remark";
export interface FormFieldAttrs {
  tpl?: FormItemTplTypes; // 模板规则
  key?: any; //v-for的key，如果不写，则是默认的index作为key
  type?: FormItemType; // 控件类型，例：input
  renderData?: BaseRenderData; // 当type为custom时有效。不会被el-form-item包裹，而是直接被BaseRender渲染
  /** 下面是 el-form-item 的属性 **/
  class?: any; //el-form-item 的class属性
  style?: any; //el-form-item 的style属性
  prop?: string | [string, string]; //属性名，存在模板时，可以不写
  label?: string;
  size?: CommonSize;
  required?: boolean; //是否必填
  rules?: CommonObj[]; //校验规则
  labelWidth?: string | number; //label文字的宽度
  /** 控件（input、select……）的属性，例：placeholder **/
  attrs?: {
    options?: DictName | OptionItem[] | Promise<OptionItem[]>; //select、cascader等的options属性
    placeholder?: string;
    disabled?: boolean; // 是否禁用
    readonly?: boolean; // 是否只读
    fetchSuggestions?: (queryStr: string, cb: any) => void; //autocomplete 时候的参数
    slots?: CommonSlots; // 各个控件的插槽
    [key: string]: any;
  };
  /** 下面是针对业务需求而新添加的快捷属性 **/
  quickAttrs?: {
    grid?: Grid; // 占位栅格子的宽度，同ElementPlus 的 el-col 的属性，可以是数字：1~24
    tips?: string; // 注意提示语，位于字段的下方
    example?: string; // 示例，写在placeholder中的示例文本
    explain?: PopoverType; // 解释内容。会以el-popover组件进行展示
    pureText?: boolean; // 是否纯文本展示
    before?: BaseRenderData; // 字段前面拼接的内容，可以是文本、组件等
    after?: BaseRenderData; // 字段后面拼接的内容，可以是文本、组件等
    middleFlexGrow?: StrNum; // 中间项的弹性伸缩值，默认1，即：flex-grow: 1,可选值为0~3，为其他值时不会生效。当出现 before 或 after 时，该属性才会生效。
    valueAlignContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  };
  /** el-form-item的 插槽 **/
  slots?: {
    label?: CommonSlots;
    error?: CommonSlots;
  };
}

export interface StandardFormFieldAttrs extends FormFieldAttrs {
  attrs?: {
    options?: OptionItem[]; //select、cascader等的options属性
  };
}

export type FormField = BaseDataType | FormFieldAttrs;

export type TriggerRuleEvent = "change" | "input" | "blur" | "focus";

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
  trigger?: TriggerRuleEvent | TriggerRuleEvent[];
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
