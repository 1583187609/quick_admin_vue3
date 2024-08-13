<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetAuthRoleList"
    :extraBtns="['add', 'delete']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
    selection
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref, h, inject } from "vue";
import { GetAuthRoleList, DeleteAuthRoleList } from "@/api-mock";
import { FormField } from "@/components/form/_types";
import { TableCol } from "@/components/table/_types";
import { BtnName } from "@/components/BaseBtn/_types";
import AddEdit from "./AddEdit.vue";
import { handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/vite-env";
import { ExtraBtnRestArgs } from "@/components/crud/BaseCrud";

const openPopup: any = inject("openPopup");
const fields = ref<FormField[]>([
  {
    prop: "role_type",
    label: "角色类型",
    type: "select",
    options: "RoleType",
  },
  {
    prop: "status",
    label: "状态",
    type: "select",
    options: "EnableStatus",
  },
  {
    prop: "create_time_range",
    label: "创建时间",
    type: "date-picker",
  },
]);
const cols = ref<TableCol[]>([
  { prop: "role_text", label: "角色类型", width: 120 },
  { prop: "status", label: "状态", type: "BaseTag" },
  { prop: "remark", label: "备注", minWidth: 250 },
  { prop: "create_time", label: "创建时间", width: 180, sortable: true },
  { prop: "update_time", label: "修改时间", width: 180, sortable: true },
]);
//点击操作栏的分组按钮
function onOperateBtns(name: any, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => handleDelete([row.id], next),
    },
    name
  );
}
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
//新增或编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}角色`, h(AddEdit, { id: row?.id, refreshList: next }));
}
//删除角色
function handleDelete(ids: string[], next: FinallyNext) {
  DeleteAuthRoleList({ ids }).then((res: CommonObj) => {
    next();
  });
}
</script>
<style lang="scss" scoped></style>
