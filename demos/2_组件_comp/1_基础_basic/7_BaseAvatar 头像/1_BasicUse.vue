<!-- summary 基础用法
  继承了BaseImg的其他属性，还提供了区分性别的默认底图。
-->
<template>
  <div class="f-fs-fs-w">
    <BaseAvatar />
    <BaseAvatar :gender="0" />
    <BaseAvatar :gender="1" />
    <BaseAvatar :gender="2" />
    <BaseAvatar :src="url" to="/" />
    <BaseAvatar :src="url" @click="router.push('/')" />
    <BaseAvatar :src="url" size="60" round />
    <BaseAvatar :src="url" size="60px" />
    <BaseAvatar :src="url" height="60px" width="100px" />
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
const router = useRouter();
</script>
<style lang="scss" scoped>
.base-avatar {
  margin: $gap-half;
}
</style>
