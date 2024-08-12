<!-- summary 传参规则
  这是分块表单传参规则的介绍内容，待完善。
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
    prop: "part_1",
    title: "第一部分",
    fields: [
      { prop: "name", label: "姓名" },
      { prop: "gender", label: "性别" },
    ],
  },
  {
    prop: "part_2",
    title: "第二部分",
    fields: [
      { prop: "cellphone", label: "电话" },
      { prop: "password", label: "密码" },
    ],
  },
  {
    prop: "part_3",
    title: "第三部分",
    fields: [
      {
        prop: "height",
        label: "身高",
        extraAttrs: {
          grid: 12,
        },
      },
      {
        prop: "weight",
        label: "体重",
        extraAttrs: {
          grid: 12,
        },
      },
      {
        prop: "age",
        label: "年龄",
        extraAttrs: {
          grid: 12,
        },
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
