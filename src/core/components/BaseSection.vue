<!-- summary
目标：内容分块的布局载体。并提供了折叠等功能。
-->
<template>
  <div class="base-section" :class="{ border }">
    <div class="head f-sb-c" @click="toggleFold">
      <div class="title f-fs-c f-0">
        <BaseText maxLine="1" :popupAttrs="{ title: '问题' }">{{ title }}</BaseText>
        <QuestionPopover :popover="popover" class="ml-q f-0 mr-h" v-if="popover" />
        <el-badge class="ml-q" v-bind="{ ...defaultBadgeAttrs, ...badgeAttrs }" v-if="badgeAttrs" />
      </div>
      <slot name="head-right" />
      <el-icon @click="fold = !fold" class="fold-btn f-0" :class="fold ? 'rotate-90' : ''" size="1.5em" v-if="foldable">
        <ArrowRight />
      </el-icon>
    </div>
    <el-row class="body hover-show-scroll" :class="{ [bodyClass]: true, fold }">
      <slot><BaseEmpty /></slot>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import QuestionPopover from "@/core/components/QuestionPopover.vue";
import { CommonObj, PopoverType } from "../_types";

const defaultBadgeAttrs = {
  max: 99,
};
const props = withDefaults(
  defineProps<{
    title?: string;
    popover?: PopoverType;
    badgeAttrs?: CommonObj;
    foldable?: boolean;
    border?: boolean;
    bodyClass?: string;
    bodyMaxHeight?: string;
    defaultFold?: boolean;
  }>(),
  {
    title: "未命名标题",
    border: true,
    bodyClass: "",
    // foldable: false,
    // defaultFold: false,
    bodyMaxHeight: "90vh",
  }
);
const $emit = defineEmits(["toggle"]);
const fold = ref(props.defaultFold);
function toggleFold(e) {
  if (!e.target?.classList?.contains("head")) return;
  fold.value = !fold.value;
  $emit("toggle", fold.value);
}
</script>
<style lang="scss" scoped>
.base-section {
  &.border {
    border: $border-main;
    border-radius: $radius-main;
    @include shadow-main();
  }
  background: #fff;
  .head {
    padding: $gap-half $gap;
    .title {
      margin-right: auto;
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
    // overscroll-behavior: auto; // 默认为auto
    transition: all $transition-time-main;
    max-height: v-bind(bodyMaxHeight);
    overflow: "auto";
    &.fold {
      max-height: 0;
      overflow: "hidden";
    }
  }
}
</style>
