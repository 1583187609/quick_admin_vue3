<!-- 工程列表 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetUserList"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetUserList, DeleteUserList } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "id", label: "模板id" },
  {
    prop: "type",
    label: "模板类型",
    type: "select",
  },
  { tpl: "T_EnableStatus" },
  { prop: "remark", label: "备注" },
  { tpl: "T_CreateTime" },
];
const cols: TableCol[] = [
  { tpl: "sort" },
  { tpl: "T_Id" },
  {
    prop: "name",
    label: "页面名称",
    minWidth: 210,
  },
  {
    prop: "url",
    label: "页面地址",
    type: "BaseCopy",
    attrs: {
      to: "/",
    },
  },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Remark" },
  { tpl: "T_Create" },
  { tpl: "T_Update" },
];
function onExtraBtns(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
    },
    name
  );
}
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => DeleteUserList({ id }).then(() => next()),
    },
    name
  );
}
//新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}`, [AddEdit, { data: row, refreshList: next }]);
}
</script>
<style lang="scss" scoped></style>
