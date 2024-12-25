<!-- summary 基础用法
  这是步骤表单基础用法的介绍内容，待完善。
 -->
<template>
  <StepForm v-model="modelData" :sections="sections" :fetch="PostMockCommon"></StepForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CommonObj } from "@/core/_types";
import StepForm from "@/core/components/form/StepForm.vue";
import { SectionFormItem } from "@/core/components/form/_types";
import { PostMockCommon } from "@/api-mock";

const modelData = reactive<CommonObj>({});
const sections: SectionFormItem[] = [
  {
    title: "第一部分",
    fields: [
      { prop: "name", label: "姓名", quickAttrs: { grid: 12 } },
      { prop: "gender", label: "性别", quickAttrs: { grid: 12 } },
    ],
  },
  {
    title: "第二部分",
    fields: [
      { prop: "cellphone", label: "电话", quickAttrs: { grid: 12 } },
      { prop: "password", label: "密码", quickAttrs: { grid: 12 } },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
