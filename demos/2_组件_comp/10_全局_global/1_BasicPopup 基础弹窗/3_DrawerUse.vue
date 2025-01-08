<!-- summary 抽屉 Drawer
  打开抽屉示例
-->
<template>
  <div>
    <el-button @click="openPopup('抽屉', '常规抽屉', 'drawer')" type="info">打开常规抽屉</el-button>
    <el-button @click="openPopup(['div', {}, '抽屉标题（自定义渲染）'], '抽屉内容', 'drawer')" type="info"
      >打开抽屉（自定义header）</el-button
    >
    <el-button @click="openPopup({ title: '抽屉', footer: 'alert' }, '抽屉内容', 'drawer')" type="info"
      >打开抽屉（自定义footer，传'alert'）</el-button
    >
    <el-button
      @click="
        openPopup('抽屉', '抽屉内容', 'drawer', [
          'div',
          { style: 'text-align:center;background:lightgray;' },
          '抽屉footer（自定义渲染）',
        ])
      "
      type="info"
      >打开抽屉（自定义footer，传渲染元素）</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
</script>
<style lang="scss" scoped>
.el-button {
  margin: $gap-qtr;
}
</style>
