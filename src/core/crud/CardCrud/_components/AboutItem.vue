<!-- 组件 - 资料巡查 -->
<template>
  <div class="about-item f-fs-s-c" :class="{ passed: status === 0, rejected: status === 1 }">
    <div class="f-fs-s-c cont-box f-1">
      <div class="f-fs-c head f-0" v-if="row.userData">
        <el-tooltip :show-after="300" :content="row.userData.nickname" :disabled="!row.userData.nickname">
          <span class="mr-a line-1">{{ row.userData.nickname || "-" }}</span>
        </el-tooltip>
        <BaseCopy class="ml-12 f-0" :text="row.userId" />
        <div class="ml-12 mr-12 f-0">{{ row.userData.age || "-" }}岁</div>
        <BaseTag name="Gender" :value="row.userData.gender" class="f-0" pureText />
      </div>
      <div class="title f-sb-b f-0">
        <b class="b">{{ getText("AboutInfo", row.type) }}</b>
        <span class="time-ago">
          <!-- {{ getTimeAgo(row.createdAt) || "-" }} -->
          {{ getTimeAgo(row.updatedAt ? row.updatedAt : row.createdAt) || "-" }}
        </span>
      </div>
      <div class="desc all-hide-scroll f-1" ref="descRef">
        {{ row.content || "-" }}
      </div>
      <div class="bottom-text" :style="{ minHeight: currSize.barHeight + 'px' }" v-bind="bottomTip.attrs" v-if="bottomTip.text">
        {{ bottomTip.text }}
      </div>
    </div>
    <div class="foot-box f-c-c f-0">
      <BaseBtn :name="btn" size="small" round @click="() => $emit('operateBtns', btn)" v-for="(btn, ind) in operateBtns" :key="ind" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { CommonObj } from "@/vite-env";
import { BtnItem } from "@/core/BaseBtn/_types";
import { getTimeAgo } from "@/core/_utils";
import { AuditStatus } from "../Index.vue";
import { getBarObj } from "@/core/crud/CardCrud/_utils";
import { useDict } from "@/hooks";
import { DictName } from "@/dict/_types";
import { operateBtnsEmitName } from "@/core/table";

const { getText } = useDict();
const sizeMap: CommonObj = {
  large: {
    bottom: 0, //4
    height: 36,
    barHeight: 32,
  },
  default: {
    bottom: 0, //2
    height: 26,
    barHeight: 26,
  },
  small: {
    bottom: 0, //0
    height: 22,
    barHeight: 22,
  },
};
const props = withDefaults(
  defineProps<{
    row?: CommonObj;
    sizeType?: "large" | "default" | "small";
    operateBtns?: BtnItem[];
    status?: AuditStatus;
    bottomBar?: string | DictName;
  }>(),
  {
    row: () => ({}),
    sizeType: "default",
    operateBtns: () => [],
  }
);
const $emit = defineEmits([operateBtnsEmitName]);
//是否出现了滚动条
const hasScroll = ref(false);
const descRef = ref();
const moreRef = ref();
const popoverRef = ref();
const currSize = sizeMap[props.sizeType];
//底部提示文字
const bottomTip = computed<any>(() => getBarObj(props.bottomBar));
nextTick(() => {
  getShowScroll();
});
function getShowScroll() {
  const { scrollHeight, clientHeight } = descRef?.value || {};
  hasScroll.value = scrollHeight > clientHeight;
}
</script>
<style lang="scss" scoped>
$foot-height: 36px;
.about-item {
  min-width: 310px;
  height: 50%;
  width: calc(20% - $gap-half);
  transition: all 0.85s;
  &.passed {
    // visibility: hidden;
    // opacity: 0;
  }
  &.rejected {
    // filter: grayscale(1);
  }
  .cont-box {
    position: relative;
    background: #fff;
    border-radius: $radius-main;
    overflow: hidden;
    @include shadow-main();
    &:hover {
      .bottom-text {
        transform: translateY(100%);
      }
    }
    .bottom-text {
      display: block;
      padding: 7px $gap-qtr;
      line-height: 1.2;
      position: absolute;
      bottom: 0;
      height: auto;
      font-size: 12px;
      color: $color-warning;
      background: var(--el-color-warning-light-9);
      width: 100%;
      text-align: center;
      z-index: 1;
      transition: all $transition-time-main;
    }
  }
  .head {
    font-size: 13px;
    padding: $gap-qtr $gap-half;
    background: $color-bg-lighter;
  }
  .title {
    padding: $gap-qtr $gap-half;
    font-size: 14px;
    .time-ago {
      font-size: 12px;
      color: $color-text-light;
    }
  }
  .desc {
    padding: 0 $gap-half $gap-half;
    overflow: auto;
    white-space: pre-wrap;
  }
  .foot-box {
    height: $foot-height;
  }
}
</style>
