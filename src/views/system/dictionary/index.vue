<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockCommonList"
    :extraBtns="['add']"
    :groupBtns="['edit', 'delete']"
    @extraBtn="onExtraBtn"
    @groupBtn="onGroupBtn"
    index
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, inject, h } from "vue";
import { GetMockCommonList, DeleteUserList } from "@/api-mock";
import { FormField } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/components/BaseBtn";
import { useDictStore } from "@/store";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const { getOpts, getText } = useDictStore();
const openPopup: any = inject("openPopup");
const fields: FormField[] = [{ prop: "zdmc", label: "字典名称" }];
const cols: TableField[] = [
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
function onExtraBtn(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
    },
    name
  );
}
function onGroupBtn(name: any, row: CommonObj, next: FinallyNext) {
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
  openPopup(`${row ? "编辑" : "新增"}`, h(AddEdit, { data: row, refreshList: next }));
}
</script>
<style lang="scss" scoped></style>
