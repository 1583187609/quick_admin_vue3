<template>
  <BaseCrud
    :cols="cols"
    v-model="model"
    :fields="fields"
    :fetch="PostUserList"
    :extraBtns="['add']"
    :groupBtns="[
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
    @extraBtn="onExtraBtn"
    @groupBtn="onGroupBtn"
    :tableAttrs="{ showSummary: true }"
    :groupBtnsAttrs="{ vertical: true }"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { DeleteUserList, PostUserList, PostUserListExport, PutUserUpdate } from "@/api-mock";
import { FormField } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
import { ElMessage, dayjs } from "element-plus";
import { ref, reactive, inject } from "vue";
import { BaseBtnType, BtnName } from "@/components/BaseBtn";
import AddEdit from "./AddEdit.vue";
import FormPopup from "./FormPopup.vue";
import { useDictStore } from "@/store";
import { handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext } from "@/vite-env";
import { h } from "vue";
const { getOpts } = useDictStore();
const genderOpts = getOpts("Gender");
const roleTypeOpts = getOpts("RoleType");
const enableStatusOpts = getOpts("EnableStatus");
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
    options: genderOpts,
  },
  {
    prop: "type",
    label: "用户类型",
    type: "select",
    options: roleTypeOpts,
  },
  {
    prop: "status",
    label: "账号状态",
    type: "select",
    options: enableStatusOpts,
  },
]);
const cols: TableField[] = [
  { prop: "name", label: "用户姓名", width: 90 },
  { prop: "gender_text", label: "性别", width: 90, sortable: true },
  { prop: "age", label: "年龄", width: 90, sortable: true },
  { prop: "address_text", label: "地址", minWidth: 250 },
  { prop: "phone", label: "电话", minWidth: 120 },
  { prop: "type_text", label: "用户类型", minWidth: 90 },
  { prop: "status", label: "状态", type: "BaseTag" },
];
//点击列表上方的额外的按钮
function onExtraBtn(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
    },
    name
  );
}
//点击操作栏的分组按钮
function onGroupBtn(name: BtnName, row: CommonObj, next: FinallyNext) {
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
