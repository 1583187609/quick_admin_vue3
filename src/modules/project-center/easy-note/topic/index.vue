<!-- 题目列表 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetTopicList"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetTopicList, DeleteTopicDelete } from "@/views/easy-note/apis";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { usePopup } from "@/hooks";
import { CommonObj, FinallyNext } from "@/core/_types";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "id", label: "题目ID" },
  {
    prop: "question",
    label: "问题",
  },
  {
    prop: "content",
    label: "内容",
  },
  { prop: "score", label: "评分", type: "input-number", attrs: { min: 0, max: 100 } },
  { tpl: "T_EnableStatus" },
  { prop: "industry_id", label: "所属行业", type: "select" },
];
const cols: TableCol[] = [
  { tpl: "T_Id" },
  {
    prop: "question",
    label: "问题",
    minWidth: 200,
  },
  {
    prop: "content",
    label: "内容",
    type: "BaseText",
    minWidth: 400,
  },
  { prop: "score", label: "评分" },
  { tpl: "T_EnableStatus" },
  {
    prop: "audit_status",
    label: "审核状态",
    type: "BaseTag",
    attrs: {
      name: "AuditStatus",
    },
  },
  { tpl: "T_Create" },
  { tpl: "T_Update" },
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
      delete: () => DeleteTopicDelete({ id }).then(() => next()),
    },
    name
  );
}
// 新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}`, [AddEdit, { data: row, refreshList: next }]);
}
</script>
<style lang="scss" scoped></style>
