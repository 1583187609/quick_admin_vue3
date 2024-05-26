<!-- 组件-学历认证 -->
<template>
  <BaseForm style="width: 200px" :fields="fields" class="education-auth"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { BtnName } from "@/components/BaseBtn";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const fields: FormField[] = [
  { prop: "xxwzxrz", label: "学信网在线认证", type: "switch", span: 24 },
  { prop: "xxwyzmrz", label: "学信网验证码认证", type: "switch", span: 24 },
  { prop: "hwxlrz", label: "海外学历认证", type: "switch", span: 24 },
  { prop: "zxdxsrz", label: "在校大学生认证", type: "switch", span: 24 },
];
</script>
<style lang="scss" scoped></style>
