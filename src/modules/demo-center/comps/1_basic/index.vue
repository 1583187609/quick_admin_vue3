<!-- 基础组件 -->
<template>
  <div class="page-view">
    <el-tabs tab-position="left" style="height: 200px" class="demo-tabs">
      <el-tab-pane :label="item.name" v-for="(item, key) in demoMap" :key="key">
        <BaseRender :renderData="item.comp" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { CommonObj } from "@/core/_types";

const demoMap: CommonObj = {
  icon: {
    name: "图标",
    comp: defineAsyncComponent(() => import("./_components/DemoIcon.vue")),
  },
  btn: {
    name: "按钮",
    comp: defineAsyncComponent(() => import("./_components/DemoBtn.vue")),
  },
  //   empty: {
  //     name: "图标",
  //     comp: defineAsyncComponent(() => import("./_components/DemoEmpty.vue")),
  //   },
  //   copy: {
  //     name: "复制文本",
  //     comp: defineAsyncComponent(() => import("./_components/DemoCopy.vue")),
  //   },
  //   text: {
  //     name: "多行文本",
  //     comp: defineAsyncComponent(() => import("./_components/DemoText.vue")),
  //   },
  //   img: {
  //     name: "图片",
  //     comp: defineAsyncComponent(() => import("./_components/DemoImg.vue")),
  //   },
  //   avatar: {
  //     name: "头像",
  //     comp: defineAsyncComponent(() => import("./_components/DemoAvatar.vue")),
  //   },
  //   statusImg: {
  //     name: "状态图片",
  //     comp: defineAsyncComponent(() => import("./_components/DemoBarImg.vue")),
  //   },
  //   tag: {
  //     name: "字典标签",
  //     comp: defineAsyncComponent(() => import("./_components/DemoTag.vue")),
  //   },
  //   qrcode: {
  //     name: "二维码",
  //     comp: defineAsyncComponent(() => import("./_components/DemoQrcode.vue")),
  //   },
  //   audio: {
  //     name: "音频",
  //     comp: defineAsyncComponent(() => import("./_components/DemoAduio.vue")),
  //   },
  //   video: {
  //     name: "视频",
  //     comp: defineAsyncComponent(() => import("./_components/DemoVideo.vue")),
  //   },
  //   numberRange: {
  //     name: "数字区间",
  //     comp: defineAsyncComponent(() => import("./_components/DemoNumberRange.vue")),
  //   },
  //   liftingNum: {
  //     name: " 数值升降",
  //     comp: defineAsyncComponent(() => import("./_components/DemoLiftingNum.vue")),
  //   },
  //   transitionNum: {
  //     name: "数值过渡",
  //     comp: defineAsyncComponent(() => import("./_components/DemoTransitionNum.vue")),
  //   },
};

const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
