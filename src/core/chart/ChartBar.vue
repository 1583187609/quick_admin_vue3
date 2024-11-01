<template>
  <Chart class="chart-bar" :option="newOpt" :height="height" :width="width" :theme="theme" />
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import Chart from "@/core/chart/Chart.vue";
import { typeOf } from "@/core/_utils";
import type { EchartTheme, ChartData } from "./_types";
import _ from "lodash";
import { CommonObj } from "@/vite-env";
import echarts, { axisCfg, gradColors, titleCfg } from "./_config";

const { merge } = _;
const defaultOption = {
  // title: {},
  legend: {},
  barWidth: 16,
  barGap: "50%",
  tooltip: {
    trigger: "item",
  },
  //类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: "category", ...axisCfg },
  //数值轴（value）。
  yAxis: {
    type: "value",
    // name: unit, //纵轴单位
    ...axisCfg,
  },
  grid: { left: 0, top: 30, right: 0, bottom: 0, containLabel: true },
  // dataset: {
  //   // dimensions: ["product", "2015", "2016", "2017"],
  //   source: [["Matcha Latte", 43.3, 85.8, 93.7],["Milk Tea", 83.1, 73.4, 55.1]], // 提供一份数据。
  // },
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  // series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};
const props = withDefaults(
  defineProps<{
    theme?: EchartTheme;
    height?: string | number;
    width?: string | number;
    title?: string;
    unit?: string;
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
      // ["product", "2015"],
      // ["Matcha Latte", 43.3],
      // ["Milk Tea", 83.1],
      // ["Cheese Cocoa", 86.4],
      // ["Walnut Brownie", 72.4],
    ],
    option: () => ({}),
  }
);
const newOpt = computed(() => {
  const { option, data, title, unit } = props;
  return merge(
    {},
    defaultOption,
    {
      ...(title && { title: { text: title, ...titleCfg } }),
      ...(unit && { yAxis: { name: unit } }),
      dataset: {
        source: data,
      },
      series: getSeries(),
    },
    option
  );
});
/**
 * 获取series
 */
function getSeries() {
  const { data, option } = props;
  const barWidth = option.barWidth || defaultOption.barWidth;
  return (
    data[0]?.slice(1)?.map((item: any, ind: number) => {
      return {
        type: "bar",
        itemStyle: {
          borderRadius: [barWidth / 2, barWidth / 2, 0, 0],
          color: getItemColor(ind),
        },
        label: {
          show: true,
          position: "top",
          color: "#666",
          fontSize: 14,
        },
      };
    }) || []
  );
}

/**
 * 获取series 的itemStyle的color值
 * @param ind {number} 数组下标值
 * @param isMulti {boolean} 是否是多维度
 */
function getItemColor(ind: number, isMulti?: boolean) {
  const { data } = props;
  isMulti = typeOf(isMulti) === "Undefined" ? data[0].length > 2 : isMulti;
  /** 多维度多色，同一维度同一种颜色 */
  if (isMulti) {
    //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: gradColors[ind][0],
      },
      {
        offset: 1,
        color: gradColors[ind][1],
      },
    ]);
  } else {
    /** 单维度多色可用，同一维度不同颜色 */
    return (params: CommonObj) => {
      const i = params.dataIndex;
      //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
      return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: gradColors[i][0],
        },
        {
          offset: 1,
          color: gradColors[i][1],
        },
      ]);
    };
  }
}
</script>
<style lang="scss" scoped></style>
