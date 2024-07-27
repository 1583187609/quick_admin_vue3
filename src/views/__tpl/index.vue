<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetUserList"
    :extraBtns="['add']"
    :groupBtns="['edit', 'delete']"
    @extraBtn="onExtraBtn"
    @groupBtn="onGroupBtn"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, inject, h } from "vue";
import { GetUserList, DeleteUserList } from "@/api-mock";
import { FormField } from "@/components/form";
import { TableField } from "@/components/table";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/components/BaseBtn";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const openPopup: any = inject("openPopup");
const fields: FormField[] = [
  { prop: "yhid", label: "用户ID" },
  {
    prop: "ffzt",
    label: "发放状态",
    type: "select",
    options: "YesNoStatus",
  },
  { prop: "czr", label: "操作人" },
  { prop: "bz", label: "备注" },
  { prop: "ffsj", label: "发放时间", type: "date-picker" },
];
const cols: TableField[] = [
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
function onExtraBtn(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
    },
    name
  );
}
function onGroupBtn(name: any, row: CommonObj, next: FinallyNext) {
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
  openPopup(`${row ? "编辑" : "新增"}`, h(AddEdit, { data: row, refreshList: next }));
}
</script>
<style lang="scss" scoped></style>
