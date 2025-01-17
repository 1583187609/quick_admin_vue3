<!-- 菜单1-2 -->
<template>
  <div>菜单1-2</div>
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
