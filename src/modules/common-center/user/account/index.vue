<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetUserList"
    :extraBtns="['add', { name: 'add', text: '新增(url)', to: '/system/user/detail' }, , 'delete', 'import', 'export']"
    :operateBtns="[
      'edit',
      {
        name: 'edit',
        text: '编辑(url)',
        to: (row: CommonObj) => `/system/user/detail?id=${row.id}`,
      },
      'delete',
      (row: CommonObj) => (row?.status === 1 ? 'forbid' : 'enable'),
      'view',
    ]"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
    @dargSortEnd="handleDragSortEnd"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { DeleteUserList, GetUserList, PostUserListExport, PostUserUpdate } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import AddEdit from "./AddEdit.vue";
import { exportExcel, handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/core/_types";
import { ExtraBtnRestArgs } from "@/core/components/crud/BaseCrud";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields = ref<FormField[]>([
  { prop: "id", label: "用户ID" },
  { prop: "name", label: "用户姓名" },
  {
    prop: "age",
    label: "年龄",
    type: "BaseNumberRange",
    // attrs: { minProp: "min_age", maxProp: "max_age" },
  },
  {
    prop: "gender",
    label: "性别",
    type: "select",
    attrs: {
      options: "D_Gender",
    },
  },
  {
    prop: "type",
    label: "用户类型",
    type: "select",
    attrs: {
      options: "D_RoleType",
    },
  },
  {
    prop: "status",
    label: "账号状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
]);
const cols: TableCol[] = [
  { tpl: "T_Selection" },
  { tpl: "T_Sort" },
  { tpl: "T_Index" },
  { tpl: "T_Id", label: "用户ID" },
  { prop: "name", label: "用户姓名", width: 90 },
  { prop: "gender_text", label: "性别", width: 90 },
  { prop: "age", label: "年龄", width: 90, sortable: true },
  { prop: "address_text", label: "地址", minWidth: 250 },
  { prop: "phone", label: "电话", minWidth: 120 },
  { prop: "type_text", label: "用户类型", minWidth: 100 },
  { prop: "status", label: "状态", type: "BaseTag" },
  // { type: "operate", label: "操作栏", width: 500 }, //  245 可覆盖操作列的属性设置
];
//点击操作栏的分组按钮
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      view: () => handleView(row),
      delete: () => handleDelete([row.id], next),
      forbid: () => handleToggleStatus(row, next),
      enable: () => handleToggleStatus(row, next),
    },
    name
  );
}
//点击列表上方的额外的按钮
function onExtraBtns(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { selectedKeys } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      delete: () => handleDelete(selectedKeys, next),
      export: () => handleExport(selectedKeys, next),
    },
    name
  );
}
//新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(row ? "编辑" : "新增", [AddEdit, { id: row?.id, refreshList: next }]);
}
//查看
function handleView(row: CommonObj) {
  openPopup("查看", [AddEdit, { id: row.id, pureText: true }]);
}
//批量删除
function handleDelete(ids: string[], next: FinallyNext) {
  DeleteUserList({ ids }).then((res: any) => {
    next();
  });
}
//导出
function handleExport(ids: string[], next: FinallyNext) {
  PostUserListExport({ ids, cols }).then((res: any) => {
    exportExcel(res, "用户列表");
    next();
  });
}
//禁用
function handleToggleStatus(row: CommonObj, next: FinallyNext) {
  const { status, id } = row;
  PostUserUpdate({
    id,
    status: status === 1 ? 2 : 1,
  }).then((res: CommonObj) => {
    next();
  });
}
//处理列表排序
function handleDragSortEnd(data: CommonObj, next: any) {
  console.log(data, "data-----------------");
  next();
}
</script>
<style lang="scss" scoped></style>
