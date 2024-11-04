<!-- summary 快捷用法
  内嵌组件 
-->
<template>
  <FormTable v-model="rows" :cols="cols" :operateBtns="['edit', 'delete']" @operateBtns="onOperateBtns">
    <template #zdy>这是自定义表格列</template>
  </FormTable>
</template>
<script lang="ts" setup>
import FormTable from "@/core/table/FormTable.vue";
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/core/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/vite-env";

const cols = [
  { prop: "xm", label: "用户信息", type: "UserInfo" },
  { prop: "nc", label: "昵称", width: 100, field: { type: "input" } },
  {
    prop: "xb",
    label: "性别",
    width: 100,
    field: { type: "input" },
  },
  { prop: "nl", label: "年龄", width: 100, field: { type: "input" } },
  { prop: "zt", label: "状态", width: 100, field: { type: "input" } },
  {
    prop: "dh",
    label: "电话",
    minWidth: 100,
    formatter() {
      return "18413321312";
    },
  },
  { prop: "zdy", label: "自定义", type: "custom", width: 100 },
];

// const rows = [
//   { id: 1, zy: "大家看到", xb: 0, nc: "昵称1", nl: 25, zt: 0 },
//   { id: 2, zy: "大家看到", xb: 1, nc: "昵称2", nl: 32, zt: 1 },
//   { id: 2, zy: "大家看到", xb: 2, nc: "昵称3", nl: 18, zt: 0 },
// ];
const rows = reactive(
  Array(3)
    .fill("")
    .map((item, ind) => {
      return {
        id: ind + 1,
        zy: 0,
        xb: 1,
        nl: 23,
        zt: 0,
        nc: "昵称" + ind,
      };
    })
);
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
