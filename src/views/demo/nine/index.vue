<!-- 页面-简介 -->
<template>
  <div class="demo-9">demo-9</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
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
