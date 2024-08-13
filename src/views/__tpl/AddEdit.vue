<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="model"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :fetchSuccess="refreshList"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/form/_types";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const model = reactive<CommonObj>(Object.assign({}, props.data));
const fields: FormField[] = [
  {
    prop: "ffdx",
    label: "发放对象",
    required: true,
    attrs: {
      type: "textarea",
    },
    extraAttrs: {
      tips: "多个用户用，分隔",
    },
  },
  {
    prop: "ffje",
    label: "发放金额",
    required: true,
    type: "input-number",
  },
  {
    prop: "imtz",
    label: "IM通知",
    attrs: {
      type: "textarea",
    },
  },
  {
    prop: "bz",
    label: "备注",
    required: true,
    attrs: {
      type: "textarea",
    },
  },
];
</script>
<style lang="scss" scoped></style>
