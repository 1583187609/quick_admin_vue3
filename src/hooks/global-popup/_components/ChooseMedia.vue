<!-- 选择媒体组件控件 -->
<template>
  <div class="choolse-media">这是一个选择媒体文件（图片、音频、视频）的示例组件，会在整个系统中多处用到</div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/vite-env";
import { ref, reactive, watch, computed } from "vue";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
