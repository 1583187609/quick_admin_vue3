import { CommonObj, CommonSize } from "@/core/_types";
import { defaultBtns } from "@/core/components/BaseBtn";
import { PopconfirmAttrs } from "../_types";
import { ThemeColorType } from "@/utils";

export type BtnAllNames = string & keyof typeof defaultBtns;
// export type BtnAllNames = keyof InstanceType<typeof defaultBtns>;
export interface BtnsAllMap {
  // [key in keyof defaultBtns]: BtnItem;
  [key: string]: BtnItem;
}

export interface BtnCfg {
  tpl: string;
  text?: string;
  type?: string;
  icon?: string;
  size?: string;
  plain?: boolean;
  popconfirm?: string;
}
export type BtnName = BtnAllNames | string; //常用基础按钮或其他自定义按钮
export interface BtnAttrs {
  icon?: any;
  text?: boolean;
  type?: ThemeColorType;
  size?: CommonSize;
  plain?: boolean;
  disabled?: boolean;
  link?: boolean;
}

export type BtnHandleClickType = "" | "common"; // 可选值：common（通用）

export interface BtnItem {
  tpl?: BtnName; //可以不传值
  name: BtnName;
  text?: string; //按钮文本
  to?: string | CommonObj | ((row: CommonObj) => string | CommonObj); //点击按钮时要跳转的页面地址
  auth?: number[]; //权限
  order?: number; //按钮顺序
  handleClickType?: BtnHandleClickType; // 点击按钮后，执行的逻辑类型。可选值：common（通用）
  validateForm?: boolean; //是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
  popconfirm?: boolean | string | PopconfirmAttrs;
  isDebounce?: boolean; // 是否防抖。默认为 true
  attrs?: BtnAttrs; //按钮属性
}

export interface EndBtnItem extends BtnItem {
  popconfirm?: PopconfirmAttrs;
}
export type BtnFn = (row: CommonObj) => BtnName | BtnItem;
export type BaseBtnType = BtnName | BtnItem | BtnFn;

export interface BtnsMap {
  [key: BtnName]: BtnAttrs;
}

export type HandleAuthFn = (auth: (number | { code: number; type?: "disabled" })[]) => boolean | "disabled";

// export interface BtnItemFull extends BtnItem {
//   popconfirm?: PopconfirmAttrs;
// }
