<!-- 演示中心-2-2-1 -->
<template>
  <div>演示中心-2-2-1</div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { ref, reactive, watch, computed } from "vue";
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
