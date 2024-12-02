<!-- 页面-简介 -->
<template>
  <div>
    <div>测试关闭弹窗</div>
    <el-button @click="closePopup">关闭</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, watch, computed } from "vue";
import { ClosePopupInject, CommonObj } from "@/core/_types";

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
