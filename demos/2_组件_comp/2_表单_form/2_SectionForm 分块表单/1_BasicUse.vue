<!-- summary
  @title 基础用法
  @description 这是分块表单基础用法的介绍内容，待完善。
 -->
<template>
  <SectionForm v-model="model" :sections="sections" :fetch="PostMockCommon"></SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import SectionForm from "@/components/form/SectionForm.vue";
import { SectionFormItem } from "@/components/form";
import { PostMockCommon } from "@/api-mock";

const model = reactive<CommonObj>({});
const sections: SectionFormItem[] = [
  {
    title: "第一部分",
    fields: [
      { prop: "name", label: "姓名", extraAttrs: { grid: 12 } },
      { prop: "gender", label: "性别", extraAttrs: { grid: 12 } },
    ],
  },
  {
    title: "第二部分",
    fields: [
      { prop: "cellphone", label: "电话", extraAttrs: { grid: 12 } },
      { prop: "password", label: "密码", extraAttrs: { grid: 12 } },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
