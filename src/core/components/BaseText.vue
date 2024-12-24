<!-- summary
目标：对文本内容进行展示，多行时自动省略，并支持弹窗展示全部内容，同时自带样式。
-->
<template>
  <div class="base-text" :class="{ [`q-line-${maxLine}`]: true, over: isOver }" @click="handleClick" ref="baseTextRef">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from "vue";
import { CommonObj, OpenPopupInject, PopupType, StrNum } from "@/core/_types";
import { getIsOver } from "@/core/utils";

const openPopup = inject<OpenPopupInject>("openPopup");
const defaultPopupAttrs = {
  title: "详情",
  width: "500px",
};
const props = withDefaults(
  defineProps<{
    maxLine?: StrNum; //最多显示几行，可选值：1~5 必须为整数
    popupType?: PopupType;
    popupAttrs?: CommonObj;
  }>(),
  {
    maxLine: 2,
  }
);
const $slots = defineSlots<{
  default: () => void; // 默认插槽
}>();
const baseTextRef = ref<HTMLDivElement | null>(null);
const isOver = ref(false);
onMounted(() => {
  isOver.value = getIsOver(baseTextRef.value);
});
function handleClick(e: any) {
  if (!isOver.value) return;
  openPopup({ ...defaultPopupAttrs, ...props.popupAttrs }, e.target.innerText, props.popupType);
}
</script>
<style lang="scss" scoped>
.base-text {
  &.over {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
