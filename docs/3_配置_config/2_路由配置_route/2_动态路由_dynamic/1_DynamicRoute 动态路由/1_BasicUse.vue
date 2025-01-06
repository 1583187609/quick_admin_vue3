<!-- summary 基础用法 -->
<template>
  <div>动态路由</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
</script>
<style lang="scss" scoped>
.base-section {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
</style>
