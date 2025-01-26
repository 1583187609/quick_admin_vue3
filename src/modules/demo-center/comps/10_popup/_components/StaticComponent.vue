<!-- 静态组件 -->
<template>
  <div>
    <div>测试关闭弹窗</div>
    <el-button @click="closePopup">关闭</el-button>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { usePopup } from "@/hooks";

const { closePopup } = usePopup();
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
