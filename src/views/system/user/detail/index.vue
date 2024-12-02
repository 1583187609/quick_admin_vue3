<template>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="基础信息" name="1">
      <BaseInfo v-if="activeName === '1'" />
    </el-tab-pane>
    <el-tab-pane label="认证信息" name="2">
      <AuthInfo v-if="activeName === '2'" />
    </el-tab-pane>
    <el-tab-pane label="互动信息" name="3">
      <InteractiveInfo v-if="activeName === '3'" />
    </el-tab-pane>
    <el-tab-pane label="登录信息" name="4">
      <LoginInfo v-if="activeName === '4'" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import type { TabsPaneContext } from "element-plus";
import BaseInfo from "./BaseInfo/index.vue";
import LoginInfo from "./LoginInfo/index.vue";
import AuthInfo from "./AuthInfo/index.vue";
import InteractiveInfo from "./InteractiveInfo/index.vue";
import { CommonObj } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const activeName = ref<any>("1");

const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  activeName.value = tab.paneName;
};
</script>
<style lang="scss" scoped>
.el-tabs {
  // display: flex;
  // justify-content: flex-start;
  // align-items: stretch;
  // flex-direction: column;
  height: 100%;
}
// :deep(.el-tabs__header) {
// }
:deep(.el-tabs__content) {
  overflow: auto;
}
</style>
