<!-- summary
目标：内容分块的布局载体。并提供了折叠等功能。
-->
<template>
  <div class="base-section">
    <div class="head f-sb-c">
      <div class="title f-fs-c f-1">
        <BaseText maxLine="1" :popupAttrs="{ title: '问题' }">{{ title }}</BaseText>
        <el-badge class="ml-q" v-bind="{ ...defaultBadgeAttrs, ...badgeAttrs }" v-if="badgeAttrs" />
      </div>
      <slot name="head-right" />
      <el-icon @click="fold = !fold" class="fold-btn" :class="fold ? 'rotate-180' : ''" size="1.5em" v-if="foldable">
        <CaretTop />
      </el-icon>
    </div>
    <div class="body" :class="{ [bodyClass]: true, fold }">
      <slot><BaseEmpty /></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { CaretTop } from "@element-plus/icons-vue";
import { CommonObj } from "../_types";

const defaultBadgeAttrs = {
  max: 99,
};
const props = withDefaults(
  defineProps<{
    title?: string;
    badgeAttrs?: CommonObj;
    bodyClass?: string;
    foldable?: boolean;
  }>(),
  {
    title: "标题",
    bodyClass: "",
    foldable: false,
  }
);
const fold = ref(false);
</script>
<style lang="scss" scoped>
.base-section {
  border-radius: $radius-main;
  border: $border-main;
  background: #fff;
  @include shadow-main();
  .head {
    padding: $gap-half $gap;
    .title {
      font-size: $font-size-heavy;
      font-weight: 500;
      &::before {
        content: "";
        display: block;
        height: 1em;
        width: 6px;
        border-radius: 3px;
        margin-right: $gap-half;
        background: $color-primary;
      }
    }
    .fold-btn {
      cursor: pointer;
      margin-left: $gap-half;
      transition: all $transition-time-main;
      &:hover {
        color: $color-primary;
      }
    }
  }
  .body {
    padding: $gap-half $gap;
    border-top: $border-main;
    overscroll-behavior: none;
    // transition: all $transition-time-main;
    // max-height: 100vh;
    &.fold {
      display: none;
      // max-height: 0;
      // overflow: hidden;
    }
  }
}
</style>
