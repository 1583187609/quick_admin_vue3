<!-- 工程新增/编辑 -->
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
const modelData = reactive<CommonObj>({ ...props.data });
const fields: FormField[] = [
  {
    prop: "name",
    label: "工程名称",
    required: true,
  },
  {
    prop: "url",
    label: "查看地址",
    required: true,
  },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Remark" },
];
</script>
<style lang="scss" scoped></style>
