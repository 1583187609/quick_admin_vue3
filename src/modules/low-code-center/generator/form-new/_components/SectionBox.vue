<!-- 页面-简介 -->
<template>
  <section class="section-box f-fs-s-c">
    <header class="head f-sb-c f-0" :class="{ 'border-bottom': borderBottom }" v-if="title">
      <span class="mr-a f-0">{{ title }}</span>
      <slot name="right"></slot>
    </header>
    <div class="body hover-show-scroll f-1" :class="bodyClass">
      <slot>
        <BaseEmpty :tips="emptyTips" />
      </slot>
    </div>
  </section>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string;
    bodyClass?: string;
    emptyTips?: string;
    borderBottom?: boolean;
  }>(),
  {
    borderBottom: true,
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
    &.border-bottom {
      border-bottom: $border-main;
    }
  }
  .body {
    overflow: auto;
  }
}
</style>
