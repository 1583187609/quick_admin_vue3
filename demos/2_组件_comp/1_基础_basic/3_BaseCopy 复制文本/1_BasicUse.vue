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
    <BaseCopy to="/comp/basic/BaseBtn">同时满足跳转和复制功能</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy @click="handleClick">同时满足自定义点击事件和复制功能</BaseCopy>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
function handleClick() {
  ElMessage.info("点击了click事件");
}
</script>
