<!-- export 按钮中 的handleClickType设为''，可以自定义导出逻辑 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockRole"
    :extraBtns="['add', 'delete', 'import', { name: 'export', handleClickType: undefined }]"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { PostMockRole, DeleteMockRole, GetMockRole } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import AddEdit from "./AddEdit.vue";
import { exportExcel, handleBtnNext, showConfirmMessage } from "@/utils";
import { CommonObj, FinallyNext } from "@/core/_types";
import { ExtraBtnRestArgs } from "@/core/components/crud/BaseCrud/_types";
import { usePopup } from "@/hooks";
import { getExportRows } from "@/core/components/crud/BaseCrud/_utils";
import { FormFieldAttrs } from "@/components/form/_types";

const { openPopup } = usePopup();
const fields = ref<FormFieldAttrs[]>([
  {
    prop: "role",
    label: "角色类型",
    type: "select",
    attrs: {
      options: "D_RoleType",
    },
  },
  { tpl: "T_EnableStatus" },
  { tpl: "T_CreateTime" },
]);
const cols = ref<TableColAttrs[]>([
  { type: "selection" },
  { prop: "role_text", label: "角色类型", width: 120 },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Remark" },
  { tpl: "T_Create", sortable: true },
  { tpl: "T_Update", sortable: true },
]);
//点击列表上方的额外按钮
function onExtraBtns(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { selectedKeys } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      delete: () => handleDelete(selectedKeys, next),
      import: () => handleImport(next),
      export: () => handleExport(next), // 当handleClickType设为''生效
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
  openPopup(`${row ? "编辑" : "新增"}角色`, [AddEdit, { id: row?.id, refreshList: next }]);
}
//删除角色
function handleDelete(ids: string[], next: FinallyNext) {
  DeleteMockRole({ ids }).then((res: CommonObj) => {
    next();
  });
}
// 导入
function handleImport(next: FinallyNext) {
  PostMockRole({
    arr: [
      { status: 1, role_text: "12", role: "12", remark: "111" },
      { status: 1, role_text: "13", role: "13", remark: "333" },
    ],
  }).then((res: CommonObj) => next());
}
// 导出
function handleExport(next: FinallyNext) {
  showConfirmMessage("确认导出吗？", "warning", "自定义导出逻辑示例").then(() => {
    GetMockRole({ exports: true }).then((res: CommonObj[]) => {
      exportExcel(getExportRows(cols.value, res));
      next();
    });
  });
}
</script>
<style lang="scss" scoped></style>
