<!-- 头像驳回 -->
<template>
  <BaseForm v-model="model" :fields="fields" class="reject-avatar"></BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/components/form/_components/FieldItem";
import { ref, reactive, watch, computed } from "vue";
import { CommonObj } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const model = reactive<CommonObj>({ bhly: 1 });
const fields: FormField[] = [
  {
    prop: "bhly",
    label: "驳回理由",
    type: "radio-group",
    options: [
      { label: "不够严肃", value: 1 },
      { label: "形象不佳", value: 2 },
      { label: "卡通图片", value: 3 },
    ],
    attrs: {
      type: "button",
    },
  },
  {
    prop: "qt",
    label: "前台",
    type: "select",
    required: true,
  },
];
</script>
<style lang="scss" scoped></style>
