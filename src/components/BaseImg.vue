<template>
  <el-image
    @click="handleClick"
    class="base-img"
    :class="{ round, to: !!to, empty: !src }"
    :src="src || emptyImg"
    :fit="fit"
    :style="newStyle"
    :initialIndex="initialIndex"
    v-bind="previewAttrs"
    preview-teleported
    hide-on-click-modal
  >
    <template #placeholder>
      <div class="err-box f-c-c-c">
        <BaseIcon class="rotate" :size="sizeMap[sizeType]" name="Loading" />
        <span class="tips">{{ loadTips }}</span>
      </div>
    </template>
    <template #error>
      {{ emits("error") }}
      <el-image class="base-img" :class="{ round }" :src="errImgSrc" :fit="fit" preview-teleported v-if="errImgSrc" />
      <div class="err-box f-c-c-c" v-else>
        <BaseIcon :size="sizeMap[sizeType]" name="Picture"></BaseIcon>
        <span class="tips" v-if="errTips">{{ errTips }}</span>
      </div>
    </template>
  </el-image>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed } from "vue";
import { useRouter } from "vue-router";
import { toCssVal } from "@/components/_utils";
import { typeOf } from "@/components/_utils";
import { TagType } from "@/components/BaseTag.vue";
import { CommonObj, FetchType, FinallyNext } from "@/vite-env";
import emptyImg from "@/assets/images/default/img.png";
export type TagSize = "large" | "default" | "small" | "";
export type ImgFitType = "" | "fill" | "contain" | "cover" | "none" | "scale-down";
export interface BarAttrs {
  text: string;
  attrs?: {
    type?: TagType;
  };
}
const sizeMap: CommonObj = {
  large: 26,
  default: 22,
  small: 18,
};
const router = useRouter();
const props = withDefaults(
  defineProps<{
    size?: number | string;
    sizeType?: "large" | "default" | "small";
    width?: number | string;
    height?: number | string;
    src?: string;
    fit?: ImgFitType;
    round?: boolean;
    to?: string | CommonObj;
    initialIndex?: number;
    zoomRate?: number;
    stopPropagation?: boolean; //点击图片时，是否阻止冒泡
    preview?: boolean;
    loadTips?: string;
    errTips?: string;
    errImgSrc?: string;
  }>(),
  {
    fit: "cover",
    sizeType: "default",
    loadTips: "玩命加载中…",
    errTips: "加载失败",
    preview: (props: CommonObj) => props.to === undefined,
  }
);
const emits = defineEmits(["click", "error"]);
const previewAttrs = computed<CommonObj>(() => (props.src && props.preview ? { previewSrcList: [props.src] } : {}));
const newStyle = computed(() => {
  return {
    height: toCssVal(props.size || props.height),
    width: toCssVal(props.size || props.width),
  };
});
//处理点击图片
function handleClick(e: any) {
  const { preview, to, stopPropagation } = props;
  to ? router.push(to) : emits("click");
  if (stopPropagation) e.stopImmediatePropagation();
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
