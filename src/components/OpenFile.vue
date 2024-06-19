<template>
  <a :href="url" class="open-file" target="_blank" download>
    <slot>-</slot>
  </a>
</template>
<script lang="ts" setup>
// <a href="https://github.com/progit/progit2-zh/releases/download/2.1.62/progit.pdf"><img width="50px" src="/images/pdf.png"></a>
import { ref, reactive, watch, computed, useSlots } from "vue";
import { CommonObj } from "@/vite-env";
// const $slots = useSlots();
// console.log($slots, "$slots-----------");
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
