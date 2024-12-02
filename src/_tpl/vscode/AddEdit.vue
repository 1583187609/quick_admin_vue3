<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :afterSuccess="() => refreshList()"
    :extraParams="data ? { id: data.id } : {}"
  />
</template>
<script lang="ts" setup>
import { reactive } from "vue";
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
  {
    prop: "xm",
    label: "姓名",
    required: true,
  },
  {
    prop: "xb",
    label: "性别",
    type: "select",
    attrs: {
      options: "D_Gender",
    },
  },
];
</script>
<style lang="scss" scoped></style>
