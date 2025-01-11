<!-- summary
  目标：给图片提供带 bar 提示语的功能
-->
<template>
  <div :style="{ height: toCssVal(size || height), width: toCssVal(size || width) }" class="tag-img f-c-c" :class="{ 'hover-move': hoverMove }">
    <el-tag class="f-c-c top-bar" v-bind="topTip.attrs" v-if="topTag">
      {{ topTip.text }}
    </el-tag>
    <BaseImg v-bind="$attrs" />
    <div class="bottom-text" :class="tagSize" v-bind="bottomTip.attrs" v-if="bottomTag">
      {{ bottomTip.text }}
    </div>
    <!-- <el-tag
      class="f-c-c bottom-bar"
      v-bind="bottomTip.attrs"
      v-if="bottomTag"
    >
      {{ bottomTip.text }}
    </el-tag> -->
    <el-tag
      class="left-tag"
      :size="tagSize"
      v-bind="tag"
      :style="{ bottom: currSize.bottom + ind * currSize.height + 'px' }"
      v-for="(tag, ind) in newLeftTags"
      :key="ind"
      >{{ tag.text }}</el-tag
    >
  </div>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { defaultCommonSize, toCssVal } from "@/core/utils";
import { TagType } from "@/core/components/BaseTag.vue";
import { getBarObj } from "@/core/components/crud/CardCrud/_utils";
import { CommonObj, CommonSize } from "@/core/_types";

// 嵌套的tag属性，先临时这样取名
export interface NestedTagAttrs {
  text: string;
  attrs?: {
    type?: TagType;
  };
}

defineOptions({
  inheritAttrs: false,
});

const sizeMap: CommonObj = {
  large: {
    bottom: 0, // 4
    height: 36,
  },
  default: {
    bottom: 0, // 2
    height: 26,
  },
  small: {
    bottom: 0, // 0
    height: 22,
  },
};
const props = withDefaults(
  defineProps<{
    tagSize?: CommonSize; // el-tag 的大小
    topTag?: string | NestedTagAttrs;
    bottomTag?: string | NestedTagAttrs;
    leftTags?: (string | NestedTagAttrs)[];
    hoverMove?: boolean; //当鼠标移动到图片上时，顶部、底部的bar文本信息是否移开
    // 其他属性则按照 BaseImg 的属性来设置
  }>(),
  {
    tagSize: defaultCommonSize,
    hoverMove: true,
  }
);
const $attrs = useAttrs();
const currSize = sizeMap[props.tagSize];
//顶部提示文字
const topTip = computed<any>(() => getBarObj(props.topTag));
//底部提示文字
const bottomTip = computed<any>(() => getBarObj(props.bottomTag));
//左侧标签
const newLeftTags = computed<any>(() => props.leftTags?.map(item => getBarObj(item)) ?? []);
</script>

<style lang="scss" scoped>
.tag-img {
  position: relative;
  overflow: hidden;
  .base-img {
    border-radius: 0;
  }
  &.hover-move {
    &:hover {
      .top-bar {
        transform: translateY(-100%);
      }
      .bottom-bar,
      .bottom-text {
        transform: translateY(100%);
      }
      .left-tag {
        transform: translateX(-100%);
      }
    }
  }
  .top-bar,
  .bottom-bar,
  .bottom-text {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 1;
    transition: all $transition-time-main;
  }
  .top-bar {
    top: 0;
  }
  .bottom-bar,
  .bottom-text {
    bottom: 0;
  }
  .bottom-text {
    height: auto;
    font-size: 12px;
    color: $color-warning;
    background: rgba(#fdf6ec, 0.9);
    // background: #fdf6ec;
    &.large {
      padding: 4px 8px;
    }
    &.default {
      padding: 4px 4px;
    }
    &.small {
      padding: 2px 2px;
    }
  }
  .left-tag {
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0.7;
    transition: all $transition-time-main;
  }
}
</style>
