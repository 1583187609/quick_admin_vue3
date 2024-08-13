<!-- summary 基础使用
打开弹窗示例。默认是打开Dialog。
-->
<template>
  <div>
    <el-button @click="handleOpenDialog" type="primary">打开Dialog</el-button>
    <el-button @click="handleOpenDrawer" type="primary">打开Drawer</el-button>
    <!-- <el-button @click="handleClosePopup" type="primary">关闭Popup</el-button> -->
  </div>
</template>
<script lang="ts" setup>
import {  inject } from "vue";
import { OpenPopupInject, ClosePopupInject } from "@/vite-env";

const openPopup = inject<OpenPopupInject>("openPopup");
const closePopup = inject<ClosePopupInject>("closePopup");
const handleOpenDialog = () => {
  console.log(openPopup, "点击了打开Dialog按钮");
  openPopup("打开Dialog示例", "这是弹窗内容");
};
const handleOpenDrawer = () => {
  openPopup("打开Drawer示例", "这是抽屉内容", "drawer");
};
// const handleClosePopup = () => {
//   closePopup();
// };
</script>
<style lang="scss" scoped></style>
