<!-- 可拖动工作台 -->
<template>
  <div class="">可拖动工作台（支持自定义布局位置、大小）</div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { ref, reactive, watch, computed } from "vue";

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
