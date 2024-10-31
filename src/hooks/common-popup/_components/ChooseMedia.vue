<!-- 选择媒体组件控件 -->
<template>
  <div class="choolse-media">
    这是一个选择多媒体文件（含：
    <b>{{ typeMap[type] }}</b>
    ）的示例组件，会在整个系统中多处用到
  </div>
</template>
<script lang="ts" setup>
export type ChoolseMediaType = "all" | "image" | "audio" | "video";

const typeMap = {
  all: "图片、音频、视频",
  image: "图片",
  audio: "音频",
  video: "视频",
};
const props = withDefaults(
  defineProps<{
    type?: ChoolseMediaType;
  }>(),
  {
    type: "all",
  }
);
</script>
<style lang="scss" scoped></style>
