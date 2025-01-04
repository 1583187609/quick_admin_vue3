<!-- 基础组件 -->
<template>
  <div class="q-page-view">
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

const DemoIcon = defineAsyncComponent(() => import("./_components/DemoIcon.vue"));
const DemoBtn = defineAsyncComponent(() => import("./_components/DemoBtn.vue"));
// const DemoEmpty = defineAsyncComponent(() => import("./_components/DemoEmpty.vue"));
// const DemoCopy = defineAsyncComponent(() => import("./_components/DemoCopy.vue"));
// const DemoText = defineAsyncComponent(() => import("./_components/DemoText.vue"));
// const DemoImg = defineAsyncComponent(() => import("./_components/DemoImg.vue"));
// const DemoAvatar = defineAsyncComponent(() => import("./_components/DemoAvatar.vue"));
// const DemoBarImg = defineAsyncComponent(() => import("./_components/DemoBarImg.vue"));
// const DemoTag = defineAsyncComponent(() => import("./_components/DemoTag.vue"));
// const DemoQrcode = defineAsyncComponent(() => import("./_components/DemoQrcode.vue"));
// const DemoAduio = defineAsyncComponent(() => import("./_components/DemoAduio.vue"));
// const DemoVideo = defineAsyncComponent(() => import("./_components/DemoVideo.vue"));
// const DemoNumberRange = defineAsyncComponent(() => import("./_components/DemoNumberRange.vue"));
// const DemoLiftingNum = defineAsyncComponent(() => import("./_components/DemoLiftingNum.vue"));
// const DemoTransitionNum = defineAsyncComponent(() => import("./_components/DemoTransitionNum.vue"));

const demoMap: CommonObj = {
  icon: { name: "图标", comp: DemoIcon },
  btn: { name: "按钮", comp: DemoBtn },
  // empty: { name: "图标", comp: DemoEmpty },
  // copy: { name: "复制文本", comp: DemoCopy },
  // text: { name: "多行文本", comp: DemoText },
  // img: { name: "图片", comp: DemoImg },
  // avatar: { name: "头像", comp: DemoAvatar },
  // statusImg: { name: "状态图片", comp: DemoBarImg },
  // tag: { name: "字典标签", comp: DemoTag },
  // qrcode: { name: "二维码", comp: DemoQrcode },
  // audio: { name: "音频", comp: DemoAduio },
  // video: { name: "视频", comp: DemoVideo },
  // numberRange: { name: "数字区间", comp: DemoNumberRange },
  // liftingNum: { name: " 数值升降", comp: DemoLiftingNum },
  // transitionNum: { name: "数值过渡", comp: DemoTransitionNum },
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
