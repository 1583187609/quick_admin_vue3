<!-- 男女比例 -->
<template>
  <div class="gender-ratio">
    <div class="ratio-header f-sb-c">
      <div class="man f-c-c-c">
        <span>男士</span>
        <img src="../_assets/imgs/man.png" alt="" />
      </div>
      <div class="woman f-c-c-c">
        <span>女士</span>
        <img src="../_assets/imgs/woman.png" alt="" />
      </div>
    </div>
    <Chart :option="option" height="70px" />
  </div>
</template>

<script setup lang="ts">
import Chart from "@/core/components/chart/Chart.vue";

interface ChartProp {
  man: number;
  woman: number;
}

const data: ChartProp = {
  man: 0.6,
  woman: 0.4,
};

const option = {
  xAxis: {
    type: "value",
    show: false,
  },
  grid: {
    left: 0,
    top: "30px",
    bottom: 0,
    right: 0,
  },
  yAxis: [
    {
      type: "category",
      position: "left",
      data: ["男生"],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    {
      type: "category",
      position: "right",
      data: ["女士"],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        padding: [0, 0, 40, -60],
        fontSize: 12,
        lineHeight: 60,
        color: "rgba(255, 255, 255, 0.9)",
        formatter: "{value}" + data.woman * 100 + "%",
        rich: {
          a: {
            color: "transparent",
            lineHeight: 30,
            fontFamily: "digital",
            fontSize: 12,
          },
        },
      },
    },
  ],
  series: [
    {
      type: "bar",
      barWidth: 20,
      data: [data.man],
      z: 20,
      itemStyle: {
        borderRadius: 10,
        color: "#007AFE",
      },
      label: {
        show: true,
        color: "#E7E8ED",
        position: "insideLeft",
        offset: [0, -20],
        fontSize: 12,
        formatter: () => {
          return `男士 ${data.man * 100}%`;
        },
      },
    },
    {
      type: "bar",
      barWidth: 20,
      data: [1],
      barGap: "-100%",
      itemStyle: {
        borderRadius: 10,
        color: "#FF4B7A",
      },
      label: {
        show: true,
        color: "#E7E8ED",
        position: "insideRight",
        offset: [0, -20],
        fontSize: 12,
        formatter: () => {
          return `女士 ${data.woman * 100}%`;
        },
      },
    },
  ],
};
</script>
<style lang="scss" scoped>
.gender-ratio {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 40px 65px;
  .ratio-header {
    width: 100%;
    height: 115px;
    .man,
    .woman {
      width: 110px;
      height: 115px;
      background: url("../_assets/imgs/man-bg.png") no-repeat 0 0/100% 100%;
      img {
        width: 60px;
        height: 60px;
        margin-top: 20px;
      }
      span {
        margin-top: 2px;
        font-size: 13px;
        color: #ffffff;
      }
    }
    .woman {
      background: url("../_assets/imgs/woman-bg.png") no-repeat;
    }
  }
}
</style>
