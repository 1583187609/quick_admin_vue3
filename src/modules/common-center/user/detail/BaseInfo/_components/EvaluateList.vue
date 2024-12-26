<!-- 评价记录 -->
<template>
  <BaseTable :cols="cols" :data="rows" class="report-list"> </BaseTable>
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
  { prop: "pjr", label: "评价人", width: 100 },
  { prop: "pjlx", label: "评价类型", width: 80 },
  { prop: "pjnr", label: "评价内容", width: 250 },
  { prop: "pjsj", label: "评价时间", width: 110 },
];
const rows: CommonObj[] = [
  {
    pjr: "李一",
    pjsj: "2023-07-26",
    pjnr: "有礼貌",
    pjlx: "否",
  },
  {
    pjr: "李二",
    pjsj: "2023-07-26",
    pjnr: "没礼貌",
    pjlx: "是",
  },
  {
    pjr: "李三",
    pjsj: "2023-07-26",
    pjnr: "有礼貌",
    pjlx: "否",
  },
  {
    pjr: "李四",
    pjsj: "2023-07-26",
    pjnr: "没礼貌",
    pjlx: "否",
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
