<!-- summary 栅格布局
  通过grid属性实现。遵循子级覆盖父级原则。
-->
<template>
  <BaseForm :fields="fields" :grid="12"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs } from "@/components/form/_components/FieldItem";
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true, extraAttrs: { grid: 8 } },
  { prop: "gender", label: "性别", type: "select", options: "Gender", extraAttrs: { grid: 8 } },
  { prop: "region", label: "省市区", type: "cascader", options: "Region", extraAttrs: { grid: 8 } },
  { prop: "age", label: "年龄", type: "input-number" },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 100, max: 250 }, extraAttrs: { grid: 24 } },
  { prop: "avatar", label: "头像", type: "BaseUpload" },
];
</script>
<style lang="scss" scoped></style>
