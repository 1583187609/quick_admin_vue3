<template>
  <BaseCrud
    :cols="cols"
    v-model="model"
    :fields="fields"
    :fetch="GetMockCommonList"
    :extraBtns="['add']"
    :operateBtns="[
      'edit',
      {
        name: 'plus',
        text: '增加当日次数',
        attrs: { icon: 'Plus', type: 'success' },
      },
      {
        name: 'minus',
        text: '减少当日次数',
        attrs: { icon: 'Minus', type: 'danger' },
      },
    ]"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
    :tableAttrs="{ showSummary: true }"
    :operateBtnsAttrs="{ vertical: true }"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockCommonList } from "@/api-mock";
import { FormField } from "@/components/form/_types";
import { TableCol } from "@/components/table/_types";
import { ref, reactive, inject } from "vue";
import { BtnName } from "@/components/BaseBtn/_types";
import AddEdit from "./AddEdit.vue";
import FormPopup from "./FormPopup.vue";
import { handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/vite-env";
import { h } from "vue";

const openPopup: any = inject("openPopup");
const model = reactive<CommonObj>({ age: [20, 30] });
const fields = ref<FormField[]>([
  { prop: "id", label: "用户ID" },
  { prop: "name", label: "用户姓名" },
  {
    prop: "age",
    label: "年龄",
    type: "BaseNumberRange",
    // attrs: { minProp: "min_age", maxProp: "max_age" },
  },
  {
    prop: "gender",
    label: "性别",
    type: "select",
    options: "Gender",
  },
  {
    prop: "type",
    label: "用户类型",
    type: "select",
    options: "RoleType",
  },
  {
    prop: "status",
    label: "账号状态",
    type: "select",
    options: "EnableStatus",
  },
]);
const cols: TableCol[] = [
  { prop: "name", label: "用户姓名", width: 90 },
  { prop: "gender_text", label: "性别", width: 90, sortable: true },
  { prop: "age", label: "年龄", width: 90, sortable: true },
  { prop: "address_text", label: "地址", minWidth: 250 },
  { prop: "phone", label: "电话", minWidth: 120 },
  { prop: "type_text", label: "用户类型", minWidth: 90 },
  { prop: "status", label: "状态", type: "BaseTag" },
];
//点击列表上方的额外的按钮
function onExtraBtns(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
    },
    name
  );
}
//点击操作栏的分组按钮
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      plus: () => handlePlusMinus(name, row, next),
      minus: () => handlePlusMinus(name, row, next),
    },
    name
  );
}

//新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(row ? "编辑" : "新增", h(AddEdit, { id: row?.id, refreshList: next }));
}
//增加或减少
function handlePlusMinus(name: BtnName, row: CommonObj, next: FinallyNext) {
  const titleMap: CommonObj = {
    plus: "增加当日次数",
    minus: "减少当日次数",
  };
  openPopup(titleMap[name as string], h(FormPopup, { id: row?.id, refreshList: next }), "dialog");
}
</script>
<style lang="scss" scoped></style>
