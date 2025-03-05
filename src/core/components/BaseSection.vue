<!-- summary
目标：内容分块的布局载体。并提供了折叠等功能。
-->
<template>
  <div class="base-section" :class="{ border, gap }">
    <div class="head f-sb-c" @click="toggleFold">
      <div class="title f-fs-c f-0">
        <BaseText maxLine="1" :popupAttrs="{ title: '问题' }">{{ title }}</BaseText>
        <ExplainPopover :explain="explain" class="ml-q f-0 mr-h" v-if="explain" />
        <el-badge class="ml-q" v-bind="{ ...defaultBadgeAttrs, ...badgeAttrs }" v-if="badgeAttrs" />
      </div>
      <slot name="head-right" v-if="$slots['head-right']" />
      <el-icon @click="fold = !fold" class="fold-btn f-0" :class="fold ? 'rotate-90' : ''" size="1em" v-if="foldable">
        <ArrowRight />
      </el-icon>
    </div>
    <div class="body hover-show-scroll" :class="{ [bodyClass]: true, fold, foldable }">
      <slot><BaseEmpty /></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import ExplainPopover from "@/core/components/ExplainPopover.vue";
import { CommonObj, PopoverType } from "@/core/_types";

const defaultBadgeAttrs = { max: 99 };
const props = withDefaults(
  defineProps<{
    title?: string;
    explain?: PopoverType;
    badgeAttrs?: CommonObj;
    foldable?: boolean;
    border?: boolean;
    bodyClass?: string;
    bodyMaxHeight?: string;
    defaultFold?: boolean;
    gap?: boolean;
  }>(),
  {
    title: "未命名标题",
    border: true,
    gap: true,
    bodyClass: "",
    // foldable: false,
    // defaultFold: false,
    bodyMaxHeight: "90vh",
  }
);
const $emit = defineEmits(["toggle"]);
const fold = ref(props.defaultFold);
function toggleFold(e) {
  if (!props.foldable || !e.target?.classList?.contains("head")) return;
  fold.value = !fold.value;
  $emit("toggle", fold.value);
}
</script>
<style lang="scss" scoped>
.base-section {
  width: 100%;
  background: #fff;
  &.gap {
    &:not(:last-child) {
      margin-bottom: $gap-half;
    }
  }
  &.border {
    border: $border-main;
    border-radius: $radius-main;
    @include shadow-main();
    .head {
      padding: $gap-half;
    }
    .body {
      padding: $gap-half $gap;
    }
  }
  .head {
    padding: $gap-half 0;
    border-bottom: $border-main;
    background: $color-bg-lighter;
    .title {
      font-size: $font-size-heavy;
      font-weight: 500;
      &::before {
        content: "";
        display: block;
        height: 1em;
        width: 0.375em;
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
    overscroll-behavior: auto; // 默认为auto
    &.foldable {
      margin: $gap-half 0 0;
      transition: all $transition-time-main;
      max-height: v-bind(bodyMaxHeight);
      overflow: auto;
      &.fold {
        max-height: 0;
        overflow: hidden;
      }
    }
  }
}
</style>
