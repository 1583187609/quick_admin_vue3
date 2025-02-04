<!-- 可编辑表格 -->
<template>
  <FormTable v-model="rows" class="q-page-view" :cols="cols" :operateBtns="['edit', 'delete']" @operateBtns="onOperateBtns">
    <template #zdy>$$这是自定义表格列$$</template>
  </FormTable>
</template>
<script lang="ts" setup>
import { CommonObj, FinallyNext } from "@/core/_types";
import FormTable from "@/core/components/table/FormTable.vue";
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { FormTableColAttrs } from "@/core/components/table/_types";

const cols: FormTableColAttrs[] = [
  { type: "selection" },
  { tpl: "T_Sort" },
  { tpl: "T_Index" },
  {
    prop: "id",
    label: "用户ID",
    width: 80,
    fixed: "left",
  },
  { prop: "nc", label: "昵称", width: 120, field: { type: "input", required: true } },
  {
    prop: "zy",
    label: "角色",
    width: 150,
    field: {
      type: "select",
      attrs: {
        options: "D_RoleType",
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
        options: "D_Gender",
      },
    },
  },
  { prop: "nl", label: "年龄", width: 200, field: { required: true, tpl: "T_Age" } },
  // { prop: "xx", label: "学校" },
  { prop: "zt", label: "状态", width: 70, field: { type: "switch" } },
  {
    prop: "xjd",
    label: "现居地",
    width: 200,
    field: {
      type: "cascader",
      attrs: {
        options: "C_Region",
      },
    },
  },
  { prop: "dh", label: "电话", width: 200, field: { tpl: "T_Phone" } },
  { prop: "zdy", label: "自定义", width: 200, field: { type: "slot" } },
];

const rows = Array(30)
  .fill("")
  .map((item, ind) => {
    return { id: ind + 1, zy: 0, xb: 1, nl: 23, zt: 0 };
  });

function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      // edit: () => handleAddEdit(row, next),
      // delete: () => DeleteMockUser({ id }).then(() => next()),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
