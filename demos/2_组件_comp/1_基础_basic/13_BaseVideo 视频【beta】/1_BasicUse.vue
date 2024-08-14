<template>
  <BaseVideo :src="src" />
  <BaseVideo :src="src">自定义内容区域</BaseVideo>
</template>
<script lang="ts" setup>
const src = "https://www.runoob.com/try/demo_source/movie.mp4";
</script>
<style lang="scss" scoped></style>
