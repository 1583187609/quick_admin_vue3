<!-- summary
目标：定位触底分页加载、虚拟列表
-->
<template>
  <el-scrollbar @mousewheel.passive="handleMousewheel" class="load-more" ref="boxRef">
    <div class="no-more-tips top f-c-c" :class="{ show: !topHasMore && isReachTop }">
      {{ noMoreTips }}
    </div>
    <div class="space top" :style="`height: ${toCssVal(paddingTop)};`"></div>
    <div class="f-c-c load-tips" v-if="loading && !isToBottom">
      <el-icon class="rotate">
        <Loading />
      </el-icon>
      <span class="text">{{ loadTips }}</span>
    </div>
    <slot><BaseEmpty :tips="emptyTips" /></slot>
    <div :style="`height: ${toCssVal(paddingBottom)};`"></div>
    <div class="f-c-c load-tips" v-if="loading && isToBottom">
      <el-icon class="rotate">
        <Loading />
      </el-icon>
      <span class="text">{{ loadTips }}</span>
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { StrNum, SetTimeout } from "@/vite-env";
import { toCssVal } from "@/core/utils";
import { Loading } from "@element-plus/icons-vue";

let timeout: SetTimeout = null;
const noMoreTipsDuration = 2000;
const props = withDefaults(
  defineProps<{
    topDistance?: number; //距离顶部多少距离时触发触顶事件
    bottomDistance?: number; //距离底部多少距离时触发触底事件
    loading?: boolean; //是否在加载中
    paddingTop?: StrNum; //距离盒子顶部的padding，只有出现滚动条时，设置此值才有意义
    paddingBottom?: StrNum; //距离盒子底部的padding，只有出现滚动条时，设置此值才有意义
    debounceDelay?: number; //防抖延迟时间，单位毫秒
    noMoreTips?: string; //没有更多文字提示
    topHasMore?: boolean; //顶部是否还有更多
    loadTips?: string; //加载文字提示
    emptyTips?: string; //空状态提示文字
  }>(),
  {
    topDistance: 150,
    bottomDistance: 150,
    paddingTop: 0,
    paddingBottom: 0,
    debounceDelay: 300,
    topHasMore: true,
    noMoreTips: "没有更多啦~",
    loadTips: "玩命加载中…",
    emptyTips: "换个姿势搜搜看~",
  }
);
const $emit = defineEmits(["reachTop", "reachBottom"]);
const isToBottom = ref(false);
const hasScroll = ref(false); //是否出现了滚动条
const boxRef = ref<any>(null);
const isReachTop = ref(false);
const isReachBottom = ref(false);
onMounted(() => {
  if (!boxRef?.value?.wrapRef) return;
  const { scrollHeight, clientHeight } = boxRef.value.wrapRef;
  hasScroll.value = scrollHeight > clientHeight;
});
function handleMousewheel(e: any) {
  if (!boxRef?.value?.wrapRef) return;
  const { scrollTop, scrollHeight, clientHeight } = boxRef.value.wrapRef;
  if (scrollHeight <= clientHeight) return; //未出现滚动条
  const { deltaY } = e;
  isToBottom.value = deltaY > 0; // 是否是向下滚动
  const { topDistance, bottomDistance, debounceDelay } = props;
  if (isToBottom.value) {
    //加1是因为el-scrollbar 有 1px 像素误差，不然触发不了触底事件
    if (scrollTop + clientHeight + bottomDistance + 1 >= scrollHeight) {
      if (timeout) clearTimeout(timeout);
      const canExe = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, debounceDelay);
      if (canExe) {
        // console.log("触底------");
        $emit("reachBottom", e);
        isReachBottom.value = true;
        setTimeout(() => {
          isReachBottom.value = false;
        }, noMoreTipsDuration);
      }
    }
    return;
  }
  if (scrollTop <= topDistance) {
    if (timeout) clearTimeout(timeout);
    const canExe = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, debounceDelay);
    if (canExe) {
      // console.log("触顶------");
      $emit("reachTop", e);
      isReachTop.value = true;
      setTimeout(() => {
        isReachTop.value = false;
      }, noMoreTipsDuration);
    }
  }
}
defineExpose<any>({
  //滚动到底部
  scrollToBottom() {
    const { scrollTop, scrollHeight, clientHeight } = boxRef.value.wrapRef;
    if (scrollHeight <= clientHeight) return; //未出现滚动条
    boxRef.value.wrapRef.scrollTo(0, scrollHeight);
  },
});
</script>
<style lang="scss" scoped>
.load-more {
  position: relative;
  // scroll-behavior: smooth;
}
.space {
  // &.top {
  //   margin-top: 40px;
  // }
}
.no-more-tips {
  position: absolute;
  width: 100%;
  left: 0;
  top: -40px;
  height: 40px;
  z-index: 10;
  color: $color-warning;
  background: #fdf6ec;
  transition: top 0.65s;
  &.show {
    top: 0;
  }
}
.load-tips {
  padding: $gap 0;
  text-align: center;
  .text {
    margin-left: $gap-half;
    color: $color-text-light;
  }
}
</style>
