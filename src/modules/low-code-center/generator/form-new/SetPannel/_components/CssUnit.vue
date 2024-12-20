<!-- 页面-简介 -->
<template>
  <el-select v-model="modelVal" style="width: 6em">
    <el-option v-for="(opt, ind) in unitOpts" v-bind="opt" :key="ind"></el-option>
  </el-select>
</template>
<script lang="ts" setup>
import { CommonObj, OptionItem, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "px",
  }
);
const $emit = defineEmits(["update:modelValue"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: string) => $emit("update:modelValue", val),
});
const unitOpts: OptionItem[] = [
  { label: "px", value: "px" },
  { label: "em", value: "em" },
  { label: "rem", value: "rem" },
  { label: "vmax", value: "vmax" },
  { label: "vmin", value: "vmin" },
];
</script>
<style lang="scss" scoped></style>
