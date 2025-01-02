<!-- summary 全部控件类型
  全部控件类型包含：ElementPlus（input, select）、内置（BaseNumberRange）、自定义扩展（UserInfo）三部分。
-->
<template>
  <BaseForm v-model="modelData" :fields="fields" @submit="PostMockCommon">
    <template #zdy>
      <input placeholder="请输入（这是自定义的输入框）" style="width: 400px; border: 1px solid green; border-radius: 6px" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormFieldAttrs } from "@/core/components/form/_components/FieldItem";
import { useDict } from "@/hooks";
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";

const { getOpts } = useDict();
const genderOpts = getOpts("D_Gender");
const regionOpts = getOpts("C_Region");

const modelData = reactive<CommonObj>({
  age: 12,
  gender: 0,
});

const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true },
  { prop: "gender", label: "性别", type: "select", attrs: { options: genderOpts } },
  { prop: "age", label: "年龄", type: "input-number" },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 100, max: 250 } },
  { prop: "avatar", label: "头像", type: "BaseUpload" },
  {
    prop: "region",
    label: "省市区",
    type: "cascader",
    attrs: {
      options: regionOpts,
    },
  },
  {
    prop: "err",
    label: "分类",
    type: "cascader1",
    quickAttrs: {
      popover: "当类型错误时，会提示【不存在】文案，并标红",
    },
  },
  { prop: "zdy", label: "自定义", type: "slot", quickAttrs: { popover: `设置type: "custom"，即可自定义控件` } },
];
</script>
<style lang="scss" scoped></style>
