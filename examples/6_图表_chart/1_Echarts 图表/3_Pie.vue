<!-- summary
@title 饼图（Pie）
@description 只需传入一个简单的一维数组即可展示图表
-->
<template>
  <ChartPie :data="data" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import ChartPie from "@/components/chart/ChartPie.vue";
const data = [
  ["XX1", 120],
  ["XX2", 149],
  ["XX3", 172],
];
</script>
<style lang="scss" name="" scoped></style>
