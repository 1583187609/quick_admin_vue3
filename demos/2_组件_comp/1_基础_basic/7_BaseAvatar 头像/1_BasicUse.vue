<!-- summary 基础用法
  继承 BaseImg 的属性，并额外提供了gender（性别）属性。
  考虑扩展性（可能还有vip、状态标识），所以有必要将头像单独封装成一个组件
-->
<template>
  <div class="f-fs-fs-w">
    <BaseAvatar />
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
