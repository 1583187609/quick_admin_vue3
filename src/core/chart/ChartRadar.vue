<template>
  <Chart class="chart-radar" :option="newOpt" ref="chartRef" />
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import Chart from "@/core/chart/Chart.vue";
import type { EchartTheme, ChartData } from "./_types";
import _ from "lodash";
import { CommonObj, StrNum } from "@/vite-env";
import echarts, { gradColors, titleCfg } from "./_config";

const { merge } = _;

const defaultOption = {
  title: {
    text: "雷达图示例",
    // ...titleCfg,
  },
  legend: {
    data: ["Allocated", "Spending"],
  },
  // radar: {
  //   // shape: 'circle',
  //   // 去掉max，不然会抛出警告：The ticks may be not readable when set min: 0, max: 7000 and alignTicks: true
  //   indicator: [
  //     { name: "维度1" }, // max: 7000
  //     { name: "维度2" }, // max: 7000
  //     { name: "维度3" }, // max: 7000
  //     { name: "维度4" }, // max: 7000
  //     { name: "维度5" }, // max: 7000
  //     { name: "维度6" }, // max: 7000
  //   ],
  // },
  // dataset: {
  //   source: [
  //     ["type", "维度1", "维度2", "维度3", "维度4", "维度5", "维度6"],
  //     ["Allocated", 1000, 2000, 3000, 4000, 5000, 6000],
  //     ["Spending", 6000, 5000, 4000, 3000, 2000, 1000],
  //   ],
  // },
  // series: [
  //   {
  //     type: "radar",
  //     // data: [
  //     //   {
  //     //     name: "Allocated",
  //     //     value: [1000, 2000, 3000, 4000, 5000, 6000],
  //     //   },
  //     //   {
  //     //     name: "Spending",
  //     //     value: [6000, 5000, 4000, 3000, 2000, 1000],
  //     //   },
  //     // ],
  //   },
  // ],
};
const props = withDefaults(
  defineProps<{
    theme?: EchartTheme;
    width?: StrNum;
    height?: StrNum;
    title?: string;
    data?: ChartData;
    option?: CommonObj;
  }>(),
  {
    data: () => [
      ["type", "维度1", "维度2", "维度3", "维度4", "维度5", "维度6"],
      ["Allocated", 1000, 2000, 3000, 4000, 5000, 6000],
      ["Spending", 6000, 5000, 4000, 3000, 2000, 1000],
    ],
    option: () => ({}),
  }
);
const chartRef = ref<any>(null);
const newOpt = computed(() => {
  const { option, data, title } = props;
  return merge(
    {},
    defaultOption,
    {
      ...(title && { title: { text: title, ...titleCfg } }),
      radar: {
        // shape: 'circle',
        // 去掉max，不然会抛出警告：The ticks may be not readable when set min: 0, max: 7000 and alignTicks: true
        indicator: data[0].slice(1).map(it => ({ name: it })),
      },
      dataset: {
        source: data,
      },
      series: [{ type: "radar" }],
    },
    option
  );
});
</script>
<style lang="scss" scoped></style>
