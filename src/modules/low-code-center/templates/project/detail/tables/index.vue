<!-- 数据表设计列表 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockUser"
    :extraBtns="['add']"
    :operateBtns="['edit', { name: 'view', to: ({id}:CommonObj) => `/code/one-site/system-design/tables/detail?id=${id}` }, 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
    <template #table_name="{ row }">
      <div>{{ row.cn_name || emptyStr }}</div>
      <div>{{ row.name || emptyStr }}</div>
    </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockUser, DeleteMockUser } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { emptyStr, handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "表", label: "表ID" },
  { prop: "表名称", label: "表名称" },
  {
    prop: "status",
    label: "启用状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
  { prop: "create_time", label: "创建时间", type: "date-picker" },
];
const cols: TableCol[] = [
  {
    type: "id",
  },
  {
    prop: "table_name",
    label: "表名称",
    minWidth: 90,
    type: "slot",
  },
  { prop: "status", label: "启用状态", type: "BaseTag" },
  { type: "create" },
  { type: "update" },
  { type: "remark" },
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
