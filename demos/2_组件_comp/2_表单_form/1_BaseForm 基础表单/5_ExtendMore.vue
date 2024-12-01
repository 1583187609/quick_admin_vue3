<!-- summary 继承与扩展
  插槽及其他属性功能，完全继承自ElementPlus。需谨记 Dom 嵌套跟JSON嵌套保持一致的原则
 -->
<template>
  <BaseForm :fields="fields" :fetch="PostMockCommon"></BaseForm>
</template>
<script lang="ts" setup>
import { FormFieldAttrs } from "@/core/components/form/_components/FieldItem";
import { PostMockCommon } from "@/api-mock";

const fields: FormFieldAttrs[] = [
  {
    tpl: "phone",
    prop: "your_phone",
    label: "你的电话",
    required: true,
    quickAttrs: { popover: "设置popover，增加字段说明弹出层" },
  },
  {
    tpl: "phone",
    prop: "mother_phone",
    label: "母亲电话",
    attrs: { showWordLimit: false },
    quickAttrs: { popover: "在attrs中设置{showWordLimit: false}，覆盖默认配置" },
  },
  { tpl: "password", prop: "psd", label: "密码", quickAttrs: { example: "zhangSan123456" } },
  { tpl: "age", prop: "age", label: "年龄" },
  { prop: "salary", label: "时薪", quickAttrs: { before: "每", after: "元" } },
  {
    tpl: "identity",
    prop: "identity",
    label: "身份证号",
    attrs: { placeholder: "请输入标准的16-18位身份证号码" },
    quickAttrs: { tips: "设置tips属性，可在字段底部增加注意事项说明" },
  },
];
</script>
<style lang="scss" scoped></style>
