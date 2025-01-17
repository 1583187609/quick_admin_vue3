<!-- 简约工作台 -->
<template>
  <div class="p-h">
    <section class="row section info f-sb-c">
      <div class="mr-a f-fs-s">
        <BaseAvatar size="5em" round />
        <div class="f-c-fs-c ml-o">
          <div class="welcome">早安，Soybean, 今天又是充满活力的一天!</div>
          <div class="weather">今日多云转晴，20℃ - 25℃!</div>
        </div>
      </div>
      <ul class="ul f-fs-c">
        <li class="li f-c-c-c">
          <span class="key">项目数</span>
          <span class="val">25</span>
        </li>
        <li class="li f-c-c-c">
          <span class="key">待办</span>
          <span class="val">4/16</span>
        </li>
        <li class="li f-c-c-c">
          <span class="key">消息</span>
          <span class="val">12</span>
        </li>
      </ul>
    </section>
    <div class="row f-sb-s pannels">
      <div
        class="item f-1"
        v-for="(item, ind) in pannels"
        :key="ind"
        :style="{ background: `linear-gradient(to right bottom, ${item.bgColors[0]}, ${item.bgColors[1]}` }"
      >
        <div class="title">{{ item.title }}</div>
        <div class="f-sb-c data">
          <BaseIcon :name="item.icon" class="mr-a" />
          <span class="mr-q" v-if="item.unit">{{ item.unit }}</span>
          <BaseNumber :value="item.value" />
        </div>
      </div>
    </div>
    <div class="row f-sb-s charts">
      <BaseSection title="折线图" class="mr-o f-1">
        <ChartLine />
      </BaseSection>
      <BaseSection title="饼图" class="f-1">
        <ChartPie />
      </BaseSection>
    </div>
    <div class="row f-sb-s other">
      <BaseSection title="项目动态" class="mr-o f-1">其他块内容1</BaseSection>
      <BaseSection title="创意" class="f-1">其他块内容2</BaseSection>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import ChartLine from "@/core/components/chart/ChartLine.vue";
import ChartPie from "@/core/components/chart/ChartPie.vue";
import { ref, reactive, watch, computed } from "vue";

const pannels: CommonObj[] = [
  { title: "访问量", icon: "DataAnalysis", value: 725, changeValue: -12, bgColors: ["rgb(236, 71, 134)", "rgb(185, 85, 164)"], unit: "" },
  { title: "成交额", icon: "Ticket", value: 1026, changeValue: 0, bgColors: ["rgb(134, 94, 192)", "rgb(81, 68, 180)"], unit: "$" },
  { title: "下载量", icon: "Download", value: 970925, changeValue: 123, bgColors: ["rgb(86, 205, 243)", "rgb(113, 157, 227)"], unit: "" },
  { title: "成交量", icon: "Histogram", value: 9527, changeValue: 1, bgColors: ["rgb(252, 188, 37)", "rgb(246, 128, 87)"], unit: "" },
];
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
</script>
<style lang="scss" scoped>
.row {
  margin-bottom: $gap;
}
.section {
  border-radius: $radius-main;
  padding: $gap;
  background: #fff;
  box-shadow: $shadow-main;
}
.info {
  .welcome {
    font-size: $font-size-heavyer;
    font-weight: bolder;
    margin-bottom: $gap-half;
  }
  .weather {
    color: $color-text-lighter;
  }
  .ul {
    .li {
      &:not(:last-child) {
        margin-right: $gap-two;
      }
      .key {
        color: $color-text-lighter;
        font-size: $font-size-light;
        margin-bottom: $gap-half;
      }
      .val {
        font-size: $font-size-heavyer;
      }
    }
  }
}
.pannels {
  .item {
    color: #fff;
    border-radius: $radius-main;
    padding: $gap;
    @include shadow-main();
    &:not(:last-child) {
      margin-right: $gap;
    }
    &:nth-child(1) {
      background: linear-gradient(to right bottom, rgb(236, 71, 134), rgb(185, 85, 164));
    }
    &:nth-child(2) {
      background: linear-gradient(to right bottom, rgb(134, 94, 192), rgb(81, 68, 180));
    }
    &:nth-child(3) {
      background: linear-gradient(to right bottom, rgb(86, 205, 243), rgb(113, 157, 227));
    }
    &:nth-child(4) {
      background: linear-gradient(to right bottom, rgb(252, 188, 37), rgb(246, 128, 87));
    }
    .title {
      margin-bottom: $gap-half;
    }
    .data {
      font-size: 2em;
    }
  }
}
.charts {
}
.other {
}
</style>
