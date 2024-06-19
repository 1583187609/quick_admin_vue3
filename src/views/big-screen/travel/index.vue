<template>
  <div class="container">
    <div class="content f-fs-s-c" ref="contentRef">
      <div class="header f-c-s f-0">
        <div class="side left">
          <span class="strong home" @click="router.push(defaultHomePath)"> 首页 </span>
        </div>
        <div class="center f-1">
          <div class="title">
            <span>智慧旅游可视化大数据展示平台</span>
            <div class="warning">平台高峰预警信息（2条）</div>
          </div>
        </div>
        <div class="side right">
          <span class="strong report">统计报告</span>
          <span class="now-time">当前时间：{{ time }}</span>
        </div>
      </div>
      <div class="bodyer f-sb-s f-1">
        <div class="left f-sb-s-c">
          <div class="section top">
            <div class="head f-c-fs-c">
              <span class="text">实时游客统计</span>
              <img class="bg" src="./_imgs/title.png" />
            </div>
            <RealTimeAccessChart class="body" />
          </div>
          <div class="section center">
            <div class="head f-c-fs-c">
              <span class="text">男女比例</span>
              <img class="bg" src="./_imgs/title.png" />
            </div>
            <GenderRatioChart class="body" />
          </div>
          <div class="section bottom">
            <div class="head f-c-fs-c">
              <span class="text">年龄比例</span>
              <img class="bg" src="./_imgs/title.png" />
            </div>
            <AgeRatioChart class="body" />
          </div>
        </div>
        <div class="middle f-sb-s-c f-1">
          <div class="map f-1">
            <div class="map-title f-fs-c">景区实时客流量</div>
            <ChinaMapChart />
          </div>
          <div class="section future">
            <div class="head f-c-fs-c">
              <span class="text">未来30天游客量趋势图</span>
              <img class="bg" src="./_imgs/title.png" />
            </div>
            <OverNextMonthChart class="body" />
          </div>
        </div>
        <div class="right f-sb-s-c">
          <div class="section top">
            <div class="head f-c-fs-c">
              <span class="text">热门景区排行</span>
              <img class="bg" src="./_imgs/title.png" />
            </div>
            <HotPlateChart class="body" />
          </div>
          <div class="section center">
            <div class="head f-c-fs-c">
              <span class="text">年度游客量对比</span>
              <img class="bg" src="./_imgs/title.png" />
            </div>
            <AnnualUseChart class="body" />
          </div>
          <div class="section bottom">
            <div class="head f-c-fs-c">
              <span class="text">预约渠道数据统计</span>
              <img class="bg" src="./_imgs/title.png" />
            </div>
            <PlatformSourceChart class="body" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataScreen">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import AgeRatioChart from "./_components/AgeRatioChart.vue";
import AnnualUseChart from "./_components/AnnualUseChart.vue";
import ChinaMapChart from "./_components/ChinaMapChart.vue";
import HotPlateChart from "./_components/HotPlateChart.vue";
import GenderRatioChart from "./_components/GenderRatioChart.vue";
import OverNextMonthChart from "./_components/OverNextMonthChart.vue";
import PlatformSourceChart from "./_components/PlatformSourceChart.vue";
import RealTimeAccessChart from "./_components/RealTimeAccessChart.vue";
import { defaultHomePath } from "@/utils";
import dayjs from "dayjs";

const router = useRouter();
const contentRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contentRef.value) {
    contentRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    contentRef.value.style.width = `1920px`;
    contentRef.value.style.height = `1080px`;
  }
  window.addEventListener("resize", resize);
});

// 设置响应式
const resize = () => {
  if (contentRef.value) {
    contentRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
  }
};

// 根据浏览器大小推断缩放比例
const getScale = (width = 1920, height = 1080) => {
  const ww = window.innerWidth / width;
  const wh = window.innerHeight / height;
  return ww < wh ? ww : wh;
};

// 获取当前时间
let timer: NodeJS.Timer | null = null;
const time = ref<string>(dayjs().format("YYYY年MM月DD HH:mm:ss"));
timer = setInterval(() => {
  time.value = dayjs().format("YYYY年MM月DD HH:mm:ss");
}, 1000);

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  clearInterval(timer as unknown as number);
});
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 999;
  background: url("./_imgs/bg.png") no-repeat fixed center / cover;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transition: all 0.3s;
    transform-origin: left top;
  }
}
.header {
  width: 100%;
  height: 38px;
  .side {
    position: relative;
    width: 567px;
    background: url("./_imgs/header-left-bg.png") no-repeat 0 0/100% 100%;
  }
  .center {
    position: relative;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 82px;
      font-family: YouSheBiaoTiHei;
      font-size: 32px;
      line-height: 78px;
      color: #05e8fe;
      text-align: center;
      letter-spacing: 4px;
      background: url("./_imgs/header-center-bg.png") no-repeat 0 0/100% 100%;
      .warning {
        position: absolute;
        bottom: -42px;
        left: 50%;
        width: 622px;
        height: 44px;
        font-family: YouSheBiaoTiHei;
        font-size: 14px;
        line-height: 44px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 1px;
        background: url("./_imgs/header-warn-bg.png") no-repeat 0 0/100% 100%;
        transform: translateX(-50%);
      }
    }
  }
  .strong {
    position: absolute;
    z-index: 9;
    width: 136px;
    height: 42px;
    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    font-weight: 400;
    line-height: 42px;
    color: #29fcff;
    text-align: center;
    cursor: pointer;
    background-size: 100% 100%;
    &.home {
      right: 0;
      padding-right: 4px;
      background: url("./_imgs/header-btn-bg-l.png") no-repeat 0 0/100% 100%;
    }
    &.report {
      left: 0;
      padding-right: 0;
      background: url("./_imgs/header-btn-bg-r.png") no-repeat 0 0/100% 100%;
    }
  }

  .now-time {
    position: absolute;
    top: 0;
    right: 14px;
    width: 310px;
    font-family: YouSheBiaoTiHei;
    font-size: 17px;
    font-weight: 400;
    line-height: 38px;
    color: #05e8fe;
  }
}
.bodyer {
  width: 100%;
  padding: 12px 42px 20px;
  .left {
    width: 394px;
    height: 100%;
    margin-right: 40px;
    .section {
      &.top {
        height: 37%;
        background: url("./_imgs/main-lt.png") no-repeat 0 0/100% 100%;
      }
      &.center {
        height: 30%;
        background: url("./_imgs/main-lc.png") no-repeat 0 0/100% 100%;
      }
      &.bottom {
        height: 27%;
        margin-bottom: 0;
        background: url("./_imgs/main-lb.png") no-repeat 0 0/100% 100%;
      }
    }
  }
  .middle {
    height: 100%;
    margin-right: 40px;
    .map {
      position: relative;
      width: 100%;
      margin-top: 78px;
      .map-title {
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 99;
        width: 270px;
        height: 25px;
        padding-left: 30px;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 5px;
        background: url("./_imgs/map-title-bg.png") no-repeat 0 0/100% 100%;
      }
    }
    .future {
      position: relative;
      width: 100%;
      height: 252px;
      padding-top: 54px;
      background: url("./_imgs/main-cb.png") no-repeat 0 0/100% 100%;
    }
  }
  .right {
    width: 394px;
    height: 100%;
    .section {
      &.top {
        height: 37%;
        background: url("./_imgs/main-rt.png") no-repeat 0 0/100% 100%;
      }
      &.center {
        height: 30%;
        background: url("./_imgs/main-rc.png") no-repeat 0 0/100% 100%;
      }
      &.bottom {
        height: 27%;
        margin-bottom: 0;
        background: url("./_imgs/main-rb.png") no-repeat 0 0/100% 100%;
      }
    }
  }
}
.section {
  position: relative;
  width: 100%;
  padding-top: 54px;
  .head {
    position: absolute;
    top: 1px;
    left: 0;
    .text {
      margin-bottom: 12px;
      font-family: YouSheBiaoTiHei;
      font-size: 18px;
      line-height: 16px;
      color: #ffffff;
      letter-spacing: 1px;
    }
    .bg {
      width: 68px;
      height: 7px;
    }
  }
  .body {
    width: 100%;
    height: 100%;
  }
}
</style>
