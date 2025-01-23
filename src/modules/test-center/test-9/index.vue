<!-- 页面-简介 -->
<template>
  <div class="q-page-view">测试9</div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
