<!-- 新增/编辑行业 -->
<template>
  <BaseForm
    style="width: 300px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PutIndustryUpdate : PostIndustryAdd"
    :afterSuccess="() => refreshList?.()"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostIndustryAdd, PutIndustryUpdate } from "@/modules/project-center/easy-note/apis";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>(Object.assign({ status: 1 }, props.data));
const fields: FormField[] = [
  {
    prop: "name",
    label: "行业名称",
    required: true,
    attrs: {
      maxlength: 10,
      autofocus: true,
    },
  },
  {
    prop: "status",
    label: "启用状态",
    type: "switch",
  },
];
</script>
<style lang="scss" scoped></style>
