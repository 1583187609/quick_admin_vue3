<!-- 表字段列表 -->
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
import { CommonObj, FinallyNext } from "@/vite-env";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "name", label: "字段名" },
  {
    prop: "type",
    label: "值类型",
    type: "select",
    attrs: {
      filterable: true,
      options: [],
    },
  },
  {
    prop: "classify",
    label: "所属分类",
    attrs: {
      filterable: true,
      options: [],
    },
  },
  { prop: "remark", label: "备注" },
];
const cols: TableCol[] = [
  {
    type: "index",
  },
  {
    prop: "name",
    label: "字段名",
    fixed: "left",
  },
  {
    prop: "type",
    label: "值类型",
  },
  {
    prop: "length",
    label: "长度",
  },
  {
    prop: "decimal",
    label: "小数位数",
  },
  {
    prop: "isPrimaryKey",
    label: "是否主键",
    type: "BaseTag",
    attrs: {
      name: "YesNoStatus",
    },
  },
  {
    prop: "notNull",
    label: "是否必填",
    type: "BaseTag",
    attrs: {
      name: "YesNoStatus",
    },
  },
  {
    prop: "isAutoIncrement",
    label: "是否自增",
    type: "BaseTag",
    attrs: {
      name: "YesNoStatus",
    },
  },
  {
    prop: "isUnsigned",
    label: "无符号",
    type: "BaseTag",
    attrs: {
      name: "YesNoStatus",
    },
  },
  {
    prop: "isFillZero",
    label: "填充零",
    type: "BaseTag",
    attrs: {
      name: "YesNoStatus",
    },
  },
  {
    prop: "defaultValue",
    label: "默认值",
  },
  {
    prop: "enums",
    label: "枚举类型",
  },
  {
    prop: "joinChar",
    label: "拼接符号",
  },
  {
    prop: "classify",
    label: "所属分类",
  },
  { type: "remark", fixed: "right" },
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
  openPopup(`${row ? "编辑" : "新增"}`, [AddEdit, { data: row, refreshList: next }]);
}
</script>
<style lang="scss" scoped></style>
