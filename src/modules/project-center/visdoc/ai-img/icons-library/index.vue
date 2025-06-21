<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockUser"
    :extraBtns="['add', 'onShelf', 'offShelf']"
    :operateBtns="['edit', 'delete', ({ status }) => (status ? 'onShelf' : 'offShelf')]"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
    <template #bq>
      <el-tag v-for="(item, ind) in 10" type="info">医生</el-tag>
    </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockUser, DeleteMockUser } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "yhid", label: "关键词" },
  {
    prop: "ffzt",
    label: "图标ID",
    type: "select",
    attrs: {
      options: "D_YesNoStatus",
    },
  },
  { prop: "czr", label: "上架状态", type: "select" },
];
const cols: TableCol[] = [
  { type: "selection" },
  { tpl: "T_Id" },
  {
    prop: "ffcgyhid",
    label: "预览图",
    type: "BaseImg",
  },
  {
    prop: "ffsbyhid",
    label: "上架状态",
    type: "BaseTag",
  },
  {
    prop: "bq",
    label: "标签",
    type: "slot",
  },
  {
    prop: "ffzt",
    label: "最新上架时间",
  },
  { tpl: "T_Create" },
  { prop: "imtz", label: "设计师" },
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
      delete: () => DeleteMockUser({ id }).then(() => next()),
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
