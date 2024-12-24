<!-- 下拉项item -->
<template>
  <div class="base-option f-sb-c">
    <slot name="left">
      <div :class="leftClass" class="f-1 q-line-1">{{ option?.[leftKey] ?? emptyStr }}</div>
    </slot>
    <slot name="right">
      <div :class="rightClass" class="f-0 short-name">{{ option?.[rightKey] ?? "" }}</div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { emptyStr } from "@/core/utils";
import { CommonObj } from "../_types";
const props = withDefaults(
  defineProps<{
    option?: CommonObj;
    leftKey?: string;
    rightKey?: string;
    leftClass?: string;
    rightClass?: string;
  }>(),
  {
    leftKey: "label",
    rightKey: "value",
  }
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
