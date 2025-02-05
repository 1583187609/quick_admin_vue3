<!-- summary 基础用法 
 提供选择数字区间的表单控件
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
<style lang="scss" scoped>
.base-number-range {
  margin: $gap-half;
}
</style>
