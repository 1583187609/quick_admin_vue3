<!-- 页面-简介 -->
<template>
  <section class="section-box f-fs-s">
    <header class="head f-0">{{ title }}</header>
    <div class="body f-1">
      <slot />
    </div>
  </section>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "未命名标题",
  }
);
</script>
<style lang="scss" scoped>
.section-box {
  height: 100%;
  border: $border-main;
  border-radius: $radius-main;
  .head {
    padding: $gap-half $gap;
    border-bottom: $border-main;
  }
  .body {
    padding: $gap-half $gap;
    overflow: auto;
  }
}
</style>
