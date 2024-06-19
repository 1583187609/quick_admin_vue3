<!-- 页面-简介 -->
<template>
  <BaseForm :fields="fields" @submit="handleSubmit" submitText="下载"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { showMessage } from "@/utils";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const fields: FormFieldAttrs[] = [
  {
    prop: "rule",
    label: "配置规则",
    required: true,
    tips: "请输入JSON字符串",
    example: `[{"label":"姓名","prop":"name"},{"label":"性别","prop":"gender"},{"label":"年龄","prop":"age"}]`,
    attrs: {
      type: "textarea",
      rows: 10,
    },
  },
];
function handleSubmit() {
  showMessage("点击了下载按钮");
}
</script>
<style lang="scss" name="" scoped></style>
