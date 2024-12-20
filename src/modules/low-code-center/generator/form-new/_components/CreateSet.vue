<!-- 页面-简介 -->
<template>
  <BaseForm :fields="fields" style="width: 500px" submitText="确定" @submit="handleSubmit"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { FormFieldAttrs } from "@/core/components/form/_components/FieldItem";
import { usePopup } from "@/hooks";

const { closePopup } = usePopup();
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const fields: FormFieldAttrs[] = [{ prop: "filePath", label: "路径", required: true }];
function handleSubmit(data: CommonObj, next) {
  closePopup();
  next?.();
}
</script>
<style lang="scss" scoped></style>
