<!-- 组件-心动嘉宾比例配置 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" style="width: 480px"> </BaseForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CommonObj, OptionItem } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
const userOpts: OptionItem[] = [
  { label: "喜欢我的", value: 1 },
  { label: "优质嘉宾", value: 2 },
  { label: "新用户", value: 3 },
  { label: "普通用户", value: 4 },
];
const modelData = reactive<CommonObj>({
  new_user: [{ user_type: undefined, ratio: undefined }],
  quality_user: [{ user_type: undefined, ratio: undefined }],
  common_user: [{ user_type: undefined, ratio: undefined }],
});
const addDelChildrenFields: FormFieldAttrs[] = [
  {
    prop: "user_type",
    label: "嘉宾类型",
    type: "select",
    required: false,
    attrs: {
      options: userOpts,
    },
  },
  { prop: "ratio", label: "占比", type: "input-number" },
];
const fields: FormFieldAttrs[] = [
  {
    prop: "new_user",
    label: "新用户",
    type: "BaseAddDelList",
    attrs: {
      fields: addDelChildrenFields,
    },
  },
  {
    prop: "quality_user",
    label: "优质嘉宾",
    type: "BaseAddDelList",
    attrs: {
      fields: addDelChildrenFields,
    },
  },
  {
    prop: "common_user",
    label: "普通用户",
    type: "BaseAddDelList",
    attrs: {
      fields: addDelChildrenFields,
    },
  },
];
</script>
<style lang="scss" scoped></style>
