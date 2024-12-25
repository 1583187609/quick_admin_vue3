<!-- 页面-简介 -->
<template>
  <span class="colors-label">
    <span :style="{ color: colors[ind % 7] || 'black' }" v-for="(item, ind) in text" :key="ind">{{ item }}</span>
  </span>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    text?: string;
    colors?: string[];
  }>(),
  {
    text: "默认自定义标签",
    colors: () => ["red", "orange", "#8B4513", "green", "blue", "indigo", "purple"],
  }
);
</script>
<style lang="scss" scoped>
.font {
  &:nth-child(1) {
    color: red;
  }
}
</style>
