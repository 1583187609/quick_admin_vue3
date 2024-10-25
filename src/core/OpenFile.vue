<!-- 此组件待完善 -->
<!-- summary
 用于链接文件等地址的处理
 @example pdf文件，https外部地址，站内地址等处理
-->
<template>
  <a :href="url" class="open-file" target="_blank" download>
    <slot>-</slot>
  </a>
</template>
<script lang="ts" setup>
// <a href="https://github.com/progit/progit2-zh/releases/download/2.1.62/progit.pdf"><img width="50px" src="/images/pdf.png"></a>
const props = withDefaults(
  defineProps<{
    url?: string;
  }>(),
  {}
);
</script>
<style lang="scss" scoped>
.open-file {
  cursor: pointer;
  color: $color-primary;
  &:hover {
    text-decoration: underline;
  }
}
</style>
