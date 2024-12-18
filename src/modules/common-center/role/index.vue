<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockRole"
    :extraBtns="['add', 'delete', 'import', 'export']"
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
import { TableCol, TableColAttrs } from "@/core/components/table/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import AddEdit from "./AddEdit.vue";
import { exportExcel, handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/core/_types";
import { ExtraBtnRestArgs } from "@/core/components/crud/BaseCrud";
import { usePopup } from "@/hooks";
import { getExportRows } from "@/core/components/crud/BaseCrud/_utils";

const { openPopup } = usePopup();
const fields = ref<FormField[]>([
  {
    prop: "role",
    label: "角色类型",
    type: "select",
    attrs: {
      options: "D_RoleType",
    },
  },
  {
    prop: "status",
    label: "状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
  {
    prop: "create_times",
    label: "创建时间",
    type: "date-picker",
  },
]);
const cols = ref<TableColAttrs[]>([
  { type: "selection" },
  { prop: "role_text", label: "角色类型", width: 120 },
  { prop: "status", label: "状态", type: "BaseTag" },
  { prop: "remark", label: "备注", minWidth: 250 },
  { prop: "create_time", label: "创建时间", width: 180, sortable: true },
  { prop: "update_time", label: "修改时间", width: 180, sortable: true },
]);
//点击列表上方的额外按钮
function onExtraBtns(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { selectedKeys, exportRows } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      delete: () => handleDelete(selectedKeys, next),
      import: () => handleImport(next),
      // export: () => exportExcel(exportRows),
      export: () => handleExport(next),
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
  GetMockRole({ exports: true }).then((res: CommonObj[]) => {
    const exportRows = getExportRows(cols.value, res);
    exportExcel(exportRows);
    next();
  });
}
</script>
<style lang="scss" scoped></style>
