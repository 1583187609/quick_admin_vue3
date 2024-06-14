<template>
  <RouterView />
  <!-- 对话框 -->
  <template v-for="(dialog, ind) in dialogs" :key="ind">
    <BasicDialog v-model="dialog.show" :footer="dialog.foot" v-bind="dialog.attrs">
      <BaseRender :data="dialog.body" />
    </BasicDialog>
  </template>
  <!-- 抽屉 -->
  <template v-for="(drawer, ind) in drawers" :key="ind">
    <BasicDrawer v-model="drawer.show" v-bind="drawer.attrs">
      <BaseRender :data="drawer.body" />
    </BasicDrawer>
  </template>
  <!-- 使用水印 -->
  <WaterMark :text="VITE_APP_NAME" v-if="showWaterMask" />
</template>
<script lang="ts" setup>
//后续添加的
import { reactive, shallowReactive, provide, isVNode, ref, watch } from "vue";
import { showMessage, sortObjArrByKey } from "@/utils";
import { useInit } from "@/hooks";
import { SetTimeout } from "@/vite-env";
import WaterMark from "@/components/WaterMark.vue";
//不取名为BaseDialog和BaseDrawer的原因是，这两个名字会被自动注册为全局组件，但是却用的很少，影响一定的性能，但又是极低频率会导入引用的组件，所以以Basic开头
import BasicDialog from "@/components/BasicDialog.vue";
import BasicDrawer from "@/components/BasicDrawer.vue";
import { BaseRenderData } from "@/components/BaseRender.vue";
import config from "@/config";
import { popupCloseAnimationDuration } from "@/utils";
import { useRoute } from "vue-router";

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

const route = useRoute();
const showWaterMask = ref(false);
watch(route, newVal => {
  showWaterMask.value = newVal.name !== "login";
});
const { VITE_APP_NAME } = import.meta.env;
let dialogTimer: SetTimeout = null;
let drawerTimer: SetTimeout = null;

/***
 * 后续添加的
 */
// useInit(); //初始化页面
const closeDelay = popupCloseAnimationDuration; //延迟一点置为空（为了配合动画效果）
const dialogs = reactive<DialogPopup[]>([]);
const drawers = reactive<DrawerPopup[]>([]);

/**
 * 构造生成新的body对象
 */
function getNewBody(body: any): BaseRenderData {
  if (typeof body === "string") return body; //字符串也是虚拟dom
  if (!isVNode(body) && !body.component) return { component: body };
  return body;
}

/**
 * 构造生成新的attrs对象
 */
function getNewAttrs(head: any, popupId: DrawerId | DialogId): any {
  if (typeof head === "string") {
    return { title: head, onClose: () => closePopup(popupId) };
  } else {
    return head;
  }
}

/**
 * 对话框 dialog
 */
function openDialog(head: DialogHeadTypes | DialogId, body?: BaseRenderData, foot: FootRenderData = false) {
  if (dialogTimer) return showMessage("您的操作太频繁了", "warning");
  if (typeof head === "string" && head.startsWith("dialog-")) {
    const id = Number(head.split("-")[1]);
    const target = dialogs.find(it => it.id === id);
    if (target) return (target.show = true);
    return showMessage(`不存在对话框【dialog-${id}】`, "error");
  }
  const id = (dialogs.at(-1)?.id ?? -1) + 1;
  dialogs.push(
    shallowReactive<DialogPopup>({
      id,
      name: "dialog",
      show: true,
      attrs: getNewAttrs(head, `dialog-${id}`),
      body: getNewBody(body),
      foot,
      createAt: Date.now(),
    })
  );
}

function closeDialog(popup: CloseDialogType = `dialog-${dialogs.at(-1)?.id ?? 0}`, destroyed = true) {
  if (popup === "all") {
    dialogs.length = 0;
  } else {
    const ind = dialogs.findIndex(item => {
      if (typeof popup !== "string") return item === popup;
      return item.id === Number(popup.split("-")[1]);
    });
    if (ind === -1) return;
    dialogs[ind].show = false;
    if (!destroyed) return;
    dialogTimer = setTimeout(() => {
      dialogs.splice(ind, 1);
      dialogTimer = null;
    }, closeDelay);
  }
}

/**
 * 抽屉 drawer
 */
function openDrawer(head: DrawerHeadTypes | DrawerId, body?: BaseRenderData) {
  if (drawerTimer) return showMessage("您的操作太频繁了", "warning");
  if (typeof head === "string" && head.startsWith("drawer-")) {
    const id = Number(head.split("-")[1]);
    const target = drawers.find(it => it.id === id);
    if (target) return (target.show = true);
    return showMessage(`不存在抽屉【drawer-${id}】`, "error");
  }
  const id = (drawers.at(-1)?.id ?? -1) + 1;
  drawers.push(
    shallowReactive<DrawerPopup>({
      id,
      name: "drawer",
      show: true,
      attrs: getNewAttrs(head, `drawer-${id}`),
      body: getNewBody(body),
      createAt: Date.now(),
    })
  );
}

function closeDrawer(popup: CloseDrawerType = `drawer-${drawers.at(-1)?.id ?? 0}`, destroyed = true) {
  if (popup === "all") {
    drawers.length = 0;
  } else {
    const ind = drawers.findIndex(item => {
      if (typeof popup !== "string") return item === popup;
      return item.id === Number(popup.split("-")[1]);
    });
    if (ind === -1) return;
    drawers[ind].show = false;
    if (!destroyed) return;
    drawerTimer = setTimeout(() => {
      drawers.splice(ind, 1);
      drawerTimer = null;
    }, closeDelay);
  }
}

/**
 * 混合弹出层 popup
 */
function openPopup(
  head: DrawerHeadTypes | DialogHeadTypes | DialogId | DrawerId,
  body?: BaseRenderData,
  type: PopupType | FootRenderData = config?.popup?.defaultType ?? "dialog",
  foot: FootRenderData = false
) {
  if (typeof head === "string") {
    const isDiaId = head.startsWith("dialog-");
    if (isDiaId || head.startsWith("drawer-")) return isDiaId ? openDialog(head) : openDrawer(head);
  }
  if (type === "dialog") {
    openDialog(head, body, foot);
  } else if (type === "drawer") {
    openDrawer(head, body);
  } else {
    // 如果不是弹窗类型，则打开dialog，且type的值作为dialog的footer渲染
    openDialog(head, body, type as FootRenderData);
  }
}

/**
 * 获取顶层弹窗的id数组
 */
function getTopPopupIds(num = 1): (DrawerId | DialogId)[] {
  if (num <= 0) throw new Error("请传入一个正整数");
  const popups = sortObjArrByKey([...dialogs, ...drawers], "createAt", "desc");
  const topPops = popups.slice(0, num);
  return topPops?.map(it => `${it.name}-${it.id}` as DrawerId | DialogId);
}
function closePopup(popup: ClosePopupType = 1, destroyed = true): void {
  if (popup === "all") {
    closeDialog(popup);
    closeDrawer(popup);
  } else if (typeof popup === "string") {
    const isDialog = popup.startsWith("dialog");
    const isId = popup.includes("-");
    if (isDialog) {
      const isAll = popup === "dialog";
      const dia = isId ? (popup as CloseDialogType) : isAll ? "all" : undefined;
      closeDialog(dia, destroyed);
    } else {
      const isAll = popup === "drawer";
      const dra = isId ? (popup as CloseDrawerType) : isAll ? "all" : undefined;
      closeDrawer(dra, destroyed);
    }
  } else if (typeof popup === "number") {
    const ids = getTopPopupIds(popup);
    ids.forEach((id: DrawerId | DialogId) => closePopup(id));
  } else {
    const isDialog = popup.name === "dialog";
    isDialog ? closeDialog(popup) : closeDrawer(popup);
  }
}

/**
 * 获取弹出层栈
 */
function getPopups(type: PopupType) {
  if (type === "dialog") return JSON.parse(JSON.stringify(dialogs));
  if (type === "drawer") return JSON.parse(JSON.stringify(drawers));
  return JSON.parse(JSON.stringify({ dialogs, drawers }));
}

//provide提供给子组件使用
provide("openDrawer", openDrawer);
provide("closeDrawer", closeDrawer);
provide("openDialog", openDialog);
provide("closeDialog", closeDialog);
provide("openPopup", openPopup);
provide("closePopup", closePopup);
provide("getPopups", getPopups);
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
//设置 nprogress 的背景色
#nprogress {
  .bar {
    background: $color-primary !important;
  }
  .peg {
    // box-shadow: 0 0 10px #00000000, 0 0 5px #00000000 !important;
    box-shadow: 0 0 10px #dd181800, 0 0 5px #c2282800 !important;
  }
}
// .driver-popover {}
.guide-popover-card {
  // .driver-popover-arrow {}
  // .driver-popover-title {}
  // .driver-popover-description {}
  .driver-popover-close-btn {
    font-size: 26px;
    line-height: 1;
  }
  //.driver-popover-footer {
  //}
  //.driver-popover-progress-text {
  //}
  //.driver-popover-prev-btn {
  //}
  //.driver-popover-next-btn {
  //  // background: $color-primary;
  //}
}
</style>
