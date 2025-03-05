<!-- 页面-简介 -->
<template>
  <div class="custom-explain">
    <div class="mb-8">自定义<b class="b">explain</b></div>
    <div>这是提示内容</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
</script>
<style lang="scss" scoped>
.custom-explain {
  .b {
    color: $color-primary;
  }
}
</style>
