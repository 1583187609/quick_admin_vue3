# GlobalPopup 全局弹出层




## Summary
::: demo 
/demos/10_全局_global/3_GlobalPopup 全局弹出层/1_BasicUse.vue
:::


## Summary
::: demo 
/demos/10_全局_global/3_GlobalPopup 全局弹出层/2_OpenClose.vue
:::



### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`title`|-|`string`|"标题"|
|`badge`|-|`number \| string`|`0`|
|`max`|-|`number`|`99`|
|`bodyClass`|-|`string`|""|
|`foldable`|-|`boolean`|`false`|



### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`right`|-|-|
|`default`|-|-|



## 类型声明
::: details
/src/components/GlobalPopup.vue


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









    // 如果不是弹窗类型，则打开dialog，且type的值作为dialog的footer渲染




```

:::  


