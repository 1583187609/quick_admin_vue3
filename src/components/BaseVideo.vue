<!-- 组件 - 视频播放组件 -->
<template>
  <video class="base-video" controls v-if="src">
    <slot></slot>
    <source :src="src" type="video/mp4" />
    <source :src="src" type="video/ogg" />
    您的浏览器不支持 video 标签。
  </video>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    src?: string;
  }>(),
  {
    // src: "https://www.runoob.com/try/demo_source/movie.mp4",
  }
);
</script>
<style lang="scss" scoped>
.base-video {
  width: 320px;
  height: 240px;
}
</style>
