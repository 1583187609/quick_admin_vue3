<!-- 页面-简介 -->
<template>
  <Chart :option="options" height="500px" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import Chart from "./Chart.vue";
import { axisCfg, gradColors, titleCfg } from "./_config";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const options = {
  // 指定各个表格的标题
  title: [
    { text: "折线图", top: "0%", left: "25%" },
    { text: "柱状图", top: "0%", left: "75%" },
    { text: "饼状图", top: "50%", left: "25%" },
    { text: "折线图", top: "50%", left: "75%" },
  ],
  // 指定数据源
  dataset: [
    {
      dimensions: ["type", "销售额", "订单量", "客单价", "动销率"],
      source: [
        ["2019-01-01", 100, 20, 4, 30],
        ["2019-01-02", 110, 21, 5, 30],
        ["2019-01-03", 120, 22, 6, 30],
        ["2019-01-04", 140, 23, 7, 30],
        ["2019-01-05", 150, 24, 8, 30],
        ["2019-01-06", 160, 25, 9, 30],
      ],
    },
    {
      dimensions: ["type", "销售额", "订单量", "客单价", "动销率"],
      source: [
        ["2019-01-01", 100, 20, 44, 30],
        ["2019-01-02", 110, 21, 55, 30],
        ["2019-01-03", 120, 22, 66, 30],
        ["2019-01-04", 140, 23, 72, 30],
        ["2019-01-05", 150, 24, 180, 30],
        ["2019-01-06", 160, 25, 92, 30],
      ],
    },
    {
      dimensions: ["type", "销售额"],
      source: [
        ["销售额", 100],
        ["订单量", 110],
        ["客单价", 120],
        ["动销率", 150],
      ],
    },
    {
      dimensions: ["type", "销售额", "订单量", "客单价", "动销率"],
      source: [
        ["2019-01-01", 100, 20, 44, 30],
        ["2019-01-02", 110, 21, 55, 30],
        ["2019-01-03", 120, 22, 66, 30],
        ["2019-01-04", 140, 23, 72, 30],
        ["2019-01-05", 150, 24, 180, 30],
        ["2019-01-06", 160, 25, 92, 30],
      ],
    },
  ],
  grid: [
    // 用来调整，各个表格的位置
    { top: "10%", left: "2%", height: "32%", width: "45%" },
    { top: "10%", left: "55%", height: "32%", width: "45%" },
    { top: "58%", left: "2%", height: "32%", width: "45%" },
    { top: "58%", left: "55%", height: "32%", width: "45%" },
  ],
  tooltip: [
    {
      trigger: "axis",
    },
    {
      trigger: "axis",
    },
    {},
    {
      trigger: "axis",
    },
  ],
  legend: {
    y: "96%",
  },
  xAxis: [
    // 用来配置横坐标的信息，gridIndex是标识针对的那个表格
    { type: "category", gridIndex: 0, name: "日期", ...axisCfg, axisTick: { alignWithLabel: true } },
    { type: "category", gridIndex: 1, name: "日期", ...axisCfg, axisTick: { alignWithLabel: true } },
    { type: "category", gridIndex: 2, name: "日期", ...axisCfg, axisTick: { alignWithLabel: true } },
    { type: "category", gridIndex: 3, name: "日期", ...axisCfg, axisTick: { alignWithLabel: true } },
  ],
  yAxis: [
    { type: "value", gridIndex: 0, name: "金额($)", ...axisCfg },
    { type: "value", gridIndex: 1, name: "数量", ...axisCfg },
    { type: "value", gridIndex: 2, name: "金额($)", ...axisCfg },
    { type: "value", gridIndex: 3, name: "%", ...axisCfg },
  ],
  series: [
    // 配置数据关系
    // stack用来做分组标记，同标记的数据，会在同一个表格显示
    // seriesLayoutBy 设置如何从dateset里面获取数据，这里按照列获取
    { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
    { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
    { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
    { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    { type: "pie", radius: 55, center: ["12.5%", "72%"], datasetIndex: 2 },
    { type: "pie", hollow: true, radius: [32, 55], center: ["37.5%", "72%"], datasetIndex: 2 },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
  ],
};
</script>
<style lang="scss" name="" scoped></style>
