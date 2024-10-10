<!-- summary
提供了两个弹出层dialog和drawer。
provide了openPopup、closePopup方法。默认dialog，可在全局配置中进行配置。
-->
<template>
  <slot />
  <!-- 对话框 -->
  <BasicDialog
    v-model="dialog.show"
    :footer="dialog.foot"
    v-bind="dialog.attrs"
    v-for="(dialog, ind) in dialogs"
    :key="'dialog-' + ind"
  >
    <BaseRender :data="dialog.body" />
  </BasicDialog>
  <!-- 抽屉 -->
  <BasicDrawer v-model="drawer.show" v-bind="drawer.attrs" v-for="(drawer, ind) in drawers" :key="'drawer-' + ind">
    <BaseRender :data="drawer.body" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { reactive, shallowReactive, provide } from "vue";
import { showMessage, sortObjArrByKey } from "@/utils";
import { SetTimeout } from "@/vite-env";
//不取名为BaseDialog和BaseDrawer的原因是，这两个名字会被自动注册为全局组件，但是却用的很少，影响一定的性能，但又是极低频率会导入引用的组件，所以以Basic开头
import BasicDialog from "./_components/BasicDialog.vue";
import BasicDrawer from "./_components/BasicDrawer.vue";
import { BaseRenderData } from "@/components/BaseRender.vue";
import config from "@/config";
import { popupCloseAnimationDuration } from "@/utils";
import type {
  PopupType,
  DialogId,
  DrawerId,
  FootRenderData,
  DialogPopup,
  DrawerPopup,
  ClosePopupType,
  CloseDialogType,
  CloseDrawerType,
  DialogHeadTypes,
  DrawerHeadTypes,
} from "./_types";

let dialogTimer: SetTimeout = null;
let drawerTimer: SetTimeout = null;

const closeDelay = popupCloseAnimationDuration; //延迟一点置为空（为了配合动画效果）
const dialogs = reactive<DialogPopup[]>([]);
const drawers = reactive<DrawerPopup[]>([]);

/**
 * 构造生成新的attrs对象
 */
function getNewAttrs(head: any, popupId: DrawerId | DialogId): any {
  if (typeof head !== "string") return head;
  return { title: head, onClose: () => closePopup(popupId) };
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
      body,
      foot,
      createAt: Date.now(),
    })
  );
}

function closeDialog(popup: CloseDialogType = `dialog-${dialogs.at(-1)?.id ?? 0}`, destroyed = true) {
  if (popup === "all") {
    dialogs.length = 0;
    return;
  }
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
      body,
      createAt: Date.now(),
    })
  );
}

function closeDrawer(popup: CloseDrawerType = `drawer-${drawers.at(-1)?.id ?? 0}`, destroyed = true) {
  if (popup === "all") {
    drawers.length = 0;
    return;
  }
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
  if (type === "dialog") return openDialog(head, body, foot);
  if (type === "drawer") return openDrawer(head, body);
  // 如果不是弹窗类型，则打开dialog，且type的值作为dialog的footer渲染
  return openDialog(head, body, type as FootRenderData);
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
    return;
  }
  if (typeof popup === "string") {
    const isId = popup.includes("-");
    if (popup.startsWith("dialog")) {
      const isAll = popup === "dialog";
      const dia = isId ? (popup as CloseDialogType) : isAll ? "all" : undefined;
      return closeDialog(dia, destroyed);
    }
    if (popup.startsWith("drawer")) {
      const isAll = popup === "drawer";
      const dra = isId ? (popup as CloseDrawerType) : isAll ? "all" : undefined;
      return closeDrawer(dra, destroyed);
    }
    throw new Error(`暂未处理此种弹窗类型：${popup}`);
  }
  if (typeof popup === "number") {
    const ids = getTopPopupIds(popup);
    ids.forEach((id: DrawerId | DialogId) => closePopup(id));
    return;
  }
  // 排除null、事件对象
  if (typeof popup === "object" && popup) {
    const isPopupObj =
      Object.keys(popup).length <= 7 &&
      "id" in popup &&
      "name" in popup &&
      "show" in popup &&
      "attrs" in popup &&
      "body" in popup &&
      // "foot" in popup &&
      "createAt" in popup;
    if (!isPopupObj) return closePopup();
    const isDialog = popup.name === "dialog";
    return isDialog ? closeDialog(popup) : closeDrawer(popup);
  }
  throw new Error(`暂未处理此类型${typeof popup}`);
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
provide("openPopup", openPopup);
provide("closePopup", closePopup);
provide("getPopups", getPopups);
</script>
<style lang="scss" scoped></style>
