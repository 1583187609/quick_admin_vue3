<!-- 页面-简介 -->
<template>
  <div>
    <el-button
      @click="
        openPopup(
          {
            title: '温馨提示',
            beforeClose: handleBeforeClose,
            // onCancel: () => ElMessage.info('点击了取消按钮'),
            // onConfirm: () => ElMessage.info('点击了确认按钮'),
          },
          Test,
          'dialog',
          true
        )
      "
      type="primary"
      >打开弹窗</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { ClosePopupInject, OpenPopupInject } from "@/vite-env";
import Test from "./Test.vue";
import { ElMessage } from "element-plus";

const openPopup = inject<OpenPopupInject>("openPopup");
const closePopup = inject<ClosePopupInject>("closePopup");
function handleBeforeClose(cb) {
  openPopup(
    {
      title: "关闭确认",
      onConfirm() {
        closePopup();
        cb();
      },
    },
    "确认关闭吗？",
    "dialog",
    true
  );
}
</script>
<style lang="scss" scoped></style>
