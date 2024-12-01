<!-- 下拉项item -->
<template>
  <div class="base-option f-sb-c">
    <slot name="left">
      <div :class="leftClass" class="f-1 line-1">{{ left || emptyStr }}</div>
    </slot>
    <slot name="right">
      <div :class="rightClass" class="f-0 short-name">{{ right }}</div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { emptyStr } from "@/core/utils";
const props = withDefaults(
  defineProps<{
    left?: string;
    right?: string;
    leftClass?: string;
    rightClass?: string;
  }>(),
  {}
);
</script>
<style lang="scss" scoped>
.base-option {
  min-width: 300px;
  .short-name {
    color: $color-text-light;
    margin-left: $gap;
  }
}
</style>
