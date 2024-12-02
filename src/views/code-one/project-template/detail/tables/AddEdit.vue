<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :afterSuccess="() => refreshList()"
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
const modelData = reactive<CommonObj>({ status: 1, ...props.data });
const fields: FormField[] = [
  {
    prop: "cn_name",
    label: "表名称",
    required: true,
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "name",
    label: "英文名",
    required: true,
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "tpl",
    label: "表模板",
    type: "select",
    attrs: {
      disabled: true,
      filterable: true,
      options: Array(4)
        .fill("")
        .map((it, i) => ({ label: `模板${i + 1}`, value: i })),
    },
  },
  {
    prop: "status",
    label: "启用状态",
    type: "switch",
  },
  {
    prop: "remark",
    label: "备注",
    attrs: {
      type: "textarea",
      maxlength: 50,
    },
  },
];
</script>
<style lang="scss" scoped></style>
