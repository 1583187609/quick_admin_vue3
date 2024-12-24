<!-- summary 扩展的组件
  系统内置组件：BaseImg, BaseUpload, BaseNumberRange, …
  外部内嵌组件：UserInfo（后面再考虑是否加入，先直接用插槽吧）
  使用插槽，设置 type 为 slot
-->
<template>
  <BaseForm :fields="fields">
    <template #user_info>
      <UserInfo />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormFieldAttrs } from "@/core/components/form/_types";
import UserInfo from "@/components/UserInfo.vue";

const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true },
  { prop: "ages", label: "年龄范围", required: true, type: "BaseNumberRange" },
  {
    prop: "avatar",
    label: "头像",
    type: "BaseUpload",
    required: true,
  },
  { prop: "user_info", label: "用户信息", type: "slot" },
];
</script>
<style lang="scss" scoped></style>
