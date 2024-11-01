<!-- 页面-简介 -->
<template>
  <Chart :option="getOptionsSingle()" ref="chartRef" />
</template>
<script lang="ts" setup>
import Chart from "./Chart.vue";
import { ref, onMounted, nextTick } from "vue";
import { CommonObj } from "@/vite-env";
import { axisCfg } from "./_config";
import { typeOf } from "../_utils";

const otherOptions = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    y: "96%",
  },
};

const tempSimpleData = [
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
    grid: {},
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
    grid: {},
    xAxis: { name: "日期" },
    yAxis: { name: "%" },
    series: { smooth: true },
  },
  // {
  //   type: "bar",
  //   title: "柱状图",
  //   dataset: [
  //     ["type", "销售额", "订单量", "客单价", "动销率"],
  //     ["2019-01-01", 100, 20, 44, 30],
  //     ["2019-01-02", 110, 21, 55, 30],
  //     ["2019-01-03", 120, 22, 66, 30],
  //     ["2019-01-04", 140, 23, 72, 30],
  //     ["2019-01-05", 150, 24, 180, 30],
  //     ["2019-01-06", 160, 25, 92, 30],
  //   ],
  //   grid: {},
  //   xAxis: { name: "日期" },
  //   yAxis: { name: "数量" },
  //   series: {
  //     barWidth: 16,
  //     itemStyle: {
  //       borderRadius: [8, 8, 0, 0],
  //     },
  //   },
  // },
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
    grid: {},
    xAxis: { name: "日期" },
    yAxis: { name: "数量" },
    series: {
      barWidth: 16,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
  },
  // {
  //   type: "pie",
  //   title: "饼状图",
  //   dataset: [
  //     ["type", "销售额"],
  //     ["销售额", 100],
  //     ["订单量", 110],
  //     ["客单价", 120],
  //     ["动销率", 150],
  //   ],
  //   grid: {},
  //   xAxis: { show: false },
  //   yAxis: { show: false },
  //   series: [{ radius: 70 }, { radius: [45, 70] }],
  // },
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
    grid: {},
    xAxis: { show: false },
    yAxis: { show: false },
    series: [{ radius: 70 }, { radius: [45, 70] }],
  },
];

type PositionType = "title" | "grid";
function getTop(currInd, [rows, cols], gap = 0, type: PositionType = "title") {
  const r = Math.floor(currInd / cols);
  const c = Math.floor(currInd % cols);
  const num = (100 / rows) * r + gap;
  return `${num}%`;
}
function getLeft(currInd, [rows, cols], gap = 0, type: PositionType = "title") {
  const r = Math.floor(currInd / cols);
  const c = Math.floor(currInd % cols);
  let num = (100 / cols) * c + gap;
  if (type === "title") num += 100 / cols / 2;
  return `${num}%`;
}
function getOptionsSingle(data = tempSimpleData, opts = otherOptions) {
  const options = { ...opts };
  const [rows, cols] = props.layout.split("x").map(it => Number(it)); // 2行2列
  data.forEach((item, gInd) => {
    const { type, ...restItem } = item;
    const keys = Object.keys(restItem);
    const isXYAxis = ["line", "bar"].includes(type); // 是否是坐标轴
    keys.forEach((key: string) => {
      let val = item[key];
      if (key === "title") {
        val = { text: val, top: getTop(gInd, [rows, cols]), left: getLeft(gInd, [rows, cols]) };
      } else if (key === "dataset") {
        val = { source: val };
      } else if (key === "grid") {
        val = {
          top: getTop(gInd, [rows, cols], 10, "grid"),
          left: getLeft(gInd, [rows, cols], 4, "grid"),
          height: "30%", // 50 - 10*2
          width: "42%", // 50 - 4*2
        };
      } else if (key === "xAxis") {
        const lineAttrs = isXYAxis ? { type: "category", ...axisCfg, axisTick: { alignWithLabel: true } } : {};
        val = { ...lineAttrs, gridIndex: gInd, ...val };
      } else if (key === "yAxis") {
        const lineAttrs = isXYAxis ? { type: "value", ...axisCfg } : {};
        val = { ...lineAttrs, gridIndex: gInd, ...val };
      } else if (key === "series") {
        const t = typeOf(val);
        const lineAttrs = isXYAxis ? { xAxisIndex: gInd, yAxisIndex: gInd } : {};
        const attrs = { type, ...lineAttrs, datasetIndex: gInd };
        const numArr = Array(rows * cols).fill("");
        if (t === "Array") {
          if (type === "pie") {
            const num = val.length;
            const r = Math.floor(gInd / cols);
            const c = Math.floor(gInd % cols);
            const ox = (100 / cols) * c;
            const oy = (100 / rows) * r;
            val = val.map((item: any, ind: number) => {
              const x = (100 / cols / num / 2) * (ind * num + 1) + ox;
              const y = 100 / rows / 2 + oy;
              const center = [`${x}%`, `${y}%`];
              return { ...attrs, center, ...item };
            });
          } else {
            val = val.map(it => ({ ...attrs, ...it }));
          }
        } else if (t === "Object") {
          val = numArr.map(it => ({ ...attrs, ...val }));
        } else if (t === "Undefined") {
          val = numArr.map(it => attrs);
        } else {
          throw new Error(`暂未处理此种类型：${t}`);
        }
      }
      const isSeries = key === "series";
      if (!options[key]) {
        options[key] = isSeries ? [...val] : [val];
      } else {
        isSeries ? options[key].push(...val) : options[key].push(val);
      }
    });
  });
  return options;
}

const props = withDefaults(
  defineProps<{
    data?: CommonObj[];
    layout?: string;
  }>(),
  {
    data: () => [],
    layout: "2x2",
  }
);
const chartRef = ref<any>(null);
onMounted(() => {
  nextTick(() => {
    console.log(chartRef.value.getOptions(), "getOpts-ref---------");
  });
});
// const options = {
//   legend: {
//     y: "96%",
//   },
//   tooltip: {
//     trigger: "axis",
//   },
//   // 指定各个表格的标题
//   title: [
//     { text: "折线图", top: "0%", left: "25%" },
//     { text: "柱状图", top: "0%", left: "75%" },
//     { text: "饼状图", top: "50%", left: "25%" },
//     { text: "折线图", top: "50%", left: "75%" },
//   ],
//   // 指定数据源
//   dataset: [
//     {
//       source: [
//         ["type", "销售额", "订单量", "客单价", "动销率"],
//         ["2019-01-01", 100, 20, 4, 30],
//         ["2019-01-02", 110, 21, 5, 30],
//         ["2019-01-03", 120, 22, 6, 30],
//         ["2019-01-04", 140, 23, 7, 30],
//         ["2019-01-05", 150, 24, 8, 30],
//         ["2019-01-06", 160, 25, 9, 30],
//       ],
//     },
//     {
//       source: [
//         ["type", "销售额", "订单量", "客单价", "动销率"],
//         ["2019-01-01", 100, 20, 44, 30],
//         ["2019-01-02", 110, 21, 55, 30],
//         ["2019-01-03", 120, 22, 66, 30],
//         ["2019-01-04", 140, 23, 72, 30],
//         ["2019-01-05", 150, 24, 180, 30],
//         ["2019-01-06", 160, 25, 92, 30],
//       ],
//     },
//     {
//       source: [
//         ["type", "销售额"],
//         ["销售额", 100],
//         ["订单量", 110],
//         ["客单价", 120],
//         ["动销率", 150],
//       ],
//     },
//     {
//       source: [
//         ["type", "销售额", "订单量", "客单价", "动销率"],
//         ["2019-01-01", 100, 20, 44, 30],
//         ["2019-01-02", 110, 21, 55, 30],
//         ["2019-01-03", 120, 22, 66, 30],
//         ["2019-01-04", 140, 23, 72, 30],
//         ["2019-01-05", 150, 24, 180, 30],
//         ["2019-01-06", 160, 25, 92, 30],
//       ],
//     },
//   ],
//   grid: [
//     // 用来调整，各个表格的位置
//     { top: "10%", left: "2%", height: "32%", width: "45%" },
//     { top: "10%", left: "55%", height: "32%", width: "45%" },
//     { top: "58%", left: "2%", height: "32%", width: "45%" },
//     { top: "58%", left: "55%", height: "32%", width: "45%" },
//   ],
//   xAxis: [
//     // 用来配置横坐标的信息，gridIndex是标识针对的那个表格
//     { type: "category", gridIndex: 0, name: "日期", ...axisCfg, axisTick: { alignWithLabel: true } },
//     { type: "category", gridIndex: 1, name: "日期", ...axisCfg, axisTick: { alignWithLabel: true } },
//     { show: false, gridIndex: 2 },
//     { type: "category", gridIndex: 3, name: "日期", ...axisCfg, axisTick: { alignWithLabel: true } },
//   ],
//   yAxis: [
//     { type: "value", gridIndex: 0, name: "金额($)", ...axisCfg },
//     { type: "value", gridIndex: 1, name: "数量", ...axisCfg },
//     { show: false, gridIndex: 2 },
//     { type: "value", gridIndex: 3, name: "%", ...axisCfg },
//   ],
//   series: [
//     { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
//     { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
//     { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
//     { type: "line", smooth: true, xAxisIndex: 0, yAxisIndex: 0, datasetIndex: 0 },
//     {
//       type: "bar",
//       barWidth: 16,
//       xAxisIndex: 1,
//       yAxisIndex: 1,
//       datasetIndex: 1,
//       itemStyle: {
//         borderRadius: [8, 8, 0, 0],
//       },
//     },
//     {
//       type: "bar",
//       barWidth: 16,
//       xAxisIndex: 1,
//       yAxisIndex: 1,
//       datasetIndex: 1,
//       itemStyle: {
//         borderRadius: [8, 8, 0, 0],
//       },
//     },
//     {
//       type: "bar",
//       barWidth: 16,
//       xAxisIndex: 1,
//       yAxisIndex: 1,
//       datasetIndex: 1,
//       itemStyle: {
//         borderRadius: [8, 8, 0, 0],
//       },
//     },
//     {
//       type: "bar",
//       barWidth: 16,
//       xAxisIndex: 1,
//       yAxisIndex: 1,
//       datasetIndex: 1,
//       itemStyle: {
//         borderRadius: [8, 8, 0, 0],
//       },
//     },
//     { type: "pie", radius: 70, center: ["12.5%", "75%"], datasetIndex: 2 },
//     { type: "pie", radius: [45, 70], center: ["37.5%", "75%"], datasetIndex: 2 },
//     {
//       type: "line",
//       smooth: true,
//       xAxisIndex: 3,
//       yAxisIndex: 3,
//       datasetIndex: 3,
//     },
//     {
//       type: "line",
//       smooth: true,
//       xAxisIndex: 3,
//       yAxisIndex: 3,
//       datasetIndex: 3,
//     },
//     {
//       type: "line",
//       smooth: true,
//       xAxisIndex: 3,
//       yAxisIndex: 3,
//       datasetIndex: 3,
//     },
//     {
//       type: "line",
//       smooth: true,
//       xAxisIndex: 3,
//       yAxisIndex: 3,
//       datasetIndex: 3,
//     },
//   ],
// };
</script>
<style lang="scss" scoped></style>
.
