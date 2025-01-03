<!-- 表单项模板列表 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockUser"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
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
  { prop: "tpl", label: "模板类型", type: "select" },
  { prop: "classify", label: "所属分类", type: "select", attrs: { options: [] } },
  { prop: "status", label: "启用状态", type: "select", attrs: { options: "D_EnableStatus" } },
  { prop: "remark", label: "备注" },
  { prop: "create_time", label: "创建时间", type: "date-picker" },
];
const cols: TableCol[] = [
  { tpl: "T_Id" },
  { tpl: "T_Sort" },
  { prop: "tpl", label: "模板类型" },
  { prop: "classify", label: "所属分类" },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Create" },
  { tpl: "T_Update" },
  { tpl: "T_Remark" },
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
