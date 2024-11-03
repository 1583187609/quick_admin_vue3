<!-- summary 通用弹窗
  适合全局常用的弹窗
-->
<template>
  <div>
    <el-button @click="openCommonPopup('ChooseMedia', 'all')" type="primary">打开常用弹窗（ChooseMedia）所有媒体</el-button>
    <el-button @click="openCommonPopup('ChooseMedia', 'image')" type="primary">打开常用弹窗（ChooseMedia）图片</el-button>
    <el-button @click="openCommonPopup('ChooseMedia', 'audio')" type="primary">打开常用弹窗（ChooseMedia）音频</el-button>
    <el-button @click="openCommonPopup('ChooseMedia', 'video')" type="primary">打开常用弹窗（ChooseMedia）视频</el-button>
  </div>
</template>
<script lang="ts" setup>
import { useCommonPopup } from "@/hooks";

const openCommonPopup = useCommonPopup();
</script>
<style lang="scss" scoped>
.el-button {
  margin: $gap-qtr;
}
</style>
