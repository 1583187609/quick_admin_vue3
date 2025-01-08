<!-- summary
  目标：通过打开和关闭两个方法，实现打开/关闭全局弹窗，同时让弹窗属性统一，开发时无需关心属性设置，但支持属性值覆盖。
  目前只提供了两种弹出层：dialog 和 drawer，默认为 dialog。
-->
<template>
  <slot />
  <!-- 对话框 -->
  <BasicDialog v-model="dialog.show" v-bind="dialog.attrs" v-for="(dialog, ind) in dialogs" :key="'dialog-' + ind">
    <BaseRender :renderData="dialog.body" />
  </BasicDialog>
  <!-- 抽屉 -->
  <BasicDrawer v-model="drawer.show" v-bind="drawer.attrs" v-for="(drawer, ind) in drawers" :key="'drawer-' + ind">
    <BaseRender :renderData="drawer.body" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { reactive, shallowReactive, provide, toRaw } from "vue";
import { defaultPopupType, isRenderData, showMessage, sortObjArrByKey, typeOf } from "@/utils";
import { CommonObj, SetTimeout } from "@/core/_types";
//不取名为BaseDialog和BaseDrawer的原因是，这两个名字会被自动注册为全局组件，但是却用的很少，影响一定的性能，但又是极低频率会导入引用的组件，所以以Basic开头
import BasicDialog from "./_components/BasicDialog.vue";
import BasicDrawer from "./_components/BasicDrawer.vue";
import { BaseRenderData } from "@/core/components/BaseRender.vue";
import { popupCloseAnimationDuration, defaultDialogAttrs, defaultDrawerAttrs } from "@/utils";
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
 * 判断是否是弹窗对象
 * @tips 用作排除null、事件对象
 */
function getIsPopupObj(popup: CommonObj) {
  if (Object.keys(popup).length > 7) return false;
  return "id" in popup && "name" in popup && "show" in popup && "attrs" in popup && "body" in popup && "createAt" in popup;
}

/**
 * 获取弹出层的属性
 */
function getPopupAttrs(head: any, popupId: DrawerId | DialogId, defAttrs?: CommonObj): any {
  if (isRenderData(head)) return { ...defAttrs, title: head, onClose: () => closePopup(popupId) };
  return { ...defAttrs, ...head };
}

/**
 * 对话框 dialog
 */
function openDialog(head: DialogHeadTypes | DialogId, body?: BaseRenderData) {
  if (dialogTimer) return showMessage("您的操作太频繁了", "warning");
  const t = typeOf(head);
  if (t === "String") {
    if (head.startsWith("dialog-") && !body) {
      const id = Number(head.split("-")[1]);
      const target = dialogs.find(it => it.id === id);
      if (target) return (target.show = true);
      return showMessage(`不存在对话框【dialog-${id}】`, "error");
    }
  }
  const id = (dialogs.at(-1)?.id ?? -1) + 1;
  dialogs.push(
    shallowReactive<DialogPopup>({
      id,
      name: "dialog",
      show: true,
      attrs: getPopupAttrs(head, `dialog-${id}`, defaultDialogAttrs),
      body,
      createAt: Date.now(),
    })
  );
}

function closeDialog(popup: CloseDialogType = `dialog-${dialogs.at(-1)?.id ?? 0}`) {
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
  const { destroyOnClose } = dialogs[ind].attrs;
  if (!destroyOnClose) return;
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
  const t = typeOf(head);
  if (t === "String") {
    if (head.startsWith("drawer-") && !body) {
      const id = Number(head.split("-")[1]);
      const target = drawers.find(it => it.id === id);
      if (target) return (target.show = true);
      return showMessage(`不存在抽屉【drawer-${id}】`, "error");
    }
  }
  const id = (drawers.at(-1)?.id ?? -1) + 1;
  drawers.push(
    shallowReactive<DrawerPopup>({
      id,
      name: "drawer",
      show: true,
      attrs: getPopupAttrs(head, `drawer-${id}`, defaultDrawerAttrs),
      body,
      createAt: Date.now(),
    })
  );
}

function closeDrawer(popup: CloseDrawerType = `drawer-${drawers.at(-1)?.id ?? 0}`) {
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
  const { destroyOnClose } = drawers[ind].attrs;
  if (!destroyOnClose) return;
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
  type: PopupType | FootRenderData = defaultPopupType
) {
  if (typeof head === "string") {
    const isDiaId = head.startsWith("dialog-") && !body;
    if (isDiaId) return openDialog(head);
    const isDraId = head.startsWith("drawer-") && !body;
    if (isDraId) return openDrawer(head);
  }
  if (type === "dialog") return openDialog(head, body);
  if (type === "drawer") return openDrawer(head, body);
  throw new Error(`暂不支持此类型弹窗：${type}`);
}

/**
 * 获取顶层弹窗的id数组
 */
function getTopPopupIds(num = 1): (DrawerId | DialogId)[] {
  if (num <= 0) throw new Error("请传入一个正整数");
  const popups = sortObjArrByKey([...dialogs, ...drawers], "desc", "createAt");
  const topPops = popups.slice(0, num);
  return topPops?.map(it => `${it.name}-${it.id}` as DrawerId | DialogId);
}
function closePopup(popup: ClosePopupType = 1): void {
  if (popup === "all") {
    closeDialog(popup);
    closeDrawer(popup);
    return;
  }
  const t = typeOf(popup);
  if (t === "String") {
    const isId = popup.includes("-");
    if (popup.startsWith("dialog")) {
      const isAll = popup === "dialog";
      const dia = isId ? (popup as CloseDialogType) : isAll ? "all" : undefined;
      return closeDialog(dia);
    }
    if (popup.startsWith("drawer")) {
      const isAll = popup === "drawer";
      const dra = isId ? (popup as CloseDrawerType) : isAll ? "all" : undefined;
      return closeDrawer(dra);
    }
    throw new Error(`暂未处理此种弹窗类型：${popup}`);
  }
  if (t === "Number") {
    const ids = getTopPopupIds(popup);
    ids.forEach((id: DrawerId | DialogId) => closePopup(id));
    return;
  }
  // 排除null、事件对象
  if (t === "Object") {
    if (!getIsPopupObj(popup)) return closePopup();
    const isDialog = popup.name === "dialog";
    return isDialog ? closeDialog(popup) : closeDrawer(popup);
  }
  throw new Error(`暂未处理此类型${typeof popup}`);
}

/**
 * 获取弹出层栈
 */
function getPopups(type?: PopupType) {
  if (type === "dialog") return toRaw(dialogs);
  if (type === "drawer") return toRaw(drawers);
  return { dialogs: toRaw(dialogs), drawers: toRaw(drawers) };
}

//provide提供给子组件使用
provide("openPopup", openPopup);
provide("closePopup", closePopup);
provide("getPopups", getPopups);
</script>
<style lang="scss" scoped></style>
