<!-- summary 栅格布局
  通过grid属性实现。遵循子级覆盖父级原则。
-->
<template>
  <BaseForm :fields="fields" :grid="12"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs } from "@/core/components/form/_components/FieldItem";
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true, quickAttrs: { grid: 8 } },
  {
    prop: "gender",
    label: "性别",
    type: "select",
    attrs: {
      options: "D_Gender",
    },
    quickAttrs: { grid: 8 },
  },
  {
    prop: "region",
    label: "省市区",
    type: "cascader",
    attrs: {
      options: "C_Region",
    },
    quickAttrs: { grid: 8 },
  },
  { prop: "age", label: "年龄", type: "input-number" },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 100, max: 250 }, quickAttrs: { grid: 24 } },
  { prop: "avatar", label: "头像", type: "BaseUpload" },
];
</script>
<style lang="scss" scoped></style>
