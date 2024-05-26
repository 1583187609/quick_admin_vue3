<!-- 页面-简介 -->
<template>
  <div class="base-age">{{ num }}</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, StrNum } from "@/vite-env";
const colorMap: CommonObj = {
  youngest: "#ccc",
  younger: "#999",
  young: "#666",
  main: "#333",
  old: "",
  older: "",
  oldest: "",
};
const props = withDefaults(
  defineProps<{
    num?: StrNum;
  }>(),
  {
    num: 26,
  }
);
</script>
<style lang="scss" scoped></style>
