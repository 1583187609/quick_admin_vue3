<!-- 用户列表 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetUserList"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetUserList, DeleteUserDelete } from "@/views/easy-note/apis";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
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
      options: "Gender",
    },
  },
  { prop: "age", label: "年龄", type: "BaseNumberRange" },
  { prop: "role", label: "角色类型", type: "select", attrs: { options: "RoleType" } },
];
const cols: TableCol[] = [
  {
    type: "id",
  },
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
      name: "Gender",
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
  {
    type: "phone",
    // prop: "phone",
    // label: "电话号码",
    // minWidth: 100,
  },
  {
    prop: "account_status",
    label: "账号状态",
    type: "BaseTag",
    attrs: {
      name: "AccountStatus",
    },
  },
  { prop: "create_time", label: "注册时间" },
  { prop: "role", label: "角色类型", type: "BaseTag", attrs: { name: "RoleType" } },
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
      delete: () => DeleteUserDelete({ id }).then(() => next()),
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
