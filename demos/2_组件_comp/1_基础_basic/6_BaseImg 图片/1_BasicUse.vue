<!-- summary 基础用法
  提供了加载中、加载失败图标状态，默认底图展示。图片预览功能、路由跳转功能。
-->
<template>
  <div class="f-fs-fs-w">
    <BaseImg />
    <BaseImg :src="url" to="/" />
    <BaseImg :src="url" round />
    <BaseImg :src="url" size="60px" />
    <BaseImg :src="url" height="60px" width="100px" />
  </div>
</template>
<script lang="ts" setup>
const url = "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
</script>
<style lang="scss" scoped>
.base-img {
  margin: 0 $gap;
}
</style>
