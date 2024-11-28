<!-- 新增/编辑用户 -->
<template>
  <BaseForm
    style="width: 600px"
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
const modelData = reactive<CommonObj>(Object.assign({ gender: 0, status: 1, account_status: 0 }, props.data));
const fields: FormField[] = [
  {
    prop: "user_name",
    label: "姓名",
    required: true,
    attrs: {
      maxlength: 6,
    },
  },
  {
    prop: "gender",
    label: "性别",
    required: true,
    type: "radio-group",
    attrs: {
      options: "Gender",
    },
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "age",
    label: "年龄",
    quickAttrs: { grid: 12, rulesType: "age" },
  },
  {
    prop: "phone",
    label: "电话号码",
    required: true,
    quickAttrs: {
      grid: 12,
      rulesType: "phone",
    },
  },
  {
    prop: "password",
    label: "密码",
    required: true,
    quickAttrs: {
      grid: 12,
      rulesType: "password",
    },
  },
  {
    prop: "status",
    label: "启用状态",
    type: "switch",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "account_status",
    label: "账号状态",
    type: "select",
    attrs: { options: "AccountStatus" },
    quickAttrs: {
      grid: 12,
    },
  },
];
</script>
<style lang="scss" scoped></style>
