<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PatchMockCommon : PostMockCommon"
    :afterSuccess="() => refreshList?.()"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostMockCommon, PatchMockCommon } from "@/api-mock";
import { CommonObj, FinallyNext } from "@/core/_types";
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
    prop: "ffdx",
    label: "上传图标",
    required: true,
    type: "BaseUpload",
  },
];
</script>
<style lang="scss" scoped></style>
