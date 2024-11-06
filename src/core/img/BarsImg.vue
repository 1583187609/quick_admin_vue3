<!-- summary
  目标：给图片提供带 bar 提示语的功能
-->
<template>
  <div :style="newStyle" class="bars-img f-c-c" :class="{ 'hover-move': hoverMove }">
    <el-tag class="f-c-c top-bar" v-bind="topTip.attrs" v-if="topTip.text">
      {{ topTip.text }}
    </el-tag>
    <BaseImg v-bind="$attrs" />
    <div class="bottom-text" :class="sizeType" v-bind="bottomTip.attrs" v-if="bottomTip.text">
      {{ bottomTip.text }}
    </div>
    <!-- <el-tag
      class="f-c-c bottom-bar"
      v-bind="bottomTip.attrs"
      v-if="bottomTip.text"
    >
      {{ bottomTip.text }}
    </el-tag> -->
    <el-tag
      class="left-tag"
      :size="sizeType"
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
import { defaultCommonSize, toCssVal } from "@/core/_utils";
import { TagType } from "@/core/BaseTag.vue";
import { getBarObj } from "@/core/crud/CardCrud/_utils";
import { CommonObj, CommonSize } from "@/vite-env";

export interface BarAttrs {
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
    bottom: 0, //4
    height: 36,
  },
  default: {
    bottom: 0, //2
    height: 26,
  },
  small: {
    bottom: 0, //0
    height: 22,
  },
};
const props = withDefaults(
  defineProps<{
    sizeType?: CommonSize;
    topBar?: string | BarAttrs;
    bottomBar?: string | BarAttrs;
    leftTags?: (string | BarAttrs)[];
    hoverMove?: boolean; //当鼠标移动到图片上时，顶部、底部的bar文本信息是否移开
    //其他属性则按照 BaseImg 的属性来设置
  }>(),
  {
    sizeType: defaultCommonSize,
    hoverMove: true,
  }
);
const $attrs = useAttrs();
const currSize = sizeMap[props.sizeType];
const newStyle = computed(() => {
  return {
    height: toCssVal(props.size || props.height),
    width: toCssVal(props.size || props.width),
  };
});
//顶部提示文字
const topTip = computed<any>(() => getBarObj(props.topBar));
//底部提示文字
const bottomTip = computed<any>(() => getBarObj(props.bottomBar));
//左侧标签
const newLeftTags = computed<any>(() => props.leftTags?.map((item, ind) => getBarObj(item)) ?? []);
</script>

<style lang="scss" scoped>
.bars-img {
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
