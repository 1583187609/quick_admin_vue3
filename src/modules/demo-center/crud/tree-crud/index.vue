<!-- 带树的增删改查 -->
<template>
  <div class="q-page-view f-sb-s">
    <FilterTree :indent="12" :data="treeData" class="f-0 mr-o tree" />
    <BaseCrud
      class="f-1"
      v-model="modelData"
      :cols="cols"
      :fields="fields"
      :fetch="GetMockCommon"
      :extraBtns="['add', 'export']"
      :operateBtns="['edit', 'delete',(row:CommonObj)=>row.status ? 'forbid' : 'enable', 'log']"
      @extraBtns="onExtraBtns"
      @operateBtns="onOperateBtns"
      :tableAttrs="{ showSummary: true }"
    >
    </BaseCrud>
  </div>
</template>
<script lang="ts" setup>
import { GetMockCommon, GetMockDepartment } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { ref, reactive } from "vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import AddEdit from "./AddEdit.vue";
import { handleBtnNext } from "@/utils";
import { CommonObj, FinallyNext, OptionItem } from "@/core/_types";
import { usePopup } from "@/hooks";
import FilterTree from "@/core/components/tree/FilterTree.vue";

const { openPopup } = usePopup();
const treeData = ref<OptionItem[]>([]);
const modelData = reactive<CommonObj>({ age: [10, 30] });
const fields = ref<FormField[]>([
  { prop: "id", label: "用户ID" },
  { prop: "name", label: "用户姓名" },
  {
    prop: "age",
    label: "年龄",
    type: "BaseNumberRange",
  },
  {
    prop: "gender",
    label: "性别",
    type: "select",
    attrs: {
      options: "D_Gender",
    },
  },
  {
    prop: "role",
    label: "角色类型",
    type: "select",
    attrs: {
      options: "D_RoleType",
    },
  },
  {
    prop: "status",
    label: "账号状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
]);
const cols: TableCol[] = [
  { prop: "name", label: "用户姓名", width: 90 },
  { prop: "gender_text", label: "性别", width: 90, sortable: true },
  { prop: "age", label: "年龄", width: 90, sortable: true },
  { prop: "address_text", label: "地址", minWidth: 250 },
  { prop: "phone", label: "电话", minWidth: 120 },
  { prop: "role_text", label: "角色类型", minWidth: 90 },
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
    },
    name
  );
}
//新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(row ? "编辑" : "新增", [AddEdit, { id: row?.id, refreshList: next }]);
}
getTreeData();
function getTreeData() {
  GetMockDepartment().then((res: CommonObj) => {
    treeData.value = res.records;
  });
}
</script>
<style lang="scss" scoped>
.tree {
  width: 16em;
  border-radius: $radius-main;
  box-shadow: $shadow-main;
}
</style>
