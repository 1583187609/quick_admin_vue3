<!-- 页面-部门管理 -->
<template>
  <BaseCrud :cols="cols" :fields="fields" :fetch="GetMockCommonList" />
</template>
<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import { GetMockCommonList } from "@/api-mock";
import { FormField } from "@/components/form/_types";
import { TableCol } from "@/components/table/_types";

const fields: FormField[] = [
  { prop: "yhid", label: "用户ID" },
  { prop: "yhxm", label: "用户姓名" },
  { prop: "bmmc", label: "部门名称" },
  {
    prop: "jslx",
    label: "角色类型",
    type: "select",
    options: "RoleType",
  },
  { prop: "rq", label: "日期", type: "date-picker" },
];
const cols: TableCol[] = [
  {
    prop: "yhid",
    label: "用户ID",
    minWidth: 210,
  },
  {
    prop: "yhxm",
    label: "用户姓名",
    minWidth: 210,
  },
  {
    prop: "jslx",
    label: "角色类型",
    minWidth: 90,
  },
  { type: "remark" },
];
</script>
<style lang="scss" scoped></style>
