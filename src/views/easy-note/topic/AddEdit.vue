<!-- 新增/编辑题目 -->
<template>
  <BaseForm
    style="width: 1000px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PutTopicUpdate : PostTopicAdd"
    :afterSuccess="refreshList"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostTopicAdd, PutTopicUpdate } from "@/views/easy-note/apis";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
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
    prop: "question",
    label: "问题",
    required: true,
    attrs: {
      maxlength: 50,
    },
  },
  {
    prop: "content",
    label: "内容",
    required: true,
    // type: "BaseEditor",
    attrs: {
      type: "textarea",
      rows: 10,
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
