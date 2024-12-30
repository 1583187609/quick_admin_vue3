<!-- summary 全局表单配置
 基础属性
 表单项模板（查询表单+通用表单）
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
