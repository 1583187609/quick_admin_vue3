<!-- 页面-简介 -->
<template>
  <span class="custom-head" v-if="type === 'head'">自定义表格头</span>
  <div class="custom-head" v-else-if="type === 'popover'">
    <section class="section">
      <div class="title">自定义表格头</div>
      <div>这是自定义表格头CustomHead组件渲染的自定义popover内容</div>
    </section>
    <section class="section">
      <div class="title">自定义popover</div>
      <div>展示如何自定义popover</div>
    </section>
    <section class="section">
      <div class="title">formatter</div>
      <div>展示如何用继承自ElementPlus的formatter方法处理数据</div>
    </section>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: "head" | "popover";
    isPopover?: boolean;
  }>(),
  {
    type: "head",
  }
);
</script>
<style lang="scss" scoped>
.section {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
  .title {
    font-weight: bold;
    margin-bottom: $gap-qtr;
  }
}
</style>
