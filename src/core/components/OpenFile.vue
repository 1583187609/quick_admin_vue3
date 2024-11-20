<!-- summary
 目标：用于链接、文件等地址的处理。例：pdf文件，https外部地址，站内地址等处理
 注意：该组件待完善
-->
<template>
  <a :href="url" class="open-file" target="_blank" download>
    <slot>{{ emptyStr }}</slot>
  </a>
</template>
<script lang="ts" setup>
import { emptyStr } from "@/core/utils";
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
