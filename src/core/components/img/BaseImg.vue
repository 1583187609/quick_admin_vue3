<!-- summary
目标：定位为基础图片。用作占位，实现快速开发，兼顾细节处理：加载动效、错误提示、图片预览、路由快捷跳转、默认底图等。 
-->
<template>
  <el-image
    @click="handleClick"
    class="base-img"
    :class="{ round, to: !!to, empty: !src }"
    :src="src || emptyImg"
    :style="{ height: toCssVal(size || height), width: toCssVal(size || width) }"
    v-bind="newAttrs"
  >
    <template #placeholder>
      <div class="err-box f-c-c-c">
        <el-icon class="rotate" :size="iconSize" name="Loading">
          <Loading />
        </el-icon>
        <span class="tips">{{ loadTips }}</span>
      </div>
    </template>
    <template #error>
      {{ $emit("error") }}
      <el-image class="base-img" :class="{ round }" :src="errImgSrc" v-bind="defaultImageAttrs" v-if="errImgSrc" />
      <div class="err-box f-c-c-c" v-else>
        <el-icon :size="iconSize" name="Picture">
          <Picture />
        </el-icon>
        <span class="tips" v-if="errTips">{{ errTips }}</span>
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { getCssNum, toCssVal } from "@/core/utils";
import { CommonObj, CommonSize, RouteTo, StrNum } from "@/core/_types";
import emptyImg from "@/assets/images/default/img.png";
import { Loading, Picture } from "@element-plus/icons-vue";
import { useAttrs } from "vue";

export type ImgFitType = "fill" | "contain" | "cover" | "none" | "scale-down";
// const sizeMap: CommonObj = {
//   large: 26,
//   default: 22,
//   small: 18,
// };
// 默认的图片属性
const defaultImageAttrs = {
  fit: "cover", // ImgFitType
  previewTeleported: true,
  hideOnClickModal: true,
};
const router = useRouter();
const props = withDefaults(
  defineProps<{
    size?: StrNum;
    iconSize?: number;
    width?: StrNum;
    height?: StrNum;
    to?: RouteTo;
    src?: string;
    round?: boolean;
    stop?: boolean; // 点击图片时，是否阻止冒泡
    preview?: boolean;
    loadTips?: string;
    errTips?: string;
    errImgSrc?: string;
    // 其他同 el-image 的属性
    // fit?: ImgFitType;
    // initialIndex?: number;
  }>(),
  {
    iconSize: ({ size, width, height }) => (getCssNum(size) ?? Math.max(getCssNum(width) ?? 0, getCssNum(height) ?? 0)) * 0.1,
    loadTips: "玩命加载中…",
    errTips: "加载失败",
    preview: true,
  }
);
const $emit = defineEmits(["error"]);
const $attrs = useAttrs();
const newAttrs = computed<CommonObj>(() => {
  const { to, src, preview }=props;
  if (to || $attrs.onClick || !src || !preview) return defaultImageAttrs;
  return { ...defaultImageAttrs, previewSrcList: [src] };
});

// 处理点击图片
function handleClick(e: any) {
  const { to, stop } = props;
  to && router.push(to) 
  if (stop) e.stopImmediatePropagation();
}
</script>

<style lang="scss" scoped>
.base-img {
  display: block; //去除inline-block的间隙
  height: 120px;
  width: 120px;
  border-radius: $radius-main;
  &.round {
    border-radius: 50%;
  }
  &.to {
    cursor: pointer;
  }
  &.empty {
    color: $color-text-light;
    font-size: 12px;
    background: $color-bg-lighter;
  }
  .err-box {
    height: 100%;
    width: 100%;
    color: $color-text-light;
    background: $color-bg-lighter;
    .tips {
      margin-top: $gap-qtr;
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
