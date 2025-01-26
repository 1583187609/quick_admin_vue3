<!-- summary 基础用法
 提供视频逻辑方案，处理通用业务逻辑，并暴露相关api，支持覆盖
  待完善
-->
<template>
  <div class="f-fs-fs">
    <BaseVideo :src="src" />
    <BaseVideo :src="src">自定义操作面板区域</BaseVideo>
  </div>
</template>
<script lang="ts" setup>
const src = "https://www.runoob.com/try/demo_source/movie.mp4";
</script>
<style lang="scss" scoped>
.base-video {
  &:not(:last-child) {
    margin-right: $gap-two;
  }
}
</style>
