<!-- summary 基础树 
  继承el-tree，并扩展了叶子节点点击事件 onLeafNodeClick
-->
<template>
  <el-tree @nodeClick="handleNodeClick" class="base-tree hover-show-scroll" :load="load" :data="data" :lazy="lazy" ref="treeRef">
    <template #empty>
      <BaseEmpty />
    </template>
    <template #[key]="scope" v-for="(val, key) in getSlotsMap(slots)" :key="key">
      <BaseRender :renderData="val" :scope="scope" />
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { CommonObj, CommonSlots } from "@/core/_types";
import { getSlotsMap } from "@/utils";
import { ElTree } from "element-plus";

const props = withDefaults(
  defineProps<{
    load?: (node: Node, resolve: (data: CommonObj[]) => void) => CommonObj[];
    lazy?: boolean;
    data?: CommonObj[];
    slots?: CommonSlots;
  }>(),
  {
    lazy: _props => !!_props.load,
    data: () => [],
  }
);
const $emit = defineEmits(["nodeClick", "leafNodeClick"]);
const treeRef = ref<InstanceType<typeof ElTree>>(null);
function handleNodeClick(...args) {
  $emit("nodeClick", ...args);
  const [data, node, treeNode, event] = args;
  if (node.isLeaf) $emit("leafNodeClick", ...args);
}
defineExpose({
  treeRef,
});
</script>
<style lang="scss" scoped>
.base-tree {
  overflow: auto;
  padding-bottom: 100px;
}
</style>
