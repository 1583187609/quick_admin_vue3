<!-- 基础树示例 -->
<template>
  <div class="f-fs-fs">
    <BaseSection title="空树">
      <BaseTree />
    </BaseSection>
    <BaseSection title="基础树">
      <BaseTree :data="treeData" show-checkbox />
    </BaseSection>
    <BaseSection title="插槽树">
      <BaseTree :data="treeData" show-checkbox :slots="[TreeItem, { testProp: 'testProp' }]" style="width: 250px" />
    </BaseSection>
    <BaseSection title="懒加载树">
      <BaseTree :load="loadNode" :props="treeProps" />
    </BaseSection>
    <BaseSection title="过滤树">
      <FilterTree :data="treeData" style="width: 400px" />
    </BaseSection>
  </div>
</template>
<script lang="ts" setup>
import { loadNode, treeData, treeProps } from "@/core/components/tree/_temp";
import FilterTree from "@/core/components/tree/FilterTree.vue";
import TreeItem from "./TreeItem.vue";
import { CommonObj } from "@/core/_types";
</script>
<style lang="scss" scoped>
.base-section {
  margin-right: $gap;
}
</style>
