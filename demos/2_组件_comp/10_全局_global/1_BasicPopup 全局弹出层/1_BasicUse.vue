<!-- summary 基础用法
打开弹窗示例。默认是打开Dialog。
-->
<template>
  <div>
    <el-button @click="handleOpenDialog" type="primary">打开Dialog</el-button>
    <el-button @click="handleOpenDrawer" type="primary">打开Drawer</el-button>
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
          'confirm'
        )
      "
      type="primary"
    >
      打开弹窗
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { usePopup } from "@/hooks";

const { openPopup, closePopup } = usePopup();

const handleOpenDialog = () => {
  console.log(openPopup, "点击了打开Dialog按钮");
  openPopup("打开Dialog示例", "这是弹窗内容");
};

const handleOpenDrawer = () => {
  openPopup("打开Drawer示例", "这是抽屉内容", "drawer");
};

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
    "confirm"
  );
}
</script>
<style lang="scss" scoped>
.el-button {
  margin: $gap-qtr;
}
</style>
