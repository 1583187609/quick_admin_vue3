<template>
  <div class="f-fs-fs">
    <BaseVideo :src="src" />
    <BaseVideo class="ml-32" :src="src">自定义内容区域</BaseVideo>
  </div>
</template>
<script lang="ts" setup>
const src = "https://www.runoob.com/try/demo_source/movie.mp4";
</script>
<style lang="scss" scoped></style>
