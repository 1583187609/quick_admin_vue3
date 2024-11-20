<!-- 页面-简介 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" :fetch="PostMockCommon" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { PostMockCommon } from "@/api-mock";

const modelData = reactive({ nl: [-1, 2], sl: [13, 4] });
const fields: FormFieldAttrs[] = [
  { prop: "nl", label: "年龄", type: "BaseNumberRange", attrs: { min: 0, max: 10 }, required: true, quickAttrs: { grid: 8 } },
  { prop: "sl", label: "数量", type: "BaseNumberRange", attrs: { min: 0, max: 100 }, quickAttrs: { grid: 8 } },
];
</script>
<style lang="scss" scoped></style>
