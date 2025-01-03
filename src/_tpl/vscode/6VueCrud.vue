<!-- 增删改查列表描述 -->
<template>
  <BaseCrud
    v-model="modelData"
    :cols="cols"
    :fields="fields"
    :fetch="GetMockCommon"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
    <template #zdy>这是自定义列</template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { DeleteMockUser, GetMockCommon } from "@/api-mock";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/core/_types";
import AddEdit from "./AddEdit.vue";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();

const modelData = reactive<CommonObj>({
  xm: "张三",
  zt: 1,
});

const fields: FormFieldAttrs[] = [
  { prop: "xm", label: "姓名" },
  {
    prop: "zt",
    label: "状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
];

const cols: TableColAttrs[] = [
  { type: "selection" },
  { prop: "xm", label: "姓名" },
  { prop: "zt", label: "状态" },
  { prop: "zdy", label: "自定义", type: "slot" },
];

// 处理额外按钮的点击
function onExtraBtns(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
    },
    name
  );
}

// 处理操作栏按钮的点击
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
// 新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}`, [AddEdit, { data: row, refreshList: next }]);
}
</script>
<style lang="scss" scoped></style>
