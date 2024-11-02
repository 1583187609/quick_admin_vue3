import * as echarts from "echarts/core";
import {
  PieChart,
  PieSeriesOption,
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  // 其他
  ScatterChart,
  RadarChart,
  GaugeChart,
} from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  // 其他
  PolarComponent,
  ToolboxComponent,
  DataZoomComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { typeOf } from "../_utils";

// 渐变色调色盘
export const gradColors = [
  ["#2EB7F5", "#B8F2FF"],
  ["#FFAA00", "#FFE867"],
  ["#F95741", "#fdb498"],
  ["#5087EC", "#5087EC"],
  ["#68BBC4", "#68BBC4"],
  ["#58A55C", "#58A55C"],
  ["#F2BD42", "#F2BD42"],
  ["#EE752F", "#EE752F"],
  ["#D95040", "#D95040"],
  ["#9940D9", "#9940D9"],
];

// 单色调色盘
export const colors = gradColors.map(item => item[0]);

//坐标轴样式
export const axisCfg = {
  axisTick: {
    show: false,
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: "#eee",
    },
  },
  axisLabel: {
    color: "#999",
    fontSize: 12,
  },
  nameTextStyle: {
    color: "#999",
    // align: 'right'
  },
};

//标题样式
export const titleCfg = {
  // text: "XXX标题",
  top: 0,
  left: "center",
  // textStyle: {
  color: "#666",
  fontSize: 16,
  // },
};

// 注册必须的组件
echarts.use([
  // 基础
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  // 常用
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  // 常用图表
  PieChart,
  BarChart,
  LineChart,
  RadarChart,
  // 不常用图表
  // PolarComponent,
  // 其他
  // ToolboxComponent,
  // DataZoomComponent,
  // ScatterChart,
  // GaugeChart,
]);
export default echarts;

// const baseComps = [GridComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer];
// const commonComps = [LegendComponent, TitleComponent, TooltipComponent];
// const compsMap = {
//   pie: [...baseComps, ...commonComps, PieChart],
//   bar: [...baseComps, ...commonComps, BarChart],
//   line: [...baseComps, ...commonComps, LineChart],
//   radar: [...baseComps, ...commonComps, RadarChart],
//   all: [
//     // 基础
//     GridComponent,
//     DatasetComponent,
//     TransformComponent,
//     LabelLayout,
//     UniversalTransition,
//     CanvasRenderer,
//     // 常用
//     LegendComponent,
//     TitleComponent,
//     TooltipComponent,
//     // 常用图表
//     PieChart,
//     BarChart,
//     LineChart,
//     RadarChart,
//     PolarComponent,
//     // 其他
//     // ToolboxComponent,
//     // DataZoomComponent,
//     // ScatterChart,
//     // GaugeChart,
//   ],
// };

// type EchartsType = "bar" | "line" | "pie" | "radar" | "all";
// type EchartsComponents = any[];
// export function getEcharts(comp: EchartsType | EchartsComponents = "all") {
//   // let useComps: EchartsComponents = [];
//   // const t = typeOf(comp);
//   // if (t === "String") {
//   //   const uses = compsMap[comp as EchartsType];
//   //   if (!uses) throw new Error(`不存在此类型：${comp}`);
//   //   useComps = uses;
//   // } else if (t === "Array") {
//   //   useComps = comp as EchartsComponents;
//   // } else {
//   //   throw new Error(`暂未处理此类型参数：${t}`);
//   // }
//   // echarts.use(useComps);
//   // return echarts;
//   // 注册必须的组件
//   echarts.use([
//     // 基础
//     GridComponent,
//     DatasetComponent,
//     TransformComponent,
//     LabelLayout,
//     UniversalTransition,
//     CanvasRenderer,
//     // 常用
//     LegendComponent,
//     TitleComponent,
//     TooltipComponent,
//     // 常用图表
//     PieChart,
//     BarChart,
//     LineChart,
//     RadarChart,
//     PolarComponent,
//     // 其他
//     // ToolboxComponent,
//     // DataZoomComponent,
//     // ScatterChart,
//     // GaugeChart,
//   ]);
//   return echarts;
// }
