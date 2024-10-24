<!-- 选择媒体组件控件 -->
<template>
  <div class="choolse-media">choolse-media</div>
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
