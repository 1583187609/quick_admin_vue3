import { CommonObj, CommonSize } from "@/vite-env";
import { btnsMap } from "@/components/BaseBtn";
import { PopconfirmAttrs } from "../_types";

export type BtnAllNames = string & keyof typeof btnsMap;
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

export type BtnHandleClickType = "common" | "custom"; // 可选值：common（通用）、custom（自定义）

export interface BtnItem {
  name?: BtnName; //可以不传值
  text?: string; //按钮文本
  order?: number; //按钮顺序
  auth?: number[]; //权限
  to?: string | CommonObj | ((row: CommonObj) => string | CommonObj); //点击按钮时要跳转的页面地址
  validate?: boolean; //是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
  popconfirm?: boolean | string | PopconfirmAttrs;
  attrs?: BtnAttrs; //按钮属性
  handleClickType?: BtnHandleClickType; // 点击按钮后，执行的逻辑类型。可选值：common（通用）、custom（自定义）
}
export type BtnFn = (row: CommonObj) => BtnName | BtnItem;
export type BaseBtnType = BtnName | BtnItem | BtnFn;

export interface BtnsMap {
  [key: BtnName]: BtnAttrs;
}

// export interface BtnItemFull extends BtnItem {
//   popconfirm?: PopconfirmAttrs;
// }
