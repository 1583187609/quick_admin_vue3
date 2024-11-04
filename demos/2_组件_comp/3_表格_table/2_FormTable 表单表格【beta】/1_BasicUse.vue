<!-- summary 
  基础用法
 -->
<template>
  <FormTable :cols="cols" v-model="rows" :operateBtns="['edit', 'delete']" @operateBtns="onOperateBtns">
    <template #zdy>这是自定义表格列</template>
  </FormTable>
</template>
<script lang="ts" setup>
import FormTable from "@/core/table/FormTable.vue";
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/core/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/vite-env";

const cols = [
  { prop: "id", label: "用户ID", width: 100, fixed: "left" },
  { prop: "nc", label: "昵称", width: 100 },
  { prop: "zy", label: "职业", width: 100 },
  { prop: "xb", label: "性别", width: 100 },
  { prop: "nl", label: "年龄", width: 100 },
  { prop: "xx", label: "学校", minWidth: 100 },
  { prop: "jg", label: "籍贯", minWidth: 100 },
  { prop: "xjd", label: "现居地", minWidth: 100 },
  { prop: "ip", label: "IP地址", minWidth: 100 },
  { prop: "dh", label: "电话", minWidth: 100 },
  { prop: "zdy", label: "自定义", type: "custom", minWidth: 100 },
];

const rows = reactive([
  { id: 1, zy: "大家看到", xb: "男" },
  { id: 2, zy: "大家看到", xb: "男" },
]);

function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      // edit: () => handleAddEdit(row, next),
      // delete: () => DeleteUserList({ id }).then(() => next()),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
