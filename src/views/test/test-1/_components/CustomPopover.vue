<!-- 页面-简介 -->
<template>
  <div class="custom-popover">
    <div class="mb-8">自定义<b class="b">popover</b></div>
    <div>这是提示内容</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
</script>
<style lang="scss" scoped>
.custom-popover {
  .b {
    color: $color-primary;
  }
}
</style>
