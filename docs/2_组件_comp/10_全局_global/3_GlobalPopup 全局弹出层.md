# GlobalPopup 全局弹出层

提供了两个弹出层`dialog`和`drawer`。默认`dialog`，可在全局配置中进行配置




## 基础使用
::: demo 打开弹窗示例。默认是打开`Dialog`。
/demos/10_全局_global/3_GlobalPopup 全局弹出层/1_BasicUse.vue
:::


## 打开与关闭
::: demo 打开弹出层可自动叠加。关闭弹出层每次默认关闭最顶层
/demos/10_全局_global/3_GlobalPopup 全局弹出层/2_OpenClose.vue
:::



## 类型声明
::: details

``` ts
export type PopupType = "drawer" | "dialog"; //弹窗类型
export type DialogId = `dialog-${number}`; //id必须大于等于0，示例："dialog-1"
export type DrawerId = `drawer-${number}`; //id必须大于等于0，示例："drawer-1"
export type FootRenderData = false | BaseRenderData;
export interface DialogPopup {
  id: number;
  name: "dialog";
  show: boolean;
  attrs: {
    title?: string;
    [key: string]: any;
  };
  body: BaseRenderData;
  foot?: FootRenderData; //底部按钮或自定义节点
  createAt: number; //创建时间戳
}
export type DirectionType = "rtl" | "ltr" | "ttb" | "btt";
export interface DrawerPopup {
  id: number;
  name: "drawer";
  show: boolean;
  attrs: {
    title?: string;
    direction?: DirectionType;
    [key: string]: any;
  };
  body: BaseRenderData;
  createAt: number; //创建时间戳
}
export interface DrawerHeadAttrs {
  title?: string;
  [key: string]: any;
}
export interface DialogHeadAttrs {
  title?: string;
  [key: string]: any;
}
//打开的弹窗类型
export type OpenPopupTypes = PopupType | DialogPopup | DrawerPopup | DialogId | DrawerId;
export type ClosePopupType = OpenPopupTypes | number | "all"; //关闭的弹窗类型：'all' 关闭所有dialog、drawer；number：关闭顶层的 n 个弹窗
export type CloseDialogType = DialogPopup | DialogId | "all";
export type CloseDrawerType = DrawerPopup | DrawerId | "all";
export type DialogHeadTypes = string | DialogHeadAttrs;
export type DrawerHeadTypes = string | DrawerHeadAttrs;
```

:::  


