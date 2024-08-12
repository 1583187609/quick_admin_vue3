<!-- summary 柱状图（Bar）
  只需传入一个简单的二维数组即可展示图表
-->
<template>
  <ChartBar :data="data" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import ChartBar from "@/components/chart/ChartBar.vue";
const data = [
  ["product", "2015", "2016", "2017"],
  ["示例1", 43.3, 85.8, 93.7],
  ["示例2", 83.1, 73.4, 55.1],
  ["示例3", 86.4, 65.2, 82.5],
  ["示例4", 72.4, 53.9, 39.1],
];
</script>
<style lang="scss" scoped></style>
