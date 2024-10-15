<!-- 组件 - 创建分块表单 -->
<template>
  <BaseForm class="create-base-form" v-model="modelData" :fields="fields" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/form/_types";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const modelData = reactive<CommonObj>({ form_type: 0 });
const fields = computed<FormField[]>(() => {
  return [
    {
      prop: "form_type",
      label: "表单类型",
      type: "radio-group",
      options: [
        { label: "基础表单", value: 0 },
        { label: "分块表单", value: 1 },
      ],
    },
  ];
});
</script>
<style lang="scss" scoped></style>
