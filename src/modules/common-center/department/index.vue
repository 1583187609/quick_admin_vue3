<!-- 页面-部门管理 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockDepartment"
    :extraBtns="['add', 'delete']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  />
</template>
<script lang="ts" setup>
import { GetMockDepartment, DeleteMockDepartment } from "@/api-mock";
import { TableCol } from "@/core/components/table/_types";
import { FormField } from "@/core/components/form/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/core/_types";
import { ExtraBtnRestArgs } from "@/core/components/crud/BaseCrud/_types";
import AddEdit from "./AddEdit.vue";

import { usePopup } from "@/hooks";
const { openPopup } = usePopup();
const fields: FormField[] = [
  { tpl: "T_Id" },
  { prop: "label", label: "部门名称" },
  { prop: "produce", label: "部门简介" },
  { tpl: "T_EnableStatus" },
  { tpl: "T_CreateTime" },
];
const cols: TableCol[] = [
  { type: "selection" },
  {
    prop: "label",
    label: "部门名称",
    minWidth: 250,
    align: "left",
  },
  { tpl: "T_Remark", prop: "produce", label: "部门简介" },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Create" },
  { tpl: "T_Update" },
];
//点击列表上方的额外按钮
function onExtraBtns(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { selectedKeys } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      delete: () => handleDelete(selectedKeys, next),
    },
    name
  );
}
//点击操作栏的分组按钮
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => handleDelete([row.id], next),
    },
    name
  );
}
//新增或编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}部门`, [AddEdit, { id: row?.id, refreshList: next }]);
}
//删除部门
function handleDelete(ids: string[], next: FinallyNext) {
  DeleteMockDepartment({ ids }).then((res: CommonObj) => {
    next();
  });
}
</script>
<style lang="scss" scoped></style>
