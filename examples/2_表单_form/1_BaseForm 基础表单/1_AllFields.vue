<!-- summary
  @title 全部控件类型
  @description 全部控件类型包含：ElementPlus（input, select）、内置（BaseNumberRange）、自定义扩展（UserInfo）三部分。
 -->
<template>
  <BaseForm v-mode="model" :fields="fields" :fetch="PostMockCommon">
    <template #zdy>
      <input placeholder="请输入（这是自定义的输入框）" style="width: 400px; border: 1px solid green; border-radius: 6px" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormFieldAttrs } from "@/components/form/_components/FieldItem";
import { useDictMap } from "@/hooks";
import { PostMockCommon } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";

const { getCascaderOpts, getOpts } = useDictMap();
const genderOpts = getOpts("Gender");
const regionOpts = getCascaderOpts("Region");

const model = reactive<CommonObj>({
  age: 12,
  gender: 0,
});

const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true },
  { prop: "gender", label: "性别", type: "select", options: genderOpts },
  { prop: "age", label: "年龄", type: "input-number" },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 100, max: 250 } },
  { prop: "avatar", label: "头像", type: "BaseUpload" },
  { prop: "region", label: "省市区", type: "cascader", options: regionOpts },
  {
    prop: "err",
    label: "分类",
    type: "cascader1",
    extraAttrs: {
      popover: "当类型错误时，会提示【不存在】文案，并标红",
    },
  },
  { prop: "zdy", label: "自定义", type: "custom", extraAttrs: { popover: `设置type: "custom"，即可自定义控件` } },
];
</script>
<style lang="scss" scoped></style>
