<!-- 增删改查快速开发 -->
<template>
  <div class="basic-use">增删改查快速开发</div>
</template>
<script lang="ts" setup>
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
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
