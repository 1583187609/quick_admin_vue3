<!-- 可编辑表格测试 -->
<template>
  <TestView :records="records">
    <EditTable
      v-model="rows"
      :cols="cols"
      style="width: calc(100vw - 600px)"
      index
      selectable
      dragSortable
      :operateBtns="['edit', 'delete']"
      :size="size"
      @operateBtns="onOperateBtns"
    >
      <template #zdy>这是自定义表格列</template>
    </EditTable>
  </TestView>
</template>
<script lang="ts" setup>
import { CommonObj, CommonSize, FinallyNext } from "@/vite-env";
import TestView from "@/components/TestView.vue";
import EditTable from "@/components/table/EditTable.vue";
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/components/BaseBtn/_types";

const records = {
  hasTest: {
    title: "已测试属性",
    list: ["dragSortable", "index", "selectable", "operateBtns"],
  },
  waitBetter: {
    title: "待完善属性",
    list: ["size（操作栏宽度等）"],
  },
};
const size: CommonSize = "default"; // large, default, small
const cols = [
  { prop: "id", label: "用户ID", width: 80, required: true, fixed: "left" },
  { prop: "nc", label: "昵称", width: 200, required: true, field: { type: "input" } },
  {
    prop: "zy",
    label: "角色",
    width: 200,
    field: { type: "select", options: "RoleType" },
  },
  { prop: "xb", label: "性别", required: true, width: 180, field: { type: "radio-group", options: "Gender" } },
  { prop: "nl", label: "年龄", required: true, width: 200, field: { quickAttrs: { rulesType: "age" } } },
  // { prop: "xx", label: "学校" },
  { prop: "zt", label: "状态", width: 70, field: { type: "switch" } },
  { prop: "xjd", label: "现居地", width: 200, field: { type: "cascader", options: "Region" } },
  { prop: "dh", label: "电话", width: 200, field: { quickAttrs: { rulesType: "phone" } } },
  { prop: "zdy", label: "自定义", width: 200, field: { type: "custom" } },
];

const rows = Array(30)
  .fill("")
  .map((item, ind) => {
    return {
      id: ind + 1,
      zy: 0,
      xb: 1,
      nl: 23,
      zt: 0,
    };
  });

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
