<!-- summary 请求参数&响应数据 处理
  请求参数：规则同BaseForm
  响应数据：规则同BaseTable
  可统一处理：
-->
<template>
  <BaseCrud
    :style="{ height: showMaxHeight }"
    :cols="cols"
    :fields="fields"
    :fetch="GetMockUser"
    :extraBtns="['add', { name: 'add', text: '新增（url)', to: '/common-center/user/detail' }, , 'delete', 'import', 'export']"
    :operateBtns="[
      'edit',
      {
        name: 'edit',
        text: '编辑（url)',
        to: (row: CommonObj) => `/common-center/user/detail?id=${row.id}`,
      },
      'delete',
      (row: CommonObj) => (row?.status === 1 ? 'forbid' : 'enable'),
      'view',
    ]"
    :grid="showGridAttrs"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
    @dargSortEnd="handleDragSortEnd"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { DeleteMockUser, GetMockUser, PatchMockUser } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/core/_types";
import { ExtraBtnRestArgs } from "@/core/components/crud/BaseCrud";
import { showMaxHeight, showGridAttrs } from "#/scripts/doc/config";
import { TableDragSortEndNext } from "@/core/components/table/_types";

import { usePopup } from "@/hooks";

const { openPopup } = usePopup();

const fields = ref<FormField[]>([
  { prop: "id", label: "用户ID" },
  { prop: "name", label: "用户姓名" },
  {
    prop: "age",
    label: "年龄",
    type: "BaseNumberRange",
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
    prop: "role",
    label: "角色类型",
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
  { type: "selection" },
  { type: "sort" },
  { type: "index" },
  { prop: "id", label: "用户ID", width: 70 },
  { prop: "name", label: "用户姓名", width: 90 },
  { prop: "gender_text", label: "性别", width: 90 },
  { prop: "age", label: "年龄", width: 90, sortable: true },
  { prop: "address_text", label: "地址", minWidth: 250 },
  { prop: "phone", label: "电话", minWidth: 120 },
  { prop: "role_text", label: "角色类型", minWidth: 100 },
  { prop: "status", label: "状态", type: "BaseTag" },
];
//点击操作栏的分组按钮
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
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
  // openPopup(row ? "编辑" : "新增", h(AddEdit, { id: row?.id, refreshList: next }));
  const title = row ? "编辑" : "新增";
  openPopup(title, `${title} - 弹窗内容`);
}
//批量删除
function handleDelete(ids: string[], next: FinallyNext) {
  DeleteMockUser({ ids }).then((res: any) => {
    next();
  });
}
//导出
function handleExport(ids: string[], next: FinallyNext) {
  GetMockUser({ exports: true }).then((res: any) => next());
}
//禁用
function handleToggleStatus(row: CommonObj, next: FinallyNext) {
  const { status, id } = row;
  PatchMockUser({
    id,
    status: status === 1 ? 2 : 1,
  }).then((res: CommonObj) => {
    next();
  });
}
//处理列表排序
function handleDragSortEnd(data: CommonObj, next: TableDragSortEndNext) {
  next();
}
</script>
<style lang="scss" scoped></style>
