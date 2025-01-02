<!-- 行业列表 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    @submit="GetIndustryList"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetIndustryList, DeleteIndustryDelete } from "@/modules/project-center/easy-note/apis";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "id", label: "ID" },
  {
    prop: "name",
    label: "行业名称",
    attrs: {
      maxlength: 10,
    },
  },
  { prop: "create_time", label: "创建时间", type: "date-picker" },
  {
    prop: "status",
    label: "是否启用",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
];
const cols: TableCol[] = [
  { tpl: "T_Id" },
  {
    prop: "name",
    label: "行业名称",
  },
  { tpl: "T_EnableStatus" },
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
      delete: () => DeleteIndustryDelete({ id }).then(() => next()),
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
