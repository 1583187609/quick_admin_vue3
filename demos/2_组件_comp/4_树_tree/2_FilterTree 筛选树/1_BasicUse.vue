<!-- 基础用法
  相对于BaseTree，增加了搜索功能。
  默认过滤
  传入options属性，手动改写过滤规则
-->
<template>
  <div class="f-fs-fs-w">
    <FilterTree />
    <FilterTree />
  </div>
</template>
<script lang="ts" setup>
import FilterTree from "@/core/components/tree/FilterTree.vue";
</script>
<style lang="scss" scoped></style>
