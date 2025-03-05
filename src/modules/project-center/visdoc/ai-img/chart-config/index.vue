<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud :cols="cols" :fetch="GetMockUser" :operateBtns="['edit']" @operateBtns="onOperateBtns"></BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockUser, DeleteMockUser } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const cols: TableCol[] = [
  {
    tpl: "T_BaseTag",
    // prop: "ffcgyhid",
    label: "图表类型",
  },
  {
    tpl: "T_BaseText",
    prop: "ffsbyhid",
    label: "prompt",
  },
  {
    prop: "ffje",
    label: "下级数量",
  },
];
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
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
