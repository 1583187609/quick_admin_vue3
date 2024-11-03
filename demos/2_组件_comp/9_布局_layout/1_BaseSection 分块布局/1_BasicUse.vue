<!-- summary 基础用法
  这是BaseSection的基础使用示例。
-->
<template>
  <BaseSection title="第一部分"> 这是第一部分的内容 </BaseSection>
  <BaseSection title="第二部分"> 这是第二部分的内容 </BaseSection>
  <BaseSection title="第三部分"> 这是第三部分的内容 </BaseSection>
  <BaseSection title="第四部分"> 这是第四部分的内容 </BaseSection>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
</script>
<style lang="scss" scoped>
.base-section {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
</style>
