<!-- 页面-数据统计 -->
<template>
  <div class="page">
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
        <Chart :option="customOption"></Chart>
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
<script lang="ts" name="TestFive" setup>
import { ref, reactive } from "vue";
import { PostAuthRoleList } from "@/api-mock";
import Chart from "@/components/chart/Chart.vue";
import ChartLine from "@/components/chart/ChartLine.vue";
import ChartBar from "@/components/chart/ChartBar.vue";
import ChartPie from "@/components/chart/ChartPie.vue";
import ChartBars from "@/components/chart/ChartBars.vue";
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
    api: PostAuthRoleList,
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
    api: PostAuthRoleList,
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
    api: PostAuthRoleList,
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
    api: PostAuthRoleList,
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
