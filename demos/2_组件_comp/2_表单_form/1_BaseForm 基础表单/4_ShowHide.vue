<!-- summary 字段显示与隐藏
  单个或多个字段的隐藏方式
 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" :fetch="PostMockCommon" />
</template>
<script lang="ts" setup>
import { reactive, computed } from "vue";
import { PostMockCommon } from "@/api-mock";
import { CommonObj, OptionItem } from "@/core/_types";
import { FormField } from "@/core/components/form/_types";

const typeOpts: OptionItem[] = [
  { label: "简单", value: 0 },
  { label: "一般", value: 1 },
  { label: "详细", value: 2 },
];
const modelData = reactive<CommonObj>({ type: 0 });

const fields = computed<FormField[]>(() => {
  const { type } = modelData;
  return [
    {
      prop: "type",
      label: "类型",
      type: "radio-group",
      attrs: {
        options: typeOpts,
      },
    },
    { prop: "name", label: "姓名", required: true },
    {
      prop: "gender",
      label: "性别",
      type: "select",
      attrs: {
        options: "D_Gender",
      },
    },
    type !== 0 && { prop: "age", label: "年龄", type: "input-number" }, // 控制单个字段显示与隐藏
    // 控制多个字段显示与隐藏
    ...(type === 2
      ? [
          { prop: "height", label: "身高", type: "slider", attrs: { min: 100, max: 250 } },
          { prop: "avatar", label: "头像", type: "BaseUpload" },
          {
            prop: "region",
            label: "省市区",
            type: "cascader",
            attrs: {
              options: "C_Region",
            },
          },
        ]
      : []),
  ];
});
</script>
<style lang="scss" scoped></style>
