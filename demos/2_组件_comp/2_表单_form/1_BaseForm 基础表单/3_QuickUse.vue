<!-- summary 快速开发
  下面介绍了如何控制字段的显示与隐藏，实现快速开发页面。
 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" :fetch="PostMockCommon">
    <template #zdy>
      <input placeholder="请输入（这是自定义的输入框）" style="width: 400px; border: 1px solid green; border-radius: 6px" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { reactive, computed } from "vue";
import { FormField, FormFieldAttrs } from "@/components/form/_components/FieldItem";
import { PostMockCommon } from "@/api-mock";
import { CommonObj, OptionItem } from "@/vite-env";

const typeOpts: OptionItem[] = [
  { label: "简短", value: 0 },
  { label: "一般", value: 1 },
  { label: "详细", value: 2 },
];
const modelData = reactive<CommonObj>({
  type: 0,
  age: 12,
  gender: 0,
});

const fields = computed<FormField[]>(() => {
  const { type } = modelData;
  return [
    { prop: "type", label: "类型", type: "select", options: typeOpts },
    { prop: "name", label: "姓名", required: true },
    { prop: "gender", label: "性别", type: "select", options: "Gender" },
    type !== 0 && { prop: "age", label: "年龄", type: "input-number" },
    ...(type === 2
      ? [
          { prop: "height", label: "身高", type: "slider", attrs: { min: 100, max: 250 } },
          { prop: "avatar", label: "头像", type: "BaseUpload" },
          { prop: "region", label: "省市区", type: "cascader", options: "Region" },
        ]
      : []),
  ];
});
</script>
<style lang="scss" scoped></style>
