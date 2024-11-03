<!-- summary 饼图（Pie）
  只需传入一个简单的一维数组即可展示图表。
  设置height改变高度。
-->
<template>
  <ChartPie :data="data" height="200" />
</template>
<script lang="ts" setup>
import ChartPie from "@/core/chart/ChartPie.vue";
const data = [
  ["XX1", 120],
  ["XX2", 149],
  ["XX3", 172],
];
</script>
<style lang="scss" scoped></style>
