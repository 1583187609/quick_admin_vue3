<!-- summary 雷达图（Radar）
  只需传入一个简单的一维数组即可展示图表。
-->
<template>
  <ChartRadar :data="data" />
</template>
<script lang="ts" setup>
import ChartRadar from "@/core/chart/ChartRadar.vue";
const data = [
  ["type", "攻击", "防御", "经济", "参团", "拆塔", "人头比"],
  ["张三", 10, 20, 30, 40, 50, 60],
  ["李四", 60, 50, 40, 30, 20, 10],
];
</script>
<style lang="scss" scoped></style>
