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
import { FormField } from "@/components/BaseFormItem";
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
    prop: "zdmc",
    label: "字典名称",
    required: true,
    attrs: {
      maxlength: 10,
    },
  },
  {
    prop: "zdlx",
    label: "字典类型",
    required: true,
    type: "select",
  },
  {
    prop: "bz",
    label: "备注",
    attrs: {
      type: "textarea",
    },
  },
];
</script>
<style lang="scss" scoped></style>
