<!-- summary 单例多图
  在一个dom元素中，渲染多个图表。
  layout设置行x列。
-->
<template>
  <div>
    <el-form-item label="选择布局类型">
      <el-radio-group v-model="layoutType">
        <el-radio-button v-bind="opt" v-for="(opt, ind) in layoutOpts" :key="ind" />
      </el-radio-group>
    </el-form-item>
  </div>
  <MultiCharts :data="data" :layout="layoutType" log="单例多图" />
</template>
<script lang="ts" setup>
import MultiCharts from "@/core/components/chart/MultiCharts.vue";
import { OptionItem } from "@/core/_types";

const layoutOpts: OptionItem[] = [
  { label: "4x3", value: "4x3" },
  { label: "3x4", value: "3x4" },
  { label: "6x2", value: "6x2" },
  { label: "2x6", value: "2x6" },
];

const layoutType = ref<number>("4x3");

const data = [
  {
    type: "line",
    title: "折线图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 4, 30],
      ["2019-01-02", 110, 21, 5, 30],
      ["2019-01-03", 120, 22, 6, 30],
      ["2019-01-04", 140, 23, 7, 30],
      ["2019-01-05", 150, 24, 8, 30],
      ["2019-01-06", 160, 25, 9, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "金额($)" },
    series: { smooth: true },
  },
  {
    type: "line",
    title: "折线图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 44, 30],
      ["2019-01-02", 110, 21, 55, 30],
      ["2019-01-03", 120, 22, 66, 30],
      ["2019-01-04", 140, 23, 72, 30],
      ["2019-01-05", 150, 24, 180, 30],
      ["2019-01-06", 160, 25, 92, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "%" },
    series: { smooth: true },
  },
  {
    type: "line",
    title: "折线图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 4, 30],
      ["2019-01-02", 110, 21, 5, 30],
      ["2019-01-03", 120, 22, 6, 30],
      ["2019-01-04", 140, 23, 7, 30],
      ["2019-01-05", 150, 24, 8, 30],
      ["2019-01-06", 160, 25, 9, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "金额($)" },
    series: { smooth: true },
  },
  {
    type: "bar",
    title: "柱状图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 44, 30],
      ["2019-01-02", 110, 21, 55, 30],
      ["2019-01-03", 120, 22, 66, 30],
      ["2019-01-04", 140, 23, 72, 30],
      ["2019-01-05", 150, 24, 180, 30],
      ["2019-01-06", 160, 25, 92, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "数量" },
    series: {
      barWidth: 5,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
  },
  {
    type: "bar",
    title: "柱状图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 44, 30],
      ["2019-01-02", 110, 21, 55, 30],
      ["2019-01-03", 120, 22, 66, 30],
      ["2019-01-04", 140, 23, 72, 30],
      ["2019-01-05", 150, 24, 180, 30],
      ["2019-01-06", 160, 25, 92, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "数量" },
    series: {
      barWidth: 5,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
  },
  {
    type: "bar",
    title: "柱状图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 44, 30],
      ["2019-01-02", 110, 21, 55, 30],
      ["2019-01-03", 120, 22, 66, 30],
      ["2019-01-04", 140, 23, 72, 30],
      ["2019-01-05", 150, 24, 180, 30],
      ["2019-01-06", 160, 25, 92, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "数量" },
    series: {
      barWidth: 5,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
  },
  {
    type: "pie",
    title: "饼状图",
    dataset: [
      ["type", "销售额"],
      ["销售额", 100],
      ["订单量", 110],
      ["客单价", 120],
      ["动销率", 150],
    ],
    xAxis: { show: false },
    yAxis: { show: false },
    series: [{ radius: 70 }, { radius: [45, 70] }],
  },
  {
    type: "pie",
    title: "饼状图",
    dataset: [
      ["type", "销售额"],
      ["销售额", 100],
      ["订单量", 110],
      ["客单价", 120],
      ["动销率", 150],
    ],
    xAxis: { show: false },
    yAxis: { show: false },
    series: [{ radius: 70 }, { radius: [45, 70] }],
  },
  {
    type: "pie",
    title: "饼状图",
    dataset: [
      ["type", "销售额"],
      ["销售额", 100],
      ["订单量", 110],
      ["客单价", 120],
      ["动销率", 150],
    ],
    xAxis: { show: false },
    yAxis: { show: false },
    series: [{ radius: 70 }, { radius: [45, 70] }],
  },
  {
    type: "line",
    title: "折线图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 44, 30],
      ["2019-01-02", 110, 21, 55, 30],
      ["2019-01-03", 120, 22, 66, 30],
      ["2019-01-04", 140, 23, 72, 30],
      ["2019-01-05", 150, 24, 180, 30],
      ["2019-01-06", 160, 25, 92, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "%" },
    series: { smooth: true },
  },
  {
    type: "bar",
    title: "柱状图",
    dataset: [
      ["type", "销售额", "订单量", "客单价", "动销率"],
      ["2019-01-01", 100, 20, 44, 30],
      ["2019-01-02", 110, 21, 55, 30],
      ["2019-01-03", 120, 22, 66, 30],
      ["2019-01-04", 140, 23, 72, 30],
      ["2019-01-05", 150, 24, 180, 30],
      ["2019-01-06", 160, 25, 92, 30],
    ],
    xAxis: { name: "日期" },
    yAxis: { name: "数量" },
    series: {
      barWidth: 10,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
  },
  {
    type: "pie",
    title: "饼状图",
    dataset: [
      ["type", "销售额"],
      ["销售额", 100],
      ["订单量", 110],
      ["客单价", 120],
      ["动销率", 150],
    ],
    xAxis: { show: false },
    yAxis: { show: false },
    series: [{ radius: 70 }, { radius: [45, 70] }],
  },
];
</script>
<style lang="scss" scoped></style>
