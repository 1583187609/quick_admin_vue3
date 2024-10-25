<!-- 组件-心动嘉宾比例配置 -->
<template>
  <SectionForm v-model="modelData" :sections="sections" style="width: 480px"> </SectionForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { SectionFormItem } from "@/core/form/_types";
import SectionForm from "@/core/form/SectionForm.vue";
import { CommonObj } from "@/vite-env";
import { FormField } from "@/core/form/_types";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const modelData = reactive<CommonObj>({
  xyh: [{ jblx: undefined, zb: undefined }],
  yzjb: [{ jblx: undefined, zb: undefined }],
  ptyh: [{ jblx: undefined, zb: undefined }],
});
const childrenFields: FormField[] = [
  { prop: "jblx", label: "嘉宾类型", type: "select" },
  { prop: "zb", label: "占比", type: "input-number" },
];
const sections: SectionFormItem[] = [
  {
    // prop: "xyh",
    title: "新用户",
    fields: [{ prop: "xyh", label: "新用户", type: "addDel", children: childrenFields }],
  },
  {
    // prop: "yzjb",
    title: "优质嘉宾",
    fields: [{ prop: "yzjb", label: "优质嘉宾", type: "addDel", children: childrenFields }],
  },
  {
    // prop: "ptyh",
    title: "普通用户",
    fields: [{ prop: "ptyh", label: "普通用户", type: "addDel", children: childrenFields }],
  },
];
</script>
<style lang="scss" scoped></style>
