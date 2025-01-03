<!-- 用户列表 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockUser"
    :extraBtns="[
      'add',
      { name: 'login', text: '登录', attrs: { type: 'primary' } },
      { name: 'logout', text: '登出', popconfirm: '确认退出登录吗？', attrs: { type: 'danger' } },
    ]"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
    ref="baseCrudRef"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockUser, DeleteUserDelete, PostMockUserLogout } from "@/modules/project-center/easy-note/apis";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext, showMessage } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { usePopup } from "@/hooks";
import Login from "./Login.vue";

const { openPopup } = usePopup();
const baseCrudRef = ref(null);
const fields: FormField[] = [
  { prop: "id", label: "用户ID" },
  {
    prop: "user_name",
    label: "姓名",
  },
  {
    prop: "gender",
    label: "性别",
    type: "select",
    attrs: {
      options: "D_Gender",
    },
  },
  { prop: "age", label: "年龄", type: "BaseNumberRange" },
  { prop: "role", label: "角色类型", type: "select", attrs: { options: "D_RoleType" } },
  { prop: "create_time", label: "注册时间", type: "date-picker" },
];
const cols: TableCol[] = [
  { tpl: "T_Id" },
  {
    prop: "user_name",
    label: "姓名",
    minWidth: 90,
  },
  {
    prop: "gender",
    label: "性别",
    type: "BaseTag",
    attrs: {
      name: "D_Gender",
    },
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "nickname",
    label: "用户昵称",
    minWidth: 120,
  },
  { tpl: "T_Phone" },
  {
    prop: "status",
    label: "账号状态",
    type: "BaseTag",
    attrs: {
      name: "D_EnableStatus",
    },
  },
  { prop: "create_time", label: "注册时间" },
  { prop: "role", label: "角色类型", type: "BaseTag", attrs: { name: "D_RoleType" } },
];
function onExtraBtns(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      login: () => openPopup("登录", [Login, { refreshList }]),
      logout: handleLogout,
    },
    name
  );
}
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => DeleteUserDelete({ id }).then(() => next()),
    },
    name
  );
}
function handleLogout() {
  PostMockUserLogout().then(() => {
    showMessage("退出登录成功");
  });
}
//新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}`, [AddEdit, { data: row, refreshList: next }]);
}
// 刷新列表
function refreshList() {
  baseCrudRef.value?.refreshList();
}
</script>
<style lang="scss" scoped></style>
