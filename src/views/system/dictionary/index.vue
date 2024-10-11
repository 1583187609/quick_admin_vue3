<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockCommonList"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
    index
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { GetMockCommonList, DeleteUserList } from "@/api-mock";
import { FormField } from "@/components/form/_types";
import { TableCol } from "@/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/components/BaseBtn/_types";
import { CommonObj, FinallyNext, OpenPopupInject } from "@/vite-env";

const openPopup = inject<OpenPopupInject>("openPopup");
const fields: FormField[] = [{ prop: "zdmc", label: "字典名称" }];
const cols: TableCol[] = [
  {
    prop: "zdlx",
    label: "字典类型",
    minWidth: 210,
  },
  {
    type: "remark",
    // prop: "produce",
  },
  {
    type: "create",
  },
  {
    type: "update",
  },
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
