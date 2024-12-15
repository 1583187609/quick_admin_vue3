<!-- 页面-简介 -->
<template>
  <div class="tree-item f-sb-c">
    <span>{{ scope?.data?.label ?? "-" }}</span>
    <el-button type="danger" link @click.stop="handleStop">删除</el-button>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();

const props = withDefaults(
  defineProps<{
    scope?: CommonObj; // 插槽传入的属性
    testProp?: string; // 测试传入的属性
  }>(),
  {}
);
function handleStop() {
  openPopup("温馨提示", "确定删除吗？", "dialog", "confirm");
}
</script>
<style lang="scss" scoped>
.tree-item {
  width: 100%;
}
</style>
