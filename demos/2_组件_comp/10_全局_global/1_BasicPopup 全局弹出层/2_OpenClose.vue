<!-- summary 打开与关闭
打开弹出层可自动叠加。关闭弹出层每次默认关闭最顶层
-->
<template>
  <div>
    <el-button @click="handleOpenDialog" type="primary">打开Dialog</el-button>
    <!-- <el-button @click="handleOpenDrawer" type="primary">打开Drawer</el-button> -->
    <!-- <el-button @click="handleClosePopup" type="primary">关闭Popup</el-button> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const openPopup = inject<OpenPopupInject>("openPopup");
const closePopup = inject<ClosePopupInject>("closePopup");
const handleOpenDialog = () => {
  openPopup("弹窗", "这是弹窗内容");
};
// const handleOpenDrawer = () => {
//   openPopup("抽屉", "这是抽屉内容", "drawer");
// };
// const handleClosePopup = () => {
//   closePopup();
// };
</script>
<style lang="scss" scoped></style>
