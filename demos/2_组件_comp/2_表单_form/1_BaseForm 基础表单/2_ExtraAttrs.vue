<!-- summary 额外属性
  除了ElementPlus的属性外，提供了一系列额外属性，方便快速开发，放置在 extraAttrs 中。
 -->
<template>
  <BaseForm :fields="fields" :fetch="PostMockCommon"></BaseForm>
</template>
<script lang="ts" setup>
import { FormFieldAttrs } from "@/components/form/_components/FieldItem";
import { PostMockCommon } from "@/api-mock";
const fields: FormFieldAttrs[] = [
  {
    prop: "cellphone",
    label: "电话",
    required: true,
    extraAttrs: {
      rulesType: "phone",
      popover: `required: true属性，需要另外设置，不在valid: "phone" 规则内`,
      tips: '通过设置valid:"phone"，则获得了电话号码正则长度等校验规则',
    },
  },
  {
    prop: "psd",
    label: "密码",
    extraAttrs: {
      popover: "设置tips，在底部获得注：的能力",
      rulesType: "password",
      example: "abc123456",
      tips: "设置example属性，则自动拼接到placeholder后面",
    },
  },
  {
    prop: "age",
    label: "年龄",
    extraAttrs: {
      popover: "设置popover属性，获得popover弹出层能力",
      rulesType: "age",
    },
  },
];
</script>
<style lang="scss" scoped></style>
