<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="handleFetch"
    :extraBtns="['add', 'delete']"
    :operateBtns="['edit', 'delete', (row:CommonObj)=>row.status===1 ? 'forbid' : 'enable']"
    :pagination="false"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
    <template #icon="{ row }">
      <BaseIcon :name="row.icon" size="22" v-if="row.icon"></BaseIcon>
      <template v-else>-</template>
    </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import { GetAuthMenuList, DeleteAuthMenuList } from "@/api-mock";
import { BtnName } from "@/components/BaseBtn/_types";
import { FormField } from "@/components/form/_types";
import { TableCol } from "@/components/table/_types";
import AddEdit from "./AddEdit/Index.vue";
import { CommonObj, FinallyNext, OpenPopupInject } from "@/vite-env";
import { MenuTreeNode } from "./AddEdit/_components/MenuTree.vue";
import { handleBtnNext } from "@/utils";
import { ExtraBtnRestArgs } from "@/components/crud/BaseCrud";

const openPopup = inject<OpenPopupInject>("openPopup");
const menuTree = ref<MenuTreeNode[]>([]);
const fields = ref<FormField[]>([
  { prop: "name", label: "菜单名称" },
  {
    prop: "is_link",
    label: "是否外链",
    type: "select",
    options: "YesNoStatus",
  },
  {
    prop: "status",
    label: "状态",
    type: "select",
    options: "EnableStatus",
  },
  {
    prop: "is_cache",
    label: "是否缓存",
    type: "select",
    options: "YesNoStatus",
  },
  {
    prop: "create_time_range",
    label: "创建时间",
    type: "date-picker",
  },
]);
const cols = ref<TableCol[]>([
  { type: "selection" },
  {
    prop: "name",
    label: "名称",
    minWidth: 220,
    align: "left",
  },
  {
    prop: "type_text",
    label: "类型",
    minWidth: 60,
  },
  { prop: "icon", label: "图标", width: 60, type: "custom" },
  { prop: "order", label: "排序", width: 60 },
  {
    prop: "perms",
    label: "权限标识",
    width: 180,
  },
  { prop: "menu_path", label: "菜单路径", minWidth: 300 },
  { prop: "component_path", label: "组件路径", minWidth: 300 },
  {
    prop: "status",
    label: "状态",
    type: "BaseTag",
  },
  { prop: "remark", label: "备注" },
  { prop: "create_time", label: "创建时间" },
  { prop: "update_time", label: "创建时间" },
]);
function onExtraBtns(name: BtnName, next: FinallyNext, restArgs: ExtraBtnRestArgs) {
  const { selectedKeys } = restArgs;
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
      delete: () => handleDelete(selectedKeys, next),
    },
    name
  );
}
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => handleDelete([row.id], next),
      forbid: () => handleToggleStatus(row, next),
      enable: () => handleToggleStatus(row, next),
    },
    name
  );
}
//新增/删除
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}菜单`, [AddEdit, { data: row, menuTree: menuTree.value, refreshList: next }]);
}
//删除
function handleDelete(ids: string[], next: FinallyNext) {
  DeleteAuthMenuList({ ids }).then((res: CommonObj) => {
    next();
  });
}
//切换状态
function handleToggleStatus(row: CommonObj, next: FinallyNext) {}

//处理请求
function handleFetch(data: CommonObj) {
  return GetAuthMenuList(data).then((res: CommonObj) => {
    menuTree.value = res.records;
    return res;
  });
}
</script>
<style lang="scss" scoped></style>
