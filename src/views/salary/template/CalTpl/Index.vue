<!-- 页面-简介 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="PostUserList"
    :extraBtns="[{ name: 'add', text: '添加模板' }]"
    :groupBtns="[
      'edit',
      'view',
      'audit',
      { name: 'delete', popconfirm: false },
      {
        name: 'design',
        text: '工资单设计',
        attrs: { type: 'info', icon: 'Operation' },
      },
      {
        name: 'grant',
        text: '工资单发放',
        attrs: { type: 'info', icon: 'Money' },
      },
    ]"
    @extraBtn="onExtraBtn"
    @groupBtn="onGroupBtn"
  ></BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { ElMessage, popconfirmProps } from "element-plus";
import AddEdit from "./AddEdit.vue";
import DelTips from "./DelTips.vue";
import { PostUserList } from "@/api-mock";
import { handleBtnNext } from "@/utils";
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
    prop: "mbmc",
    label: "模板名称",
  },
];
const cols: TableField[] = [
  { prop: "mbmc", label: "模板名称", minWidth: 250 },
  { prop: "mbcy", label: "模板成员", minWidth: 250 },
  { prop: "cjr", label: "创建人", minWidth: 250 },
  { prop: "gxrq", label: "更新日期", minWidth: 250 },
  {
    prop: "status",
    label: "状态",
    type: "BaseTag",
    attrs: {
      name: "$AuditStatus",
    },
  },
];
function onExtraBtn(name: string, next: FinallyNext) {
  handleBtnNext({ add: () => handleAddEdit(null, next) }, name);
}
function onGroupBtn(name: string, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      view: () => handleView(row.id, next),
      audit: () => handleAudit(row.id, next),
      // delete: () => handleDelete(row.id, next),
      delete: () => {
        openPopup(
          {
            title: "温馨提示",
            confirm() {
              handleDelete(row.id, next);
            },
          },
          DelTips,
          "dialog",
          true
        );
      },
    },
    name
  );
}
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(row ? "编辑" : "新增", {
    component: AddEdit,
    attrs: {
      data: row,
      refreshList: next,
    },
  });
}
function handleView(row: CommonObj, next: FinallyNext) {}
function handleAudit(row: CommonObj, next: FinallyNext) {}
function handleDelete(row: CommonObj, next: FinallyNext) {
  //   PostDel().then((res:CommonObj)=>{
  closePopup("dialog");
  ElMessage.success("删除成功！");
  //   })
}
</script>
<style lang="scss" scoped></style>
