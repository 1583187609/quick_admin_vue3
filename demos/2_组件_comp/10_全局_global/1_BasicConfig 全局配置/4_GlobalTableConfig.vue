<!-- summary 全局表格配置
  基础属性
  全局表格列模板、
-->
<template>
  <div class="example-vue">example-vue</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
