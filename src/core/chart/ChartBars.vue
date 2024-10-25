<template>
  <Chart class="chart-bars" :option="newOpt" :height="height" :width="width" :theme="theme"></Chart>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { reactive, computed } from "vue";
import Chart from "@/core/chart/Chart.vue";
import { axisCfg, gradColors, titleCfg } from "./_config";
import type { EchartTheme, ChartData } from "./_types";
import _ from "lodash";
import { CommonObj } from "@/vite-env";

const { merge } = _;
const defaultOption = {
  // title: titles,
  tooltip: {
    trigger: "item",
  },
  barWidth: 12,
  barGap: "50%",
  grid: [
    { left: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
    { right: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
  ],
  // xAxis,
  // yAxis,
  // dataset: datasets,
  // series,
};

const props = withDefaults(
  defineProps<{
    theme?: EchartTheme;
    height?: string | number;
    width?: string | number;
    titles?: string[];
    units?: string[];
    datas?: ChartData[];
    option?: CommonObj;
  }>(),
  {
    titles: () => [],
    units: () => [],
    datas: () => [
      [
        ["name", "国内", "国外"],
        ["示例1", 30, 22],
        ["示例2", 14, 42],
        ["示例3", 18, 23],
        // ["name", "国内"],
        // ["建筑工程", 30],
        // ["能源化工", 14],
        // ["交通运输", 18],
      ],
      [
        ["name", "国内", "国外"],
        ["示例1", 23, 62],
        ["示例2", 65, 88],
        ["示例3", 66, 48],
        // ["name", "国内"],
        // ["建筑工程", 23],
        // ["能源化工", 65],
        // ["交通运输", 66],
      ],
    ],
    option: () => ({}),
  }
);
const newOpt = computed(() => {
  const { datasets, newTitles, series, xAxis, yAxis } = getCfgArgs();
  const { option } = props;
  return merge(
    {},
    defaultOption,
    {
      title: newTitles,
      // tooltip: {
      //   trigger: "item",
      // },
      // barWidth: 12,
      // barGap: "50%",
      grid: [
        { left: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
        { right: 0, width: "47%", bottom: 30, top: 40, containLabel: true },
      ],
      xAxis,
      yAxis,
      dataset: datasets,
      series,
    },
    option
  );
});
function getTotal(arr: any[]) {
  let total = 0;
  arr.forEach(itemArr => {
    for (let i = 1; i < itemArr.length; i++) {
      total += Number(itemArr[i]);
    }
  });
  return total;
}
/**
 * 获取配置参数
 */
function getCfgArgs() {
  const [datasets, newTitles, series, xAxis, yAxis]: any = [[], [], [], [], []];
  const { option, titles, units, datas } = props;
  datas.forEach((data, index) => {
    const title = titles[index] || "XXX标题";
    const unit = units[index] || "元";
    newTitles.push({
      gridIndex: index,
      left: index == 0 ? "25%" : "75%",
      bottom: 0,
      textAlign: "center",
      text: `{label|${title}}  {amount|${getTotal(data.slice(1))}${unit}}`,
      textStyle: {
        rich: {
          label: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#666",
          },
          amount: {
            color: "#333",
            fontSize: 15,
            fontWeight: "bold",
          },
        },
      },
    });
    xAxis.push({
      type: "category",
      gridIndex: index,
      ...axisCfg,
    });
    yAxis.push({
      type: "value",
      gridIndex: index,
      name: unit,
      ...axisCfg,
    });
    datasets.push({ source: data });
    const dimensions = data[0];
    for (let i = 0; i < dimensions.length - 1; i++) {
      series.push({
        type: "bar",
        xAxisIndex: index,
        yAxisIndex: index,
        datasetIndex: index,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              offset: 0,
              color: gradColors[i][0],
            },
            {
              offset: 1,
              color: gradColors[i][1],
            },
          ]),
          borderRadius: [6, 6, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          color: "#666",
          fontSize: 14,
        },
      });
    }
  });
  return {
    datasets,
    newTitles,
    series,
    xAxis,
    yAxis,
  };
}
/**
 * 获取series 的itemStyle的color值
 * @param ind {number} 数组下标值
 * @param isMulti {boolean} 是否是多维度
 */
// function getItemColor(ind: number, isMulti?: boolean) {
//   isMulti = typeOf(isMulti) === "Undefined" ? dimensions.length > 2 : isMulti;
//   /** 多维度多色，同一维度同一种颜色 */
//   if (isMulti) {
//     //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
//     return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//       {
//         offset: 0,
//         color: gradColors[ind][0],
//       },
//       {
//         offset: 1,
//         color: gradColors[ind][1],
//       },
//     ]);
//   } else {
//     /** 单维度多色可用，同一维度不同颜色 */
//     return (params: CommonObj) => {
//       const i = params.dataIndex;
//       //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
//       return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//         {
//           offset: 0,
//           color: gradColors[i][0],
//         },
//         {
//           offset: 1,
//           color: gradColors[i][1],
//         },
//       ]);
//     };
//   }
// }
</script>
<style lang="scss" scoped></style>
./types .
