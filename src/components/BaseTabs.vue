<template>
  <el-tabs v-model="currTab" class="type-tabs" @tab-click="onTabItem">
    <el-tab-pane :label="item.label" :name="item.name" v-for="(item, ind) in tabs" :key="ind"></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
export type TabType = "teacher" | "student";
export interface TabItem {
  name: string;
  label: string;
}
const props = withDefaults(
  defineProps<{
    modelValue: TabType;
    tabs: TabItem[];
  }>(),
  {
    tabs: () => [],
  }
);
const emits = defineEmits(["update:modelValue"]);
const currTab = ref<TabType>(props.tabs[0].name);
function onTabItem(tab: any) {
  currTab.value = tab.paneName;
  emits("update:modelValue", tab.paneName);
}
</script>
<style lang="scss" scoped></style>
