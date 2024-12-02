<!-- 设置面板 -->
<template>
  <div class="set-panels">
    <div class="item f-c-c" v-for="(item, ind) in list" :key="ind">{{ item.label }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const list = [
  { value: 1, label: "类型" },
  { value: 2, label: "程度" },
  // { value: 3, label: "" },
  // { value: 4, label: "" },
  // { value: 5, label: "" },
];
</script>
<style lang="scss" scoped>
.set-panels {
  border-radius: $radius-main;
  background: $color-bg-light;
  .item {
    width: 4em;
    height: 2em;
    &:not(:last-child) {
      border-bottom: 1px solid $color-bg-heavyer;
    }
  }
}
</style>
