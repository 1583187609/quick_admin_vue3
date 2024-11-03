<!-- summary 折线图（Line）
  只需传入一个简单的二维数组即可展示图表。
  传入log可查看渲染此图表的options。
-->
<template>
  <ChartLine :data="data" log="折线图" />
</template>
<script lang="ts" setup>
import ChartLine from "@/core/chart/ChartLine.vue";
const data = [
  ["product", "2015", "2016", "2017"],
  ["YY1", 43.3, 85.8, 93.7],
  ["YY2", 83.1, 73.4, 55.1],
  ["YY3", 86.4, 65.2, 82.5],
  ["YY4", 72.4, 53.9, 39.1],
];
</script>
<style lang="scss" scoped></style>
