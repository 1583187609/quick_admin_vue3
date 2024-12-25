<!-- summary 层级规则
  顶层元素SectionForm的属性可依次被SectionItem、FormFieldItem覆盖
 -->
<template>
  <SectionForm v-model="modelData" :sections="sections" :fetch="PostMockCommon"></SectionForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CommonObj } from "@/core/_types";
import SectionForm from "@/core/components/form/SectionForm.vue";
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
