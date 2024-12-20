<!-- 页面-简介 -->
<template>
  <section class="section-box f-fs-s-c">
    <header class="head f-sb-c f-0">
      <span class="mr-a">{{ title }}</span>
      <slot name="right"></slot>
    </header>
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
  background: #fff;
  .head {
    height: 36px;
    padding: 0 $gap-half;
    border-bottom: $border-main;
  }
  .body {
    padding: $gap-half;
    overflow: auto;
  }
}
</style>
