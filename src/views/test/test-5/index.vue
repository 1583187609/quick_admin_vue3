<!-- 页面-数据统计 -->
<template>
  <div class="page">
    <div class="row">
      <BaseSection class="section f-1" title="通图图表 - 折线图">
        <ChartLine />
      </BaseSection>
    </div>
    <div class="row f-sb-s">
      <BaseSection class="section f-1" title="基础万能图 - Chart">
        <Chart />
      </BaseSection>
      <BaseSection class="section f-1" title="饼图 - ChartPie">
        <ChartPie />
      </BaseSection>
    </div>
    <div class="row f-sb-s">
      <BaseSection class="section f-1" title="自定义option - Chart">
        <Chart :option="customOption" />
      </BaseSection>
      <BaseSection class="section f-1" title="折线图 - ChartLine">
        <ChartLine />
      </BaseSection>
      <BaseSection class="section f-1" title="柱状图 - ChartBar（多维度）">
        <ChartBar />
      </BaseSection>
      <BaseSection class="section f-1" title="柱状图 - ChartBars（多个）">
        <ChartBars />
      </BaseSection>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { GetMockCommonList } from "@/api-mock";
import Chart from "@/core/components/chart/Chart.vue";
import ChartLine from "@/core/components/chart/ChartLine.vue";
import ChartBar from "@/core/components/chart/ChartBar.vue";
import ChartPie from "@/core/components/chart/ChartPie.vue";
import ChartBars from "@/core/components/chart/ChartBars.vue";
const tabs = [
  {
    label: "我的待办",
    value: 1,
    cols: [
      { prop: "follow", label: "关注" },
      { prop: "title", label: "标题" },
      { prop: "from_unit", label: "来文单位" },
      { prop: "accept_time", label: "接受时间" },
    ],
    api: GetMockCommonList,
  },
  {
    label: "我的待阅",
    value: 2,
    cols: [
      { prop: "follow", label: "关注1" },
      { prop: "title", label: "标题1" },
      { prop: "from_unit", label: "来文单位1" },
      { prop: "accept_time", label: "接受时间1" },
    ],
    api: GetMockCommonList,
  },
  {
    label: "我的已办",
    value: 3,
    cols: [
      { prop: "follow", label: "关注2" },
      { prop: "title", label: "标题2" },
      { prop: "from_unit", label: "来文单位2" },
      { prop: "accept_time", label: "接受时间2" },
    ],
    api: GetMockCommonList,
  },
  {
    label: "我发起的",
    value: 4,
    cols: [
      { prop: "follow", label: "关注3" },
      { prop: "title", label: "标题3" },
      { prop: "from_unit", label: "来文单位3" },
      { prop: "accept_time", label: "接受时间3" },
    ],
    api: GetMockCommonList,
  },
];
const customOption = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};
const activeName = ref(1);
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
}
.row {
  &:not(:last-child) {
    margin-bottom: $gap-half;
  }
  &:last-child {
    padding-bottom: $gap-half;
  }
}
.section {
  &:not(:last-child) {
    margin-right: $gap-half;
  }
}
</style>
