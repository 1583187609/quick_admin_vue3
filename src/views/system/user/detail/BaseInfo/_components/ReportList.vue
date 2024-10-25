<!-- 举报/被举报记录 -->
<template>
  <BaseTable :cols="cols" :rows="rows" class="report-list">
    <template #cljg="{ row, $index }">
      <el-tag :type="statusMap[$index % 2 == 0 ? 'yes' : 'no'].type">{{ statusMap[$index % 2 == 0 ? "yes" : "no"].text }}</el-tag>
    </template>
  </BaseTable>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { TableColAttrs } from "@/core/table/_types";
import { CommonObj } from "@/vite-env";
const statusMap: CommonObj = {
  yes: {
    text: "已处理",
    type: "success",
  },
  no: {
    text: "未处理",
    type: "info",
  },
};
const props = withDefaults(
  defineProps<{
    type?: number;
  }>(),
  {
    type: 1,
  }
);
const cols: TableColAttrs[] = [
  ...(props.type === 1 ? [{ prop: "bjbr", label: "被举报人", width: 100 }] : []),
  ...(props.type === 2 ? [{ prop: "jbr", label: "举报人", width: 100 }] : []),
  { prop: "jblx", label: "举报类型" },
  { prop: "jbsj", label: "举报时间", width: 110 },
  { prop: "jbnr", label: "举报内容", width: 250 },
  { prop: "cljg", label: "处理结果", type: "custom", width: 80 },
];
const rows: CommonObj[] = [
  {
    jbr: "张三",
    bjbr: "李四",
    jblx: "虚假资料",
    jbsj: "2023-07-26",
    jbnr: "盗用网图",
    cljg: "未处理",
  },
  {
    jbr: "张三",
    bjbr: "李四",
    jblx: "虚假资料",
    jbsj: "2023-07-26",
    jbnr: "盗用网图",
    cljg: "已处理",
  },
  {
    jbr: "张三",
    bjbr: "李四",
    jblx: "虚假资料",
    jbsj: "2023-07-26",
    jbnr: "盗用网图",
    cljg: "未处理",
  },
];
</script>
<style lang="scss" scoped></style>
