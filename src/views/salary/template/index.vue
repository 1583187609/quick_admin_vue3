<!-- 页面-简介 -->
<template>
  <div class="f-fs-s-c" style="height: 100%">
    <el-tabs v-model="active" class="f-0" @tab-click="handleClick">
      <el-tab-pane v-bind="item" v-for="(item, ind) in tabList" :key="ind"></el-tab-pane>
    </el-tabs>
    <CalTpl :style="crudStyle" v-if="active === 'cal-tpl'" />
    <Funds :style="crudStyle" v-else-if="active === 'funds'" />
    <Tax :style="crudStyle" v-else-if="active === 'tax'" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import type { TabsPaneContext } from "element-plus";
import CalTpl from "./CalTpl/Index.vue";
import Funds from "./Funds/Index.vue";
import Tax from "./Tax/Index.vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
const crudStyle = "height: calc(100% - 54px)";
const tabList: CommonObj[] = [
  { label: "薪资核算模板", name: "cal-tpl" },
  { label: "公积金设置", name: "funds" },
  { label: "个税表设置", name: "tax" },
];
const active = ref<any>("tax");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  active.value = tab.paneName;
};
</script>
<style lang="scss" scoped></style>
