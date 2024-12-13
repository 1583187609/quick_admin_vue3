<!-- 关于你/关于我提交记录 -->
<template>
  <BaseTable :cols="cols" :rows="rows" class="about-list"></BaseTable>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { TableColAttrs } from "@/core/components/table/_types";
import { CommonObj } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    type?: number;
  }>(),
  {
    type: 1,
  }
);
const cols: TableColAttrs[] = [
  { prop: "tjsj", label: "提交时间", width: 110 },
  { prop: "nr", label: "内容", width: 300 },
  { prop: "zt", label: "状态", width: 60, type: "BaseTag" },
];
const rows: CommonObj[] = [
  {
    tjsj: "2023-07-26",
    nr: "这是关于你的提交内容",
    zt: "通过",
  },
  {
    tjsj: "2023-07-26",
    nr: "...这是关于我的提交内容...",
    zt: "驳回",
  },
  {
    tjsj: "2023-07-26",
    nr: "这是关于你的提交内容",
    zt: "通过",
  },
  {
    tjsj: "2023-07-26",
    nr: "...这是关于我的提交内容...",
    zt: "驳回",
  },
].filter((it: any, ind: number) => {
  if (props.type === 1) {
    return ind % 2 === 0;
  } else {
    return ind % 2 === 1;
  }
});
</script>
<style lang="scss" scoped></style>
