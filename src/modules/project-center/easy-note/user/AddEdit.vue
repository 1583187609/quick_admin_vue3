<!-- 新增/编辑用户 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    @submit="data ? PutUserUpdate : PostMockUser"
    :afterSuccess="() => refreshList?.()"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostMockUser, PutUserUpdate } from "@/modules/project-center/easy-note/apis";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
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
    prop: "nickname",
    label: "用户昵称",
    attrs: {
      maxlength: 16,
    },
  },
  {
    prop: "gender",
    label: "性别",
    required: true,
    type: "radio-group",
    attrs: {
      options: "D_Gender",
    },
    quickAttrs: {
      grid: 12,
    },
  },
  {
    tpl: "T_Age",
    // prop: "age",
    // label: "年龄",
    quickAttrs: { grid: 12 },
  },
  {
    tpl: "T_Phone",
    // prop: "phone",
    // label: "电话号码",
    required: true,
    quickAttrs: {
      grid: 12,
    },
  },
  {
    tpl: "T_Password",
    // prop: "password",
    // label: "密码",
    required: true,
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "status",
    label: "启用状态",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "account_status",
    label: "账号状态",
    type: "select",
    attrs: { options: "D_AccountStatus" },
    quickAttrs: {
      grid: 12,
    },
  },
];
</script>
<style lang="scss" scoped></style>
