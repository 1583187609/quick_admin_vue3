<!-- 页面-简介 -->
<template>
  <div class="example-vue">example-vue</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList: FinallyNext;
  }>(),
  {}
);
</script>
<style lang="scss" scoped></style>
