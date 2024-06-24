<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="PostUserList"
    :extraBtns="['add', { name: 'add', text: '新增（url)', to: '/system/user/detail' }, , 'delete', 'import', 'export']"
    :groupBtns="[
      'edit',
      {
        name: 'edit',
        text: '编辑（url)',
        to: (row: CommonObj) => `/system/user/detail?id=${row.id}`,
      },
      'delete',
      (row: CommonObj) => (row?.status === 1 ? 'forbid' : 'enable'),
      'view',
    ]"
    @extraBtn="onExtraBtn"
    @groupBtn="onGroupBtn"
    @dargSortEnd="handleDragSortEnd"
    selection
    index
    sort
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { DeleteUserList, PostUserList, PostUserListExport, PutUserUpdate } from "@/api-mock";
import { FormField } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
import { ElMessage, dayjs } from "element-plus";
import { ref, reactive, inject } from "vue";
import { BaseBtnType, BtnName } from "@/components/BaseBtn";
import AddEdit from "./AddEdit.vue";
import { useDictStore } from "@/store";
import { exportExcel, handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/vite-env";
import { ExtraBtnRestArgs } from "@/components/BaseCrud";
const { getOpts } = useDictStore();
const genderOpts = getOpts("Gender");
const roleTypeOpts = getOpts("RoleType");
const enableStatusOpts = getOpts("EnableStatus");
const openPopup: any = inject("openPopup");
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
    options: genderOpts,
  },
  {
    prop: "type",
    label: "用户类型",
    type: "select",
    options: roleTypeOpts,
  },
  {
    prop: "status",
    label: "账号状态",
    type: "select",
    options: enableStatusOpts,
  },
]);
const cols: TableField[] = [
  { prop: "id", label: "用户ID", width: 70 },
  { prop: "name", label: "用户姓名", width: 90 },
  { prop: "gender_text", label: "性别", width: 90, sortable: true },
  { prop: "age", label: "年龄", width: 90, sortable: true },
  { prop: "address_text", label: "地址", minWidth: 250 },
  { prop: "phone", label: "电话", minWidth: 120 },
  { prop: "type_text", label: "用户类型", minWidth: 90 },
  { prop: "status", label: "状态", type: "BaseTag" },
];
//点击操作栏的分组按钮
function onGroupBtn(name: BtnName, row: CommonObj, next: FinallyNext) {
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
function onExtraBtn(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
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
  openPopup(row ? "编辑" : "新增", {
    component: AddEdit,
    attrs: { id: row?.id, refreshList: next },
  });
}
//查看
function handleView(row: CommonObj) {
  openPopup("查看", {
    component: AddEdit,
    attrs: { id: row.id, pureText: true },
  });
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
  PutUserUpdate({
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
