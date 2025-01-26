<!-- Echarts示例 -->
<template>
  <div>
    <BaseSection :gap="false" class="row f-1" title="通图图表 - 折线图">
      <ChartLine />
    </BaseSection>
    <div class="row f-sb-s">
      <BaseSection :gap="false" class="f-1" title="基础万能图 - Chart">
        <Chart />
      </BaseSection>
      <BaseSection :gap="false" class="f-1" title="饼图 - ChartPie">
        <ChartPie />
      </BaseSection>
    </div>
    <div class="row f-sb-s">
      <BaseSection :gap="false" class="f-1" title="自定义option - Chart">
        <Chart :option="customOption" />
      </BaseSection>
      <BaseSection :gap="false" class="f-1" title="折线图 - ChartLine">
        <ChartLine />
      </BaseSection>
      <BaseSection :gap="false" class="f-1" title="柱状图 - ChartBar（多维度）">
        <ChartBar />
      </BaseSection>
      <BaseSection :gap="false" class="f-1" title="柱状图 - ChartBars（多个）">
        <ChartBars />
      </BaseSection>
    </div>
    <BaseSection :gap="false" class="row f-1" title="单例多图 - MultiCharts（后续完善）">
      <MultiCharts :data="multChartsData" layout="4x3" log="单例多图" />
    </BaseSection>
  </div>
</template>
<script lang="ts" setup>
import Chart from "@/core/components/chart/Chart.vue";
import ChartLine from "@/core/components/chart/ChartLine.vue";
import ChartBar from "@/core/components/chart/ChartBar.vue";
import ChartPie from "@/core/components/chart/ChartPie.vue";
import ChartBars from "@/core/components/chart/ChartBars.vue";
import MultiCharts from "@/core/components/chart/MultiCharts.vue";

const customOption = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};
// 单例多图
const multChartsData = [
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
<style lang="scss" scoped>
.row {
  &:not(:last-child) {
    margin-bottom: $gap-half;
  }
  &:last-child {
    padding-bottom: $gap-half;
  }
  .base-section {
    &:not(:last-child) {
      margin-right: $gap-half;
    }
  }
}
</style>
