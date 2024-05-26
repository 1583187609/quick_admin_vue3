<!-- 组件 - 公积金设置 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="PostUserList"
    :extraBtns="[
      { name: 'edit', text: '批量编辑' },
      {
        name: 'setBaseNum',
        text: '批量设置缴纳基数',
        attrs: { type: 'primary' },
      },
      {
        name: 'setPayRatio',
        text: '批量设置个人缴存比例',
        attrs: { type: 'primary' },
      },
    ]"
    :groupBtns="['edit']"
    @extraBtn="onExtraBtn"
    @groupBtn="onGroupBtn"
    selection
  >
    <template #jnjs> <el-input-number :min="0" placeholder="缴纳基数" /> 元 </template>
    <template #grjcbl> <el-input-number :min="0" placeholder="缴存比例" /> % </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { ElMessage, popconfirmProps } from "element-plus";
import BatchEdit from "./BatchEdit.vue";
import { PostUserList } from "@/api-mock";
import { ExtraBtnRestArgs } from "@/components/BaseCrud";
import { handleBtnNext } from "@/utils";
export type BatchEditType = "edit" | "batchEdit" | "baseNum" | "payRatio";
const openPopup = inject<any>("openPopup");
const closePopup = inject<any>("closePopup");
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const fields: FormField[] = [
  {
    prop: "zc",
    label: "职称",
    type: "select",
    options: [],
  },
  {
    prop: "zj",
    label: "职级",
    type: "select",
    options: [],
  },
  {
    prop: "xm",
    label: "姓名",
  },
];
const cols: TableField[] = [
  { prop: "xm", label: "姓名", minWidth: 250 },
  { prop: "sszz", label: "所属组织", minWidth: 250 },
  { prop: "zc", label: "职称", minWidth: 250 },
  { prop: "zj", label: "职级", minWidth: 250 },
  { prop: "jnjs", label: "缴纳基数", minWidth: 200, type: "custom" },
  { prop: "grjcbl", label: "个人缴存比例", minWidth: 200, type: "custom" },
  { prop: "gxr", label: "更新人", minWidth: 250 },
];
function onExtraBtn(name: string, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { selectedKeys } = restArgs;
  handleBtnNext(
    {
      edit: () => handleEdit(selectedKeys, next, "batchEdit"),
      setBaseNum: () => handleEdit(selectedKeys, next, "baseNum"),
      setPayRatio: () => handleEdit(selectedKeys, next, "payRatio"),
    },
    name
  );
}
function onGroupBtn(name: string, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleEdit(row.id, next, "edit"),
    },
    name
  );
}
function handleEdit(ids: StrNum[], next: FinallyNext, type: BatchEditType) {
  const typeMap: CommonObj = {
    edit: "编辑",
    batchEdit: "批量编辑",
    baseNum: "批量设置缴存基数",
    payRatio: "批量设置个人缴存比例",
  };
  openPopup(`${typeMap[type] ?? ""}`, {
    component: BatchEdit,
    attrs: {
      type,
      ids,
      refreshList: next,
    },
  });
}
</script>
<style lang="scss" scoped></style>
