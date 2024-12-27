<!-- 基础用法
  同el-tree属性，并扩展了onLeafNodeClick事件、简化了懒加载传参
-->
<template>
  <div class="f-fs-fs-w">
    <BaseTree />
    <BaseTree :data="treeData" show-checkbox />
    <BaseTree :data="treeData" show-checkbox :slots="[TreeItem, { testProp: 'testProp' }]" style="width: 250px" />
    <BaseTree :load="loadNode" :props="treeProps" />
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { loadNode, treeData, treeProps } from "./_data";
import TreeItem from "./_components/TreeItem.vue";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped>
.base-tree {
  margin: $gap-half $gap;
}
</style>
