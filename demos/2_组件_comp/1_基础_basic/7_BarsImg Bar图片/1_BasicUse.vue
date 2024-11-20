<template>
  <div class="f-fs-fs-w">
    <BarsImg />
    <BarsImg topBar="顶部信息" :src="url" to="/" />
    <BarsImg bottomBar="底部信息" :src="url" />
    <BarsImg :leftTags="['左1', '左左2', '左左左3']" :src="url" size="180px" />
    <BarsImg topBar="顶部信息" bottomBar="底部信息" sizeType="small" :src="url" height="180px" width="100px" />
  </div>
</template>
<script lang="ts" setup>
import BarsImg from "@/core/components/img/BarsImg.vue";
const url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
</script>
<style lang="scss" scoped>
.bars-img {
  margin: $gap-half;
}
</style>
