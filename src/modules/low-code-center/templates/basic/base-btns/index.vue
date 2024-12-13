<!-- 表格列模板列表 -->
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
import { GetUserList, DeleteUserList } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";
import btnsMap from "@/core/components/BaseBtn/_config";
import BaseOption from "@/core/components/BaseOption.vue";

const { openPopup } = usePopup();
const btnTypeOpts = Object.keys(btnsMap).map(it => {
  const label = btnsMap[it].text;
  return { label, value: it, slots: [BaseOption, { left: label, right: it }] };
});
const fields: FormField[] = [
  {
    prop: "type",
    label: "按钮类型",
    type: "select",
    attrs: {
      filterable: true,
      options: btnTypeOpts,
    },
  },
  { tpl: "T_EnableStatus" },
];
const cols: TableCol[] = [
  { tpl: "T_Sort" },
  { tpl: "T_Index" },
  {
    prop: "name",
    label: "按钮名称",
    minWidth: 210,
  },
  {
    prop: "color",
    label: "按钮颜色",
    minWidth: 210,
  },
  {
    prop: "auth",
    label: "权限",
    minWidth: 90,
  },
  {
    prop: "popconfirm",
    label: "提示确认",
    tpl: "T_BaseTag",
    attrs: {
      name: "SendStatus",
    },
  },
  { prop: "icon", label: "图标" },
  { prop: "to", label: "跳转地址" },
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
      delete: () => DeleteUserList({ id }).then(() => next()),
    },
    name
  );
}
//新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}`, [AddEdit, { data: row, refreshList: next, btnTypeOpts }]);
}
</script>
<style lang="scss" scoped></style>
