<!-- summary 快捷属性
  除了ElementPlus的属性外，提供了一系列额外属性，方便快速开发，放置在 quickAttrs 中。
 -->
<template>
  <BaseForm :fields="fields" :fetch="PostMockCommon"></BaseForm>
</template>
<script lang="ts" setup>
import { FormFieldAttrs } from "@/core/components/form/_components/FieldItem";
import { PostMockCommon } from "@/api-mock";
const fields: FormFieldAttrs[] = [
  {
    tpl: "T_Phone",
    prop: "cellphone",
    label: "电话",
    required: true,
    quickAttrs: {
      popover: `required: true属性，需要另外设置，不在valid: "phone" 规则内`,
      tips: '通过设置valid:"phone"，则获得了电话号码正则长度等校验规则',
    },
  },
  {
    tpl: "T_Password",
    prop: "psd",
    label: "密码",
    quickAttrs: {
      popover: "设置tips，在底部获得注：的能力",
      example: "abc123456",
      tips: "设置example属性，则自动拼接到placeholder后面",
    },
  },
  {
    tpl: "T_Age",
    quickAttrs: {
      popover: "设置popover属性，获得popover弹出层能力",
      tips: "设置模板（tpl属性），可以免写其他属性信息",
    },
  },
];
</script>
<style lang="scss" scoped></style>
