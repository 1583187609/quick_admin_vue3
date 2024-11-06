<!-- summary
目标：视频播放组件
注意：该功能待完善
-->
<template>
  <video class="base-video" :controls="controls" v-if="src">
    <slot name="content" v-if="$slots.content">这是自定义内容</slot>
    <source :src="src" type="video/mp4" />
    <source :src="src" type="video/ogg" />
    您的浏览器不支持 video 标签。
  </video>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src?: string;
    controls?: boolean;
  }>(),
  {
    // src: "https://www.runoob.com/try/demo_source/movie.mp4",
    controls: true,
  }
);
const $slots = defineSlots<{
  content?: () => void; // 自定义内容插槽
}>();
</script>
<style lang="scss" scoped>
.base-video {
  width: 320px;
  height: 240px;
}
</style>
