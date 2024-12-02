<!-- 表格描述 -->
<template>
  <BaseTable :cols="cols" :rows="rows">
    <template #zdy>这是自定义表格列</template>
  </BaseTable>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj } from "@/core/_types";
import { TableColAttrs } from "@/core/components/table/_types";

const cols: TableColAttrs[] = [
  { prop: "id", label: "用户ID", fixed: "left" },
  { prop: "zy", label: "职业" },
  { prop: "xb", label: "性别" },
  { prop: "zdy", label: "自定义", type: "custom" },
];

const rows: CommonObj[] = [
  { id: 1, zy: "大家看到", xb: "男" },
  { id: 2, zy: "大家看到", xb: "男" },
  { id: 3, zy: "大家看到", xb: "男" },
  { id: 4, zy: "大家看到", xb: "男" },
  { id: 5, zy: "大家看到", xb: "男" },
  { id: 6, zy: "大家看到", xb: "男" },
  { id: 7, zy: "大家看到", xb: "男" },
  { id: 8, zy: "大家看到", xb: "男" },
  { id: 9, zy: "大家看到", xb: "男" },
  { id: 10, zy: "大家看到", xb: "男" },
  { id: 11, zy: "大家看到", xb: "男" },
  { id: 12, zy: "大家看到", xb: "男" },
  { id: 13, zy: "大家看到", xb: "男" },
];
</script>
<style lang="scss" scoped></style>
