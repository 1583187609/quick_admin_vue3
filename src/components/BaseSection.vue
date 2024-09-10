<template>
  <div class="base-section">
    <div class="head f-sb-c">
      <div class="title f-fs-c f-0">
        <span class="line-1">{{ title }}</span>
        <el-badge :value="badge" class="ml-q" :max="99" :hidden="!badge"> </el-badge>
      </div>
      <slot name="head-right" />
      <BaseIcon
        @click="fold = !fold"
        class="fold-btn"
        :class="fold ? 'rotate-180' : ''"
        size="1.5em"
        name="CaretTop"
        v-if="foldable"
      />
    </div>
    <div class="body" :class="{ [bodyClass]: true, fold }">
      <slot><BaseEmpty /></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
const props = withDefaults(
  defineProps<{
    title?: string;
    badge?: number | string;
    max?: number;
    bodyClass?: string;
    foldable?: boolean;
  }>(),
  {
    title: "标题",
    badge: 0,
    max: 99,
    bodyClass: "",
    foldable: false,
  }
);
const badge = Number(props.badge);
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
