<!-- 页面-简介 -->
<template>
  <div class="custom-popover" :style="{ width }">
    <section class="section" v-for="(item, ind) in sections" :key="ind">
      <header class="head">{{ item.name }}</header>
      <div class="body">
        <template v-if="typeOf(item.desc) === 'String'">{{ item.desc }}</template>
        <template v-else-if="typeOf(item.desc) === 'Array'">
          <div class="li" v-for="(it, i) in item.desc" :key="i">{{ i + 1 }}. {{ it }}</div>
        </template>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { typeOf } from "@/utils";

export interface SectionItem {
  name: string;
  desc: string | string[];
}
const props = withDefaults(
  defineProps<{
    sections?: CommonObj[];
    width?: string;
  }>(),
  {
    width: "200px",
    sections: () => [],
  }
);
</script>
<style lang="scss" scoped>
.section {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
  .head {
    font-weight: bold;
    margin-bottom: $gap-qtr;
  }
  .body {
    .li {
      &:not(:last-child) {
        margin-bottom: $gap-qtr;
      }
    }
  }
}
</style>
