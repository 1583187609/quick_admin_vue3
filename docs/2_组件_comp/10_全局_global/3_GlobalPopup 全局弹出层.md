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
//后续添加的
import { reactive, shallowReactive, provide } from "vue";
//不取名为BaseDialog和BaseDrawer的原因是，这两个名字会被自动注册为全局组件，但是却用的很少，影响一定的性能，但又是极低频率会导入引用的组件，所以以Basic开头
import BasicDialog from "@/components/BasicDialog.vue";

export type PopupType = "drawer" | "dialog"; //弹窗类型
export type DialogId = `dialog-${number}`; //id必须大于等于0，示例："dialog-1"
export type DrawerId = `drawer-${number}`; //id必须大于等于0，示例："drawer-1"
export type FootRenderData = false | BaseRenderData;
export type DirectionType = "rtl" | "ltr" | "ttb" | "btt";
//打开的弹窗类型
export type OpenPopupTypes = PopupType | DialogPopup | DrawerPopup | DialogId | DrawerId;
export type ClosePopupType = OpenPopupTypes | number | "all"; //关闭的弹窗类型：'all' 关闭所有dialog、drawer；number：关闭顶层的 n 个弹窗
export type CloseDialogType = DialogPopup | DialogId | "all";
export type CloseDrawerType = DrawerPopup | DrawerId | "all";
export type DialogHeadTypes = string | DialogHeadAttrs;
export type DrawerHeadTypes = string | DrawerHeadAttrs;


/***
 * 后续添加的
 */
const closeDelay = popupCloseAnimationDuration; //延迟一点置为空（为了配合动画效果）

/**
 * 构造生成新的body对象
 */
function getNewBody(body: any): BaseRenderData {
  // if (typeof body === "string") return body; //字符串也是虚拟dom
  // if (!isVNode(body) && !body.component) return { component: body };
  // return body;
  return body;

/**
 * 构造生成新的attrs对象
 */
function getNewAttrs(head: any, popupId: DrawerId | DialogId): any {

/**
 * 对话框 dialog
 */
function openDialog(head: DialogHeadTypes | DialogId, body?: BaseRenderData, foot: FootRenderData = false) {


/**
 * 抽屉 drawer
 */
function openDrawer(head: DrawerHeadTypes | DrawerId, body?: BaseRenderData) {


/**
 * 混合弹出层 popup
 */
function openPopup(
    // 如果不是弹窗类型，则打开dialog，且type的值作为dialog的footer渲染
    openDialog(head, body, type as FootRenderData);

/**
 * 获取顶层弹窗的id数组
 */
function getTopPopupIds(num = 1): (DrawerId | DialogId)[] {

/**
 * 获取弹出层栈
 */
function getPopups(type: PopupType) {

//provide提供给子组件使用
provide("openDrawer", openDrawer);
```

:::  


