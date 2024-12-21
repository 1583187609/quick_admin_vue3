<!-- 页面详情页 -->
<template>
  <div>性能分析</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
import { getPerformanceTiming } from "@/core/performance";

const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const data = getPerformanceTiming();
console.log(data, "data--------------------");
</script>
<style lang="scss" scoped></style>
