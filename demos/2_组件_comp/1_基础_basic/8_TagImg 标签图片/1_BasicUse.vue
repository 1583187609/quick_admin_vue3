<!-- summary 基础用法
  继承 BaseImg 的属性，并额外提供了标签样式属性。
-->
<template>
  <div class="f-fs-fs-w">
    <TagImg />
    <TagImg topTag="顶部信息" :src="url" to="/" />
    <TagImg bottomTag="底部信息" :src="url" />
    <TagImg :leftTags="['左1', '左左2', '左左左3']" :src="url" size="180px" />
    <TagImg topTag="顶部信息" bottomTag="底部信息" tagSize="small" :src="url" height="180px" width="100px" />
  </div>
</template>
<script lang="ts" setup>
import TagImg from "@/core/components/img/TagImg.vue";
const url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
</script>
<style lang="scss" scoped>
.tag-img {
  margin: $gap-half;
}
</style>
