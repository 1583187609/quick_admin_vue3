<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="handleFetch"
    :extraBtns="['add', 'delete']"
    :operateBtns="getOperateColBtns"
    :pagination="false"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
    <template #icon="{ row }">
      <BaseIcon :name="row.icon" size="22" v-if="row.icon" />
      <template v-else>{{ emptyStr }}</template>
    </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { GetMockMenu, DeleteMockMenu } from "@/api-mock";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import AddEdit from "./AddEdit/Index.vue";
import { CommonObj, FinallyNext } from "@/core/_types";
import { emptyStr, handleBtnNext } from "@/utils";
import { ExtraBtnRestArgs } from "@/core/components/crud/BaseCrud/_types";
import { usePopup } from "@/hooks";
import { getFilterList, getListTotal, getNavsTree } from "#/mock/utils";
import { autoMenus } from "@/router/routes/auto";

export type MenuListType = "automate" | "dynamic";

const props = withDefaults(
  defineProps<{
    type?: MenuListType;
  }>(),
  {
    type: "dynamic",
  }
);

const { openPopup } = usePopup();
const menuTree = ref<MenuTreeNode[]>([]);
const fields = ref<FormField[]>([
  { prop: "name", label: "菜单名称" },
  {
    prop: "is_link",
    label: "是否外链",
    type: "select",
    attrs: {
      options: "D_YesNoStatus",
    },
  },
  {
    prop: "status",
    label: "状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
  {
    prop: "is_cache",
    label: "是否缓存",
    type: "select",
    attrs: {
      options: "D_YesNoStatus",
    },
  },
  props.type === "dynamic" && {
    prop: "create_time",
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
    fixed: "left",
  },
  {
    prop: "type_text",
    label: "类型",
    minWidth: 60,
  },
  { prop: "icon", label: "图标", width: 60, type: "slot" },
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
  ...(props.type === "dynamic"
    ? [
        { prop: "create_time", label: "创建时间" },
        { prop: "update_time", label: "更新时间" },
      ]
    : []),
  // { type: "operate", label: "操作", width: 240 }, //  245 可覆盖操作列的属性设置
]);
// 获取操作栏的按钮
function getOperateColBtns(row: CommonObj) {
  const { children, status } = row;
  const total = getListTotal(children);
  const popconfirm = total ? `确定删除及其子级共 ${total + 1} 条记录吗？` : true;
  return ["edit", { name: "delete", popconfirm }, status === 1 ? "forbid" : "enable"];
}
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
// 新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}菜单`, [AddEdit, { data: row, menuTree: menuTree.value, refreshList: next }]);
}
// 删除
function handleDelete(ids: string[], next: FinallyNext) {
  DeleteMockMenu({ ids }).then((res: CommonObj) => next());
}
// 切换状态
function handleToggleStatus(row: CommonObj, next: FinallyNext) {}

// 处理请求
function handleFetch(data: CommonObj) {
  const { type } = props;
  if (type === "automate") {
    return new Promise(resolve => {
      const allRecords = getNavsTree(autoMenus) as MenuTreeNode[];
      menuTree.value = allRecords;
      const records = getFilterList(JSON.parse(JSON.stringify(allRecords)), data);
      resolve({ total_num: 10, records, has_next: false });
    });
  }
  if (type === "dynamic") {
    return GetMockMenu(data).then((res: CommonObj) => {
      menuTree.value = res.records;
      return res;
    });
  }
}
</script>
<style lang="scss" scoped></style>
