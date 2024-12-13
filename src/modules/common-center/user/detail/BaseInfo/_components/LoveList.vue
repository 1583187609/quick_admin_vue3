<!-- 喜欢/被喜欢记录 -->
<template>
  <BaseTable :cols="cols" :rows="rows" class="love-list"> </BaseTable>
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
  ...(props.type === 1 ? [{ prop: "jsf", label: "接收方", width: 100 }] : []),
  ...(props.type === 2 ? [{ prop: "fcf", label: "发出方", width: 100 }] : []),
  { prop: "fssj", label: "发送时间", width: 110 },
  { prop: "fsnr", label: "发送内容", width: 250 },
  { prop: "sfgst", label: "是否告诉他", width: 80 },
];
const rows: CommonObj[] = [
  {
    fcf: "张三",
    jsf: "李四",
    fssj: "2023-07-26",
    fsnr: "盗用网图",
    sfgst: "否",
  },
  {
    fcf: "张三",
    jsf: "李四",
    fssj: "2023-07-26",
    fsnr: "盗用网图",
    sfgst: "是",
  },
  {
    fcf: "张三",
    jsf: "李四",
    fssj: "2023-07-26",
    fsnr: "盗用网图",
    sfgst: "否",
  },
];
</script>
<style lang="scss" scoped></style>
