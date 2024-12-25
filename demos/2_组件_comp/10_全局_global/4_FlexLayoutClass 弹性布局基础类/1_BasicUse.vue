<!-- summary 基础用法
全局按钮模板、全局表单项模板、全局表格列模板、全局字典、
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
