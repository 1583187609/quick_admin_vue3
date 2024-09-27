<!-- 页面-简介 -->
<template>
  <div>
    <el-button @click="openPopup('温馨提示', Test)" type="primary">打开弹窗</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { ClosePopupInject, CommonObj, FinallyNext, OpenPopupInject, StrNum } from "@/vite-env";
import Test from "./Test.vue";

const openPopup = inject<OpenPopupInject>("openPopup");
const closePopup = inject<ClosePopupInject>("closePopup");
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
