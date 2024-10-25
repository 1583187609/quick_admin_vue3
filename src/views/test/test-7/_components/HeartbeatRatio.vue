<!-- 组件-心动嘉宾比例配置 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" style="width: 480px"> </BaseForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CommonObj, OptionItem } from "@/vite-env";
import { FormField } from "@/core/form/_types";
const userOpts: OptionItem[] = [
  { label: "喜欢我的", value: 1 },
  { label: "优质嘉宾", value: 2 },
  { label: "新用户", value: 3 },
  { label: "普通用户", value: 4 },
];
const modelData = reactive<CommonObj>({
  xyh: [{ jblx: undefined, zb: undefined }],
  yzjb: [{ jblx: undefined, zb: undefined }],
  ptyh: [{ jblx: undefined, zb: undefined }],
});
const childrenFields: FormField[] = [
  { prop: "jblx", label: "嘉宾类型", type: "select", options: userOpts, required: false },
  { prop: "zb", label: "占比", type: "input-number" },
];
const fields: FormField[] = [
  {
    prop: "xyh",
    label: "新用户",
    type: "addDel",
    children: childrenFields,
  },
  {
    prop: "yzjb",
    label: "优质嘉宾",
    type: "addDel",
    children: childrenFields,
  },
  {
    prop: "ptyh",
    label: "普通用户",
    type: "addDel",
    children: childrenFields,
  },
];
</script>
<style lang="scss" scoped></style>
