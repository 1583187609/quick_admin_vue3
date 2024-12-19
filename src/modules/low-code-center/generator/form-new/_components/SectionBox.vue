<!-- 页面-简介 -->
<template>
  <section class="section-box f-fs-s-c">
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
  background: #fff;
  .head {
    padding: $gap-half;
    border-bottom: $border-main;
  }
  .body {
    padding: $gap-half;
    overflow: auto;
  }
}
</style>
