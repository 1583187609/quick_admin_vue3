<!-- summary 基础用法
 对el-tree进一步处理，方便使用。提供了基础树、过滤树。
-->
<template>
  <div class="f-fs-fs">
    <BaseSection :gap="false" title="空树">
      <BaseTree />
    </BaseSection>
    <BaseSection :gap="false" title="基础树">
      <BaseTree :data="treeData" show-checkbox />
    </BaseSection>
    <BaseSection :gap="false" title="插槽树">
      <BaseTree :data="treeData" show-checkbox :slots="[TreeItem, { testProp: 'testProp' }]" />
    </BaseSection>
    <BaseSection :gap="false" title="懒加载树">
      <BaseTree :load="loadNode" :props="treeProps" />
    </BaseSection>
    <BaseSection :gap="false" title="过滤树">
      <FilterTree :data="treeData" />
    </BaseSection>
  </div>
</template>
<script lang="ts" setup>
import { loadNode, treeData, treeProps } from "./_temp";
import FilterTree from "@/core/components/tree/FilterTree.vue";
import TreeItem from "./_components/TreeItem.vue";
</script>
<style lang="scss" scoped>
.base-section {
  margin-right: $gap;
}
</style>
