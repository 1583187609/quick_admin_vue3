<template>
  <div class="chart" ref="chartRef" :style="{ height: toCssVal(height), width: toCssVal(width) }"></div>
</template>

<script lang="ts" setup>
import { useEvent } from "@/hooks";
import { ref, nextTick, watch, onMounted } from "vue";
import echarts, { colors } from "./_config";
import { toCssVal } from "@/components/_utils";
import type { EchartTheme } from "./_types";
import { CommonObj } from "@/vite-env";

let echartInstance: any = null;
const chartRef = ref<HTMLElement | null>(null);
const props = withDefaults(
  defineProps<{
    height?: string | number;
    width?: string | number;
    theme?: EchartTheme;
    option?: CommonObj;
    renderer?: "canvas" | "svg";
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
useEvent("resize", () => echartInstance.resize(), false, 200);
watch(
  () => props.option,
  newVal => drawChart(newVal),
  { deep: true }
);
onMounted(() => {
  nextTick(() => {
    // 初始化 echartInstance 实例
    const { theme, option, renderer } = props;
    echartInstance = echarts.init(chartRef.value, theme, { renderer });
    drawChart(option);
  });
});
function drawChart(option: CommonObj) {
  // notMerge 可选。是否不跟之前设置的 option 进行合并。默认为 false。即表示合并。合并的规则，详见 组件合并模式。如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
  // setOption 见 https://echarts.apache.org/zh/api.html#echartsInstance.setOption
  echartInstance.setOption(Object.assign({ color: colors }, option), true);
}
</script>
<style lang="scss" scoped></style>
