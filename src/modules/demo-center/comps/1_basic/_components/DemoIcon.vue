<!-- 图标 -->
<template>
  <div>图标</div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";

const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
