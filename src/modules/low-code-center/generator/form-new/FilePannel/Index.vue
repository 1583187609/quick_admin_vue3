<template>
  <SectionBox title="文件" class="file-pannel">
    <FilterTree
      :options="[
        { label: '全部', value: 0 },
        { label: '草稿', value: 1 },
      ]"
      :data="sysFileTplsTree"
      :slots="[TreeNode, { onAdd: handleAddEdit, onDelete: handleDelete, onEdit: handleAddEdit }]"
      :props="{ class: customNodeClass }"
      @leafNodeClick="handleLeafNodeClick"
      :filterNodeMethod="handleFilterNodeMethod"
    />
  </SectionBox>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import SectionBox from "../_components/SectionBox.vue";
import { sysGeneratorTplsNew } from "./_config";
import { CommonObj, FinallyNext } from "@/core/_types";
import TreeNode from "./_components/TreeNode.vue";
import { usePopup } from "@/hooks";
import AddFileConfig from "./_components/AddFileConfig.vue";
import { getTreeNodeByValue, getTreeNodesByValue, deleteTreeNodeByValue, showMessage } from "@/utils";
import FilterTree from "@/core/components/tree/FilterTree.vue";

const { openPopup } = usePopup();
let countTotal = 0;

const sysFileTplsTree = reactive(sysGeneratorTplsNew);
/**
 * 过滤出只包含草稿的树节点（后续再完善）
 * @param arr 每个子级的total统计不正确，后续再处理
 */
// function getFilterDraftTpls(arr: CommonObj[]): CommonObj[] {
//   if (!arr?.length) return [];
//   return arr.filter(item => {
//     const { children } = item;
//     if (children?.length) {
//       const tpls = getFilterDraftTpls(children);
//       if (!tpls.length) return false;
//       item.children = tpls;
//       item.total = tpls.length;
//       return true;
//     }
//     const isFind = item?.data?.isDraft;
//     if (isFind) countTotal++;
//     return isFind;
//   });
// }
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
  }>(),
  {
    modelValue: () => reactive({}),
  }
);
const $emit = defineEmits(["update:modelValue"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: string) => $emit("update:modelValue", val),
});

function handleLeafNodeClick(data) {
  modelVal.value = data;
}
function handleFilterNodeMethod([val, num]: (string | number)[], data: CommonObj, node: CommonObj): boolean {
  const isOnlyDraft = num === 1;
  if (!isOnlyDraft && !val) return true;
  return (isOnlyDraft ? data?.data?.isDraft : true) && data.label.includes(val);
}
function handleAddEdit(data: CommonObj, node: CommonObj) {
  const { isLeaf } = node;
  const isAdd = !isLeaf;
  data.name = data.label;
  let info: CommonObj = {};
  const { id, label } = data;
  if (isAdd) {
    info = { pId: id, type: "add" };
  } else {
    info = { name: label, type: "edit" };
  }
  openPopup((isAdd ? "新增" : "编辑") + "页面", [AddFileConfig, { data: info, onConfirm: handleConfirm }]);
}
function handleDelete(data: CommonObj, node: CommonObj) {
  const { id } = data;
  deleteTreeNodeByValue(sysFileTplsTree, id);
  showMessage("删除成功");
}
function handleConfirm(type: "add" | "edit", data: CommonObj, next: FinallyNext) {
  const { pId, name } = data;
  const node = getTreeNodeByValue(sysFileTplsTree, pId);
  if (!node) return;
  if (type === "add") node.children.push({ label: name });
  else if (type === "edit") node.label = name;
  else throw new Error(`暂未处理此类型：${type}`);
  next();
}
function customNodeClass(res: TreeNodeData, node: Node) {
  // return node.isLeaf ? "is-penultimate" : "other-red";
  // console.log(node, "data--------");
  // res?.data?.isDraft ? "red" : "";
  return "is-penultimate";
}
</script>
<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  padding-left: $gap-half;
}
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}
.other-red > .el-tree-node__content {
  color: red;
}
// :deep(.el-collapse-item__wrap) {
//   max-height: 400px;
//   overflow: auto;
// }
</style>
