<template>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="基础信息" name="1"></el-tab-pane>
    <el-tab-pane label="认证信息" name="2"></el-tab-pane>
    <el-tab-pane label="互动信息" name="3"></el-tab-pane>
    <el-tab-pane label="登录信息" name="4"></el-tab-pane>
    <BaseInfo v-if="activeName === '1'" />
    <AuthInfo v-else-if="activeName === '2'" />
    <InteractiveInfo v-else-if="activeName === '3'" />
    <LoginInfo v-else-if="activeName === '4'" />
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import type { TabsPaneContext } from "element-plus";
import BaseInfo from "./BaseInfo/index.vue";
import LoginInfo from "./LoginInfo/index.vue";
import AuthInfo from "./AuthInfo/index.vue";
import InteractiveInfo from "./InteractiveInfo/index.vue";
import { CommonObj } from "@/vite-env";
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
<style lang="scss" scoped></style>
