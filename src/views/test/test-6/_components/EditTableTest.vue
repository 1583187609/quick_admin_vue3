<!-- 可编辑表格测试 -->
<template>
  <TestView :records="records">
    <EditTable
      v-model="rows"
      :cols="cols"
      style="width: calc(100vw - 600px)"
      :operateBtns="['edit', 'delete']"
      :size="size"
      @operateBtns="onOperateBtns"
    >
      <template #zdy>$$这是自定义表格列$$</template>
    </EditTable>
  </TestView>
</template>
<script lang="ts" setup>
import { CommonObj, CommonSize, FinallyNext } from "@/vite-env";
import TestView from "@/core/TestView.vue";
import EditTable from "@/core/table/EditTable.vue";
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/core/BaseBtn/_types";
import { EditTableColAttrs } from "@/core/table/_types";

const records = {
  hasTest: {
    title: "已测试属性",
    list: ["sort", "index", "selection", "operateBtns"],
  },
  waitBetter: {
    title: "待完善属性",
    list: ["size（操作栏宽度等）"],
  },
};
const size: CommonSize = "default"; // large, default, small
const cols: EditTableColAttrs[] = [
  { type: "selection" },
  { type: "sort" },
  { type: "index" },
  {
    prop: "id",
    label: "用户ID",
    width: 80,
    fixed: "left",
    field: {
      required: true,
    },
  },
  { prop: "nc", label: "昵称", width: 120, field: { type: "input", required: true } },
  {
    prop: "zy",
    label: "角色",
    width: 150,
    field: {
      type: "select",
      attrs: {
        options: "RoleType",
      },
    },
  },
  {
    prop: "xb",
    label: "性别",
    width: 180,
    field: {
      type: "radio-group",
      required: true,
      attrs: {
        options: "Gender",
      },
    },
  },
  { prop: "nl", label: "年龄", width: 200, field: { required: true, quickAttrs: { rulesType: "age" } } },
  // { prop: "xx", label: "学校" },
  { prop: "zt", label: "状态", width: 70, field: { type: "switch" } },
  {
    prop: "xjd",
    label: "现居地",
    width: 200,
    field: {
      type: "cascader",
      attrs: {
        options: "Region",
      },
    },
  },
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
