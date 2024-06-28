<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud :cols="cols" :fields="fields" :fetch="GetMockCommonList" :extraParams="{ emptyList: false }" index></BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import { GetMockCommonList } from "@/api-mock";
import { FormField } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
import { useDictStore } from "@/store";
const { getOpts, getText } = useDictStore();
const enableStatusOpts = getOpts("EnableStatus");
const fields: FormField[] = [
  { prop: "zh", label: "操作账号" },
  {
    prop: "czyw",
    label: "操作业务",
    type: "select",
    options: enableStatusOpts,
  },
  { prop: "bz", label: "备注" },
  { prop: "rq", label: "日期", type: "date-picker" },
];
const cols: TableField[] = [
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
