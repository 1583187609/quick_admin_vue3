<!-- summary 基础用法 
 设置 modelValue，显示初始值
 设置 min，最小值
 设置 max，最大值
 设置 size，控件大小类型 
 设置 precision，保留n位小数
-->
<template>
  <BaseNumberRange v-model="modelVals1" />
  <br />
  <BaseNumberRange v-model="modelVals2" :min="0" :max="100" />
  <br />
  <BaseNumberRange v-model="modelVals3" :min="0" :max="100" />
  <br />
  <BaseNumberRange v-model="modelVals4" :precision="2" :min="0" :max="100" />
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { StrNum } from "@/core/_types";
const modelVals1 = reactive<[StrNum?, StrNum?]>([]);
const modelVals2 = reactive<[StrNum?, StrNum?]>([1, 2]);
const modelVals3 = reactive<[StrNum?, StrNum?]>([-10, 1001]);
const modelVals4 = reactive<[StrNum?, StrNum?]>([-100, 100]);
</script>
<style lang="scss" scoped></style>
