<!-- summary 快捷属性
  扩展的快捷属性，放置在 quickAttrs 中。例：pureText、grid、example、tips、popover、before、after
-->
<template>
  <BaseForm v-model="modelData" :fields="fields" :fetch="PostMockCommon"></BaseForm>
</template>
<script lang="ts" setup>
import { PostMockCommon } from "@/api-mock";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { reactive } from "vue";

const modelData = reactive<CommonObj>({ name: "张三" });
const fields: FormFieldAttrs[] = [
  {
    prop: "name",
    label: "姓名",
    required: true,
    quickAttrs: {
      pureText: true,
    },
  },
  {
    prop: "gender",
    label: "性别",
    type: "select",
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "age",
    label: "年龄",
    quickAttrs: {
      grid: 12,
      before: "岁",
    },
  },
  {
    prop: "day",
    label: "天数",
    type: "input-number",
    attrs: { min: 0, max: 100 },
    quickAttrs: {
      before: "第",
      after: "天",
    },
  },
  {
    tpl: "T_Password",
    quickAttrs: {
      example: "admin123456",
    },
  },
  {
    prop: "json",
    label: "配置JSON",
    attrs: {
      type: "textarea",
    },
    quickAttrs: {
      tips: "请输入规范的JSON（例：[{tpl: 'T_Phone'}, {tpl: 'T_Password'}]）或换行输入并用逗号隔开（例：phone, password）",
    },
  },
  {
    prop: "legal_name",
    label: "法人姓名",
    quickAttrs: {
      popover:
        "‌法人是具有民事权利能力和民事行为能力，依法独立享有民事权利和承担民事义务的组织‌。法人是社会组织在法律上的人格化，能够作为民事主体参与民事法律关系",
    },
  },
];
</script>
<style lang="scss" scoped></style>
