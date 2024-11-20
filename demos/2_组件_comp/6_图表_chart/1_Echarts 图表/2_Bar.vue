<!-- summary 柱状图（Bar）
  只需传入一个简单的二维数组即可展示图表。
  传入option可覆盖默认配置
-->
<template>
  <ChartBar :data="data" :option="overlayOption" />
</template>
<script lang="ts" setup>
import ChartBar from "@/core/components/chart/ChartBar.vue";
const overlayOption = {
  barWidth: 32,
};
const data = [
  ["product", "2015", "2016", "2017"],
  ["示例1", 43.3, 85.8, 93.7],
  ["示例2", 83.1, 73.4, 55.1],
  ["示例3", 86.4, 65.2, 82.5],
  ["示例4", 72.4, 53.9, 39.1],
];
</script>
<style lang="scss" scoped></style>
