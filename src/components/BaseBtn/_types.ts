import { CommonObj, CommonSize } from "@/vite-env";
import btnsMap from ".";

export type BtnAllNames = keyof typeof btnsMap;
// export type BtnAllNames = keyof InstanceType<typeof btnsMap>;
export interface BtnsAllMap {
  // [key in keyof btnsMap]: BtnItem;
  [key: string]: BtnItem;
}

export interface BtnCfg {
  name: string;
  text?: string;
  type?: string;
  icon?: string;
  size?: string;
  plain?: boolean;
  popconfirm?: string;
}
export type BtnName = BtnAllNames | string; //常用基础按钮或其他自定义按钮
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info"; //按钮类型。注"text" 已弃用
export interface BtnAttrs {
  icon?: any;
  text?: string;
  type?: ButtonType;
  size?: CommonSize;
  plain?: boolean;
  disabled?: boolean;
  link?: boolean;
}
export interface PopconfirmAttrs {
  title?: string;
  icon?: any;
  iconColor?: any;
  description?: string;
  cancel?: () => void;
  okText?: string;
  cancelText?: string;
  confirmButtonType?: ButtonType;
  disabled?: boolean;
  [key: string]: any;
}
export interface BtnItem {
  name?: BtnName; //可以不传值
  text?: string; //按钮文本
  order?: number; //按钮顺序
  auth?: number[]; //权限
  to?: string | CommonObj | ((row: CommonObj) => string | CommonObj); //点击按钮时要跳转的页面地址
  customRules?: boolean; //是否自定义该按钮的逻辑规则（目前只有导出按钮用到了此属性）
  attrs?: BtnAttrs; //按钮属性
  validate?: boolean; //是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
  popconfirm?: boolean | PopconfirmAttrs;
}
export type BtnFn = (row: CommonObj) => BtnName | BtnItem;
export type BaseBtnType = BtnName | BtnItem | BtnFn;
