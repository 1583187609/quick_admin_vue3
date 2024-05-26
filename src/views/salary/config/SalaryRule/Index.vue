<!-- 页面-简介 -->
<template>
  <div class="f-sb-s">
    <div class="f-0 mr-o left">
      <strong class="title">薪资项</strong>
      <el-input class="mt-h mb-h" placeholder="请输入薪资项" clearable />
      <el-tree />
    </div>
    <BaseCrud
      class="f-1"
      :fields="fields"
      :cols="cols"
      :extraBtns="[
        { name: 'add', text: '新增分组' },
        { name: 'edit', text: '批量编辑' },
        { name: 'repeal', text: '取消编辑' },
        {
          name: 'move',
          text: '批量移动',
          attrs: { type: 'primary', icon: 'Pointer' },
        },
        { name: 'delete', text: '批量移除' },
      ]"
      :fetch="PostUserList"
      :groupBtns="['edit', { name: 'delete', text: '移除' }]"
      @extraBtn="onExtraBtn"
      @groupBtn="onGroupBtn"
      sort
    ></BaseCrud>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { PostUserList } from "@/api-mock";
import { ElMessage, popconfirmProps } from "element-plus";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { TableFieldAttrs } from "@/components/table";
import AddGroup from "./AddGroup.vue";
import MoveGroup from "./MoveGroup.vue";
import EditSalary from "./EditSalary.vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { handleBtnNext } from "@/utils";
const openPopup = inject<any>("openPopup");
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const fields: FormFieldAttrs[] = [{ prop: "xzx", label: "薪资项" }];
const cols: TableFieldAttrs[] = [
  { prop: "xzx", label: "薪资项", minWidth: 180 },
  { prop: "sx", label: "属性", minWidth: 180 },
  { prop: "lx", label: "类型", minWidth: 180 },
  { prop: "jslx", label: "缴税类型", minWidth: 180 },
];
function onExtraBtn(name: string, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddGroup(next),
      move: () => handleMoveGroup(next),
      edit: () => handleEdit(null, next),
    },
    name
  );
}
function onGroupBtn(name: string, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleEdit(row, next),
      delete: () => handleDelete(row.id, next),
    },
    name
  );
}
function handleAddGroup(next: FinallyNext) {
  openPopup("新增分组", {
    component: AddGroup,
    attrs: {
      refreshList: next,
    },
  });
}
function handleMoveGroup(next: FinallyNext) {
  openPopup("移动至", {
    component: MoveGroup,
    attrs: {
      refreshList: next,
    },
  });
}
function handleEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup("编辑薪资项", {
    component: EditSalary,
    attrs: {
      data: row,
      refreshList: next,
      isView: false,
    },
  });
}
function handleDelete(id: StrNum, next: FinallyNext) {
  //   PostDel().then((res:CommonObj)=>{
  ElMessage.success("删除成功！");
  //   })
}
</script>
<style lang="scss" scoped>
.left {
  padding: $gap-half;
  border-radius: $radius-main;
  border: $border-main;
  background: #fff;
  @include shadow-main();
}
</style>
