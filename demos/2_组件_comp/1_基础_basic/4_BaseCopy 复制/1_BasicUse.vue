<!-- summary 基础用法
  满足仅复制、点击和复制。支持路由跳转，自定义点击事件。同时会自动切换图标的鼠标样式（cursor）
-->
<template>
  <div class="mb-h">
    <BaseCopy text="这是待复制内容1" />
  </div>
  <div class="mb-h">
    <BaseCopy>这是待复制内容2</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy clickIconCopy>这是待复制内容3，当且仅当点击图标时才复制文本</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy to="/">同时满足跳转和复制功能（注意各区域的鼠标样式）</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy @click="handleClick">同时满足自定义点击事件和复制功能</BaseCopy>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
function handleClick() {
  ElMessage.info("触发了click事件");
}
</script>
