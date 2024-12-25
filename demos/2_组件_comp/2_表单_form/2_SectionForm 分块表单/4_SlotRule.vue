<!-- summary 插槽规则
  section部分有prop属性时，插槽名称，反之插槽名称
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
        quickAttrs: {
          grid: 12,
        },
      },
      {
        prop: "weight",
        label: "体重",
        quickAttrs: {
          grid: 12,
        },
      },
      {
        prop: "age",
        label: "年龄",
        quickAttrs: {
          grid: 12,
        },
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
