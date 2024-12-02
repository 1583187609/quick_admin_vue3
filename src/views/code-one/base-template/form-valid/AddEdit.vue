<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :afterSuccess="refreshList"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>(Object.assign({}, props.data));
const fields: FormField[] = [
  { prop: "name", label: "校验名称", required: true },
  {
    prop: "rules",
    label: "校验规则",
    required: true,
    attrs: {
      type: "textarea",
      rows: 5,
    },
  },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Remark" },
];
</script>
<style lang="scss" scoped></style>
