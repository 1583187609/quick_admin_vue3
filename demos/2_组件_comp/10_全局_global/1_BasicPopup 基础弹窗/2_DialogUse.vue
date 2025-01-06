<!-- summary 对话框 Dialog
打开弹窗示例。默认是打开Dialog。
-->
<template>
  <div>
    <el-button @click="openPopup('弹窗', '常规弹窗')" type="warning">打开常规弹窗</el-button>
    <el-button @click="openPopup(['div', {}, '弹窗标题（自定义渲染）'], '弹窗内容')" type="warning"
      >打开弹窗（自定义header）</el-button
    >
    <el-button
      @click="
        openPopup(
          {
            title: '弹窗',
            onConfirm() {
              ElMessage.info('点击了确认按钮');
            },
          },
          '弹窗内容',
          'dialog',
          'confirm'
        )
      "
      type="warning"
      >打开弹窗（自定义footer，传'confirm'）</el-button
    >
    <el-button
      @click="
        openPopup('弹窗', '弹窗内容', 'dialog', [
          'div',
          { style: 'padding:16px 0;text-align:center;background:lightgray;' },
          '弹窗footer（自定义渲染）',
        ])
      "
      type="warning"
      >打开弹窗（自定义footer，传渲染元素）</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { usePopup } from "@/hooks";
import { ElMessage } from "element-plus";

const { openPopup } = usePopup();
</script>
<style lang="scss" scoped>
.el-button {
  margin: $gap-qtr;
}
</style>
