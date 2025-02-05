<!-- summary 基础用法
  提供了加载中、加载失败图标状态，默认底图展示。图片预览功能、路由跳转功能。
  默认可以预览，但当存在to属性或onClick事件时，不能预览。
-->
<template>
  <div class="f-fs-fs-w">
    <BaseImg />
    <BaseImg src="https://123.com" />
    <BaseImg :src="url" to="/" />
    <BaseImg :src="url" @click="router.push('/')" />
    <BaseImg :src="url" circle />
    <BaseImg :src="url" size="60px" />
    <BaseImg :src="url" height="60px" width="100px" />
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const url = "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
const router = useRouter();
</script>
<style lang="scss" scoped>
.base-img {
  margin: $gap-half;
}
</style>
