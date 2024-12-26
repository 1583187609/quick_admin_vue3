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
