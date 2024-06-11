<!-- 页面-简介 -->
<template>
  <Chart :option="options" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import Chart from "./Chart.vue";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const options = {
  title: [
    // 指定各个表格的标题
    { text: "销售额", top: "5%", left: "30%" },
    { text: "订单量", top: "5%", left: "75%" },
    { text: "客单价", left: "30%", top: "50%" },
    { text: "动销率", left: "75%", top: "50%" },
  ],
  dataset: {
    // 指定数据源
    source: [["type", "销售额", "订单量", "客单价", "动销率"]].concat([
      ["2019-01-01", 100.0, 20, 4, 30],
      ["2019-01-02", 110.0, 21, 5, 30],
      ["2019-01-03", 120.0, 22, 6, 30],
      ["2019-01-04", 140.0, 23, 7, 30],
      ["2019-01-05", 150.0, 24, 8, 30],
      ["2019-01-06", 160.0, 25, 9, 30],
    ]),
  },
  grid: [
    // 用来调整，各个表格的位置
    { top: "10%", bottom: "55%", width: "40%" },
    { top: "10%", bottom: "55%", left: "55%", width: "40%" },
    { top: "55%", width: "40%" },
    { top: "55%", left: "55%", width: "40%" },
  ],
  tooltip: {},
  legend: {},
  xAxis: [
    // 用来配置横坐标的信息，gridIndex是标识针对的那个表格
    { type: "category", gridIndex: 0, name: "日期", axisTick: { alignWithLabel: true } },
    { type: "category", gridIndex: 1, name: "日期", axisTick: { alignWithLabel: true } },
    { type: "category", gridIndex: 2, name: "日期", axisTick: { alignWithLabel: true } },
    { type: "category", gridIndex: 3, name: "日期", axisTick: { alignWithLabel: true } },
  ],
  yAxis: [
    { type: "value", gridIndex: 0, name: "金额($)" },
    { type: "value", gridIndex: 1, name: "数量" },
    { type: "value", gridIndex: 2, name: "金额($)" },
    { type: "value", gridIndex: 3, name: "%" },
  ],
  series: [
    // 配置数据关系
    // stack用来做分组标记，同标记的数据，会在同一个表格显示
    // seriesLayoutBy 设置如何从dateset里面获取数据，这里按照列获取
    { type: "line", stack: "1", xAxisIndex: 0, yAxisIndex: 0, seriesLayoutBy: "column" },
    { type: "bar", stack: "2", xAxisIndex: 1, yAxisIndex: 1, seriesLayoutBy: "column" },
    { type: "bar", stack: "3", xAxisIndex: 2, yAxisIndex: 2, seriesLayoutBy: "column" },
    {
      type: "line",
      stack: "4",
      xAxisIndex: 3,
      yAxisIndex: 3,
      seriesLayoutBy: "column",
      label: {
        show: true,
        position: "top",
        formatter(params) {
          return params.value[4] + "%";
        },
      },
    },
  ],
};
</script>
<style lang="scss" name="" scoped></style>
