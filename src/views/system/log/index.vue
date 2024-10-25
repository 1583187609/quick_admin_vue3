<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud :cols="cols" :fields="fields" :fetch="GetMockCommonList" :extraParams="{ emptyList: false }" index></BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockCommonList } from "@/api-mock";
import { FormField } from "@/core/form/_types";
import { TableCol } from "@/core/table/_types";

const fields: FormField[] = [
  { prop: "zh", label: "操作账号" },
  {
    prop: "czyw",
    label: "操作业务",
    type: "select",
    options: "EnableStatus",
  },
  { prop: "bz", label: "备注" },
  { prop: "rq", label: "日期", type: "date-picker" },
];
const cols: TableCol[] = [
  {
    prop: "ffcgyhid",
    label: "操作业务",
    minWidth: 210,
  },
  {
    prop: "ffsbyhid",
    label: "操作内容",
    minWidth: 210,
  },
  {
    prop: "ffje",
    label: "所属系统",
    minWidth: 90,
  },
  { prop: "bz", label: "备注", minWidth: 140 },
  { prop: "updated", label: "操作人", type: "update" },
];
</script>
<style lang="scss" scoped></style>
