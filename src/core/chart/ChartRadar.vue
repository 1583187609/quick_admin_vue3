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
import { nextTick } from "vue";

const { merge } = _;

const defaultOption = {
  title: {
    text: "雷达图示例",
  },
  legend: {
    data: ["Allocated", "Spending"],
  },
  radar: {
    // shape: 'circle',
    // 去掉max，不然会抛出警告：The ticks may be not readable when set min: 0, max: 7000 and alignTicks: true
    indicator: [
      { name: "维度1" }, // max: 7000
      { name: "维度2" }, // max: 7000
      { name: "维度3" }, // max: 7000
      { name: "维度4" }, // max: 7000
      { name: "维度5" }, // max: 7000
      { name: "维度6" }, // max: 7000
    ],
  },
  series: [
    {
      type: "radar",
      data: [
        {
          name: "Allocated",
          value: [1000, 2000, 3000, 4000, 5000, 6000],
        },
        {
          name: "Spending",
          value: [6000, 5000, 4000, 3000, 2000, 1000],
        },
      ],
    },
  ],
};

// const defaultOption = {
//   title: {
//     text: "雷达图示例",
//   },
//   legend: {
//     data: ["Spending", "Allocated"],
//   },
//   radar: {
//     // shape: 'circle',
//     indicator: [
//       { name: "维度1", max: 6000 },
//       { name: "维度2", max: 6000 },
//       { name: "维度3", max: 6000 },
//       { name: "维度4", max: 6000 },
//       { name: "维度5", max: 6000 },
//       { name: "维度6", max: 6000 },
//     ],
//   },
//   dataset: {
//     source: [
//       ["type", "维度1", "维度2", "维度3", "维度4", "维度5", "维度6"],
//       ["Spending", 1000, 2000, 3000, 4000, 5000, 6000],
//       ["Allocated", 6000, 5000, 4000, 3000, 2000, 1000],
//     ],
//   },
//   series: [{ type: "radar" }],
// };

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
      ["product", "2015", "2016", "2017"],
      ["示例1", 43.3, 85.8, 93.7],
      ["示例2", 83.1, 73.4, 55.1],
      ["示例3", 86.4, 65.2, 82.5],
      ["示例4", 72.4, 53.9, 39.1],
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
      dataset: {
        source: data,
      },
      // series: getSeries(),
    },
    option
  );
});
</script>
<style lang="scss" scoped></style>
