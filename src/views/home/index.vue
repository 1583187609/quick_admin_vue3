<!-- 首页 -->
<template>
  <div class="page">
    <Setting />
    <div class="row f-sb-s">
      <BaseSection class="section f-2" title="待办事项" badge="10">
        <el-tabs v-model="activeName" @tabClick="(tab:any)=>activeName=tab.paneName" type="border-card">
          <el-tab-pane :label="item.label" :name="item.value" v-for="(item, ind) in tabs" :key="ind">
            <BaseCrud
              :cols="item.cols"
              :fetch="item.api"
              :tableAttrs="{ size: 'small', maxHeight: 200 }"
              :pageAttrs="{
                small: true,
                pageSizes: [5, 10, 15, 20, 25],
              }"
              :pagination="{ currPage: 1, pageSize: 5 }"
              v-if="activeName === item.value"
            />
          </el-tab-pane>
        </el-tabs>
      </BaseSection>
      <BaseSection class="section f-1" title="消息通知" badge="120">
        <ul class="notices all-hide-scroll" v-if="20">
          <li class="item f-sb-c" v-for="(item, ind) in 20" :key="ind">
            <div class="f-1">
              <span class="line-1">这是第{{ ind + 1 }}条消息</span>
            </div>
            <time class="time f-0 ml-half">2023-06-19</time>
          </li>
        </ul>
      </BaseSection>
    </div>
    <div class="row">
      <BaseSection class="section f-1" title="通图图表 - 折线图">
        <ChartLine :data="chartData.tttb" />
      </BaseSection>
    </div>
    <div class="row f-sb-s">
      <BaseSection class="section f-1" title="基础万能图 - Chart(带默认配置)">
        <Chart />
      </BaseSection>
      <BaseSection class="section f-1" title="饼图 - ChartPie">
        <ChartPie :data="chartData.bt" />
      </BaseSection>
      <BaseSection class="section f-1" title="雷达图 - ChartRadar（后续完善）">
        <ChartRadar />
      </BaseSection>
    </div>
    <div class="row f-sb-s">
      <BaseSection class="section f-1" title="自定义option - Chart">
        <Chart :option="chartData.zdyopt"></Chart>
      </BaseSection>
      <BaseSection class="section f-1" title="折线图 - ChartLine">
        <ChartLine :data="chartData.zxt" />
      </BaseSection>
      <BaseSection class="section f-1" title="柱状图 - ChartBar（多维度）">
        <ChartBar :data="chartData.zztdwd" />
      </BaseSection>
      <BaseSection class="section f-1" title="柱状图 - ChartBars（多个）">
        <ChartBars :datas="chartData.zztdg" />
      </BaseSection>
    </div>
    <BaseSection class="section row f-1" title="单例多图 - MultiCharts（后续完善）">
      <MultiCharts height="500px" />
    </BaseSection>
  </div>
</template>
<script lang="ts" name="WorkbenchStatistics" setup>
import { ref, reactive } from "vue";
import { GetMockCommonList } from "@/api-mock";
import Chart from "@/components/chart/Chart.vue";
import ChartLine from "@/components/chart/ChartLine.vue";
import ChartBar from "@/components/chart/ChartBar.vue";
import ChartPie from "@/components/chart/ChartPie.vue";
import ChartRadar from "@/components/chart/ChartRadar.vue";
import ChartBars from "@/components/chart/ChartBars.vue";
import MultiCharts from "@/components/chart/MultiCharts.vue";
import Setting from "./_components/Setting.vue";
import { CommonObj } from "@/vite-env";

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
const mockChartData = {
  //通图图表
  tttb: [
    ["product", "2015", "2016", "2017"],
    ["XX1", 43.3, 85.8, 93.7],
    ["XX2", 83.1, 73.4, 55.1],
    ["XX3", 86.4, 65.2, 82.5],
    ["XX4", 72.4, 53.9, 39.1],
  ],
  //基础万能图
  jcwnt: [],
  //饼图
  bt: [
    ["XX1", 120],
    ["XX2", 149],
    ["XX3", 172],
  ],
  //自定义option
  zdyopt: customOption,
  //折线图
  zxt: [
    ["product", "2015", "2016", "2017"],
    ["YY1", 43.3, 85.8, 93.7],
    ["YY2", 83.1, 73.4, 55.1],
    ["YY3", 86.4, 65.2, 82.5],
    ["YY4", 72.4, 53.9, 39.1],
  ],
  //柱状图（多维度）
  zztdwd: [
    ["product", "2015", "2016", "2017"],
    ["示例1", 43.3, 85.8, 93.7],
    ["示例2", 83.1, 73.4, 55.1],
    ["示例3", 86.4, 65.2, 82.5],
    ["示例4", 72.4, 53.9, 39.1],
  ],
  //柱状图（多个）
  zztdg: [
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
};
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
const activeName = ref(1);
const chartData = reactive<CommonObj>({
  tttb: [],
  jcwnt: [],
  bt: [],
  zdyopt: [],
  zxt: [],
  zztdwd: [],
  zztdg: [],
});
function init() {
  //模拟请求
  setTimeout(() => {
    Object.assign(chartData, mockChartData);
  }, 100);
}
init();
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
  margin-bottom: 0 !important;
  &:not(:last-child) {
    margin-right: $gap-half;
  }
}
.notices {
  max-height: 300px;
  overflow: auto;
  .item {
    padding: $gap-half 0;
    border-bottom: $border-light;
    .time {
      color: $color-text-light;
      font-size: $font-size-light;
    }
  }
}
</style>
