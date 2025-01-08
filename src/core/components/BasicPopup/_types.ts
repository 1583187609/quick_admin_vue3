import { BaseRenderData, BaseRenderComponentType } from "../BaseRender.vue";
import { FootBtnsType } from "./_components/FootBtns.vue";

export type PopupType = "drawer" | "dialog"; //弹窗类型
export type DialogId = `dialog-${number}`; //id必须大于等于0，示例："dialog-1"
export type DrawerId = `drawer-${number}`; //id必须大于等于0，示例："drawer-1"
export type FootRenderData = FootBtnsType | BaseRenderData;
export interface DialogPopup {
  id: number;
  name: "dialog";
  show: boolean;
  attrs: {
    title?: string | BaseRenderComponentType;
    footer?: FootRenderData; //底部按钮
    [key: string]: any;
  };
  body: BaseRenderData;
  createAt: number; //创建时间戳
}
export type DirectionType = "rtl" | "ltr" | "ttb" | "btt";
export interface DrawerPopup {
  id: number;
  name: "drawer";
  show: boolean;
  attrs: {
    title?: string | BaseRenderComponentType;
    direction?: DirectionType;
    footer?: FootRenderData; //底部按钮
    [key: string]: any;
  };
  body: BaseRenderData;
  createAt: number; //创建时间戳
}
export interface DrawerHeadAttrs {
  title?: string | BaseRenderComponentType;
  [key: string]: any;
}
export interface DialogHeadAttrs {
  title?: string | BaseRenderComponentType;
  [key: string]: any;
}
//打开的弹窗类型
export type OpenPopupTypes = PopupType | DialogPopup | DrawerPopup | DialogId | DrawerId;
export type ClosePopupType = OpenPopupTypes | number | "all"; //关闭的弹窗类型：'all' 关闭所有dialog、drawer；number：关闭顶层的 n 个弹窗
export type CloseDialogType = DialogPopup | DialogId | "all";
export type CloseDrawerType = DrawerPopup | DrawerId | "all";
export type DialogHeadTypes = string | DialogHeadAttrs | BaseRenderComponentType;
export type DrawerHeadTypes = string | DrawerHeadAttrs | BaseRenderComponentType;

export type OpenPopupInject = any;
export type ClosePopupInject = any;
