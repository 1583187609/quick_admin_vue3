<!-- 表单校验规则列表 -->
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
import { CommonObj, FinallyNext } from "@/vite-env";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "yhid", label: "用户ID" },
  {
    prop: "ffzt",
    label: "发放状态",
    type: "select",
    attrs: {
      options: "YesNoStatus",
    },
  },
  { prop: "czr", label: "操作人" },
  { prop: "bz", label: "备注" },
  { prop: "ffsj", label: "发放时间", type: "date-picker" },
];
const cols: TableCol[] = [
  {
    prop: "ffcgyhid",
    label: "发放成功用户ID",
    minWidth: 210,
  },
  {
    prop: "ffsbyhid",
    label: "发放失败用户ID",
    minWidth: 210,
  },
  {
    prop: "ffje",
    label: "发放金额",
    minWidth: 90,
  },
  {
    prop: "ffzt",
    label: "发放状态",
    type: "BaseTag",
    attrs: {
      name: "SendStatus",
    },
  },
  { prop: "ffsj", label: "发放时间" },
  { prop: "imtz", label: "IM通知", minWidth: 190 },
  { prop: "bz", label: "备注", minWidth: 140 },
  { prop: "updated", label: "操作人", type: "update" },
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
