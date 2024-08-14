<!-- summary -->
<template>
    <BaseImg />
    <BaseImg :src="url" to="/"/>
    <BaseImg :src="url" round/>
    <BaseImg :src="url" size="60px"/>
    <BaseImg :src="url" height="60px" width="100px"/>
</template>
<script lang="ts" setup>
const url = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg';
</script>
<style lang="scss" scoped>
.base-img{
  margin: $gap-half;
}
</style>