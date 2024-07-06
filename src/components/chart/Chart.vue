<template>
  <div class="chart" ref="echartRef" :style="{ height: toCssVal(height), width: toCssVal(width) }"></div>
</template>

<script lang="ts" setup>
// import * as echarts from "echarts";
import * as echarts from "echarts/core";
import { useEvent } from "@/hooks";
import { ref, reactive, watch, onMounted } from "vue";
import { gradColors } from "./_config";
import { toCssVal } from "@/components/_utils";
import type { EchartTheme } from "./_config/types";
import {
  PieChart,
  PieSeriesOption,
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
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
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { CommonObj } from "@/vite-env";
const colors = gradColors.map(item => item[0]);

// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
let echart: any = null;
const echartRef = ref<HTMLElement | null>(null);
const props = withDefaults(
  defineProps<{
    height?: string | number;
    width?: string | number;
    theme?: EchartTheme;
    option?: CommonObj;
  }>(),
  {
    height: "300px",
    width: "100%",
    theme: "macarons",
    option: () => {
      return {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
    },
  }
);
useEvent("resize", () => echart.resize());
watch(
  () => props.option,
  newVal => {
    echart.setOption(getNewOpt(newVal), true);
  },
  { deep: true }
);
onMounted(() => {
  echart = echarts.init(echartRef.value, props.theme); // 初始化 echart
  echart.setOption(getNewOpt(props.option), true); // 绘制
  // notMerge 可选。是否不跟之前设置的 option 进行合并。默认为 false。即表示合并。合并的规则，详见 组件合并模式。如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
  // setOption 见 https://echarts.apache.org/zh/api.html#echartsInstance.setOption
});
function getNewOpt(option: CommonObj) {
  return Object.assign({ color: colors }, option);
}
</script>
<style lang="scss" scoped>
.chart {
}
</style>
