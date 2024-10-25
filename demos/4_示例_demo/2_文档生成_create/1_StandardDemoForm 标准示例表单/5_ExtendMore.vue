<!-- summary 继承与扩展
  插槽及其他属性功能，完全继承自ElementPlus。需谨记 Dom嵌套跟JSON嵌套保持一致的原则
 -->
<template>
  <BaseForm :fields="fields" :fetch="PostMockCommon"></BaseForm>
</template>
<script lang="ts" setup>
import { FormFieldAttrs } from "@/core/form/_components/FieldItem";
import { PostMockCommon } from "@/api-mock";

const fields: FormFieldAttrs[] = [
  { prop: "xm_1", label: "项目1" },
  { prop: "xm_2", label: "项目2" },
];
</script>
<style lang="scss" scoped></style>
