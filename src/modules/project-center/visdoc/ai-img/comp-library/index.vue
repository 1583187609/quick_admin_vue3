<!-- 页面-这是一个模板示例 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockUser"
    :extraBtns="['add', 'onShelf', 'offShelf']"
    :operateBtns="['edit', 'delete', ({ status }) => (status ? 'onShelf' : 'offShelf')]"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
    <template #xs>
      <el-button @click="openPopup('查看项数', [ItemsList])" type="primary" link>查看</el-button>
    </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockUser, DeleteMockUser } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import ItemsList from "./ItemsList.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "yhid", label: "组件ID" },
  {
    prop: "ffzt",
    label: "图表类型",
    type: "select",
    attrs: {
      // options: "D_YesNoStatus",
    },
  },
  { prop: "czr", label: "上架状态", type: "select" },
];
const cols: TableCol[] = [
  { type: "selection" },
  {
    tpl: "T_Id",
  },
  {
    prop: "ffsbyhid",
    label: "发放失败用户ID",
    minWidth: 210,
  },
  {
    tpl: "T_BaseImg",
    prop: "ffje",
    label: "预览图",
  },
  {
    prop: "xs",
    label: "项数",
    type: "slot",
  },
  { prop: "ffsj", label: "最小支持项数" },
  { prop: "imtz", label: "最大支持项数" },
  { tpl: "T_BaseTag", label: "上架状态" },
  { tpl: "T_BaseTag", label: "图表类型" },
  { prop: "updated", label: "最新上架时间" },
  { tpl: "T_Create" },
  { prop: "sjs", label: "设计师" },
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
      delete: () => DeleteMockUser({ id }).then(() => next()),
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
