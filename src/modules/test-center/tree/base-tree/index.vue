<!-- 基础树示例 -->
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
