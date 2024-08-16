<template>
  <Chart class="chart-line" :option="newOpt" :height="height" :width="width" :theme="theme"></Chart>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { computed } from "vue";
import Chart from "@/components/chart/Chart.vue";
import { axisCfg, gradColors, titleCfg } from "./_config";
import _ from "lodash";
import type { ChartData, EchartTheme } from "./_config/types";
import { CommonObj } from "@/vite-env";

const { merge } = _;
const defaultOption = {
  // title: {},
  legend: {},
  tooltip: {
    trigger: "axis",
  },
  //类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: "category", ...axisCfg },
  //数值轴（value）。
  yAxis: {
    type: "value",
    // name: unit, //纵轴单位
    ...axisCfg,
  },
  grid: { left: 0, top: 40, right: 0, bottom: 0, containLabel: true },
  // dataset: {
  //   // dimensions: ["product", "2015", "2016", "2017"],
  //   source: [["Matcha Latte", 43.3, 85.8, 93.7],["Milk Tea", 83.1, 73.4, 55.1]], // 提供一份数据。
  // },
  // 声明多个 line 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  // series: [{ type: "line" }, { type: "line" }, { type: "line" }],
};
const props = withDefaults(
  defineProps<{
    theme?: EchartTheme;
    height?: string | number;
    width?: string | number;
    title?: string;
    unit?: string;
    data?: ChartData;
    smooth?: boolean; //折线是否平滑
    symbolSize?: number; //折线连接点的大小
    option?: CommonObj;
  }>(),
  {
    symbolSize: 6,
    smooth: false,
    data: () => [
      ["product", "2015", "2016", "2017"],
      ["示例1", 43.3, 85.8, 93.7],
      ["示例2", 83.1, 73.4, 55.1],
      ["示例3", 86.4, 65.2, 82.5],
      ["示例4", 72.4, 53.9, 39.1],
      //   ["product", "2015"],
      //   ["Matcha Latte", 43.3],
      //   ["Milk Tea", 83.1],
      //   ["Cheese Cocoa", 86.4],
      //   ["Walnut Brownie", 72.4],
    ],
    option: () => ({}),
  }
);
const newOpt = computed(() => {
  const { data, option, unit, title, symbolSize, smooth } = props;
  const dimensions = data[0] || ["product"];
  const series =
    dimensions?.slice(1)?.map((item: any, ind: number) => {
      return {
        type: "line",
        symbolSize,
        smooth,
        lineStyle: {
          color: getItemColor(ind),
        },
        itemStyle: {
          color: getItemColor(ind),
        },
      };
    }) || [];
  return merge(
    {},
    defaultOption,
    {
      ...(title && { title: { text: title, ...titleCfg } }),
      ...(unit && { yAxis: { name: unit } }),
      dataset: {
        source: data,
      },
      series,
    },
    option
  );
});
/**
 * 获取series 的itemStyle的color值
 * @param ind {number} 数组下标值
 */
function getItemColor(ind: number) {
  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: gradColors[ind][0],
    },
    {
      offset: 1,
      color: gradColors[ind][0],
    },
  ]);
}
</script>
<style lang="scss" scoped></style>
