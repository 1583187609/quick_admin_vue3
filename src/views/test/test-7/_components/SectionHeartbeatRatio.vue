<!-- 组件-心动嘉宾比例配置 -->
<template>
  <SectionForm v-model="model" :sections="sections" style="width: 480px"> </SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { SectionFormItem } from "@/components/form";
import SectionForm from "@/components/form/SectionForm.vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
import { FormField } from "@/components/form";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const model = reactive<CommonObj>({
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
