<!-- 实时游客统计 -->
<template>
  <div class="real-time-tourist">
    <div class="actual-total f-fe-c">
      <div class="expect-total">可预约总量<i>999999</i>人</div>
      <div class="actual-total f-fe-c">
        <div v-for="(item, ind) in actualTotal.split('')" :key="ind" class="actual-item f-c-c">
          {{ item }}
        </div>
        <div class="actual-item f-c-c">人</div>
      </div>
    </div>
    <Chart :option="option" height="260px" :use="[PolarComponent]" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chart from "@/core/components/chart/Chart.vue";
import { PolarComponent } from "echarts/components";
import "echarts-liquidfill";

const actualTotal = ref("216908");
const option = {
  title: [
    {
      text: (0.5 * 100).toFixed(0) + "%",
      left: "49%",
      top: "35%",
      textAlign: "center",
      textStyle: {
        fontSize: "16",
        fontWeight: "normal",
        color: "#ffffff",
        align: "center",
        textBorderColor: "rgba(0, 0, 0, 0)",
        textShadowColor: "#000",
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 1,
      },
    },
    {
      text: "预约量",
      left: "49%",
      top: "25%",
      textAlign: "center",
      textStyle: {
        fontSize: "15",
        fontWeight: "normal",
        color: "#ffffff",
        align: "center",
        textBorderColor: "rgba(0, 0, 0, 0)",
        textShadowColor: "#000",
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 1,
      },
    },
  ],
  grid: {
    top: "0",
    left: "0px",
    right: "0px",
    bottom: "0",
    containLabel: true,
  },
  polar: {
    radius: ["75%", "85%"],
    center: ["50%", "50%"],
  },
  angleAxis: {
    max: 120,
    clockwise: false,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    startAngle: 188,
  },
  radiusAxis: {
    type: "category",
    show: true,
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      type: "liquidFill",
      radius: "70%",
      z: 2,
      center: ["50%", "50%"],
      data: [0.4, 0.4, 0.4],
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#35FAB6" },
            { offset: 1, color: "rgba(40, 209, 247,0.3)" },
          ],
          global: false,
        },
      },
      outline: {
        borderDistance: 0,
        itemStyle: {
          borderWidth: 2,
          borderColor: "#31d8d5",
          shadowBlur: 20,
          shadowColor: "#50c1a7",
        },
      },
      label: {
        show: false,
      },
      backgroundStyle: {
        borderWidth: 1,
        color: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            { offset: 0, color: "#0D2648" },
            { offset: 0.8, color: "#0D2648" },
            { offset: 1, color: "#228E7D" },
          ],
          global: false,
        },
      },
    },
    {
      type: "pie",
      radius: ["80%", "80%"],
      center: ["50%", "50%"],
      z: 1,
      label: { show: false },
      silent: true,
      itemStyle: {
        borderWidth: 2,
        borderType: [8, 10],
        borderDashOffset: 15,
        borderColor: "#31d8d5",
        color: "#11144e",
        borderCap: "round",
      },
      data: [100],
    },
    {
      type: "bar",
      data: [55],
      z: 10,
      coordinateSystem: "polar",
      roundCap: true,
      color: "#31d8d5",
    },
  ],
};
</script>

<style lang="scss" scoped>
.actual-total {
  position: relative;
  height: 50px;
  margin-top: 10px;
  margin-right: 4px;
  .actual-item {
    width: 52px;
    height: 50px;
    margin-right: 1px;
    font-family: MetroDF;
    font-size: 32px;
    color: #66ffff;
    background: url("../_assets/imgs/total.png") no-repeat;
    background-size: 100% 100%;
    &:last-child {
      margin-right: 0;
      font-size: 22px;
    }
  }
  .expect-total {
    position: absolute;
    top: -30px;
    right: 5px;
    font-size: 14px;
    color: #ffffff;
    i {
      font-style: normal;
      font-style: oblique;
      color: #ff8100;
    }
  }
}
</style>
