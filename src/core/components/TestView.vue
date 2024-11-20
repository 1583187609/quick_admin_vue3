<!-- 用于自测的视图容器 -->
<template>
  <div class="test-view f-sb-s">
    <div class="main box f-3">
      <slot>主要内容</slot>
    </div>
    <div class="side box f-2" v-if="$slots.side">
      <slot name="side">辅助内容</slot>
    </div>
    <div class="tips box f-fs-s-c" :class="{ fold: isFold, ['f-1']: !isFold }" v-if="records">
      <!-- <div @click="isFold = !isFold" class="fold-btn"></div> -->
      <template v-for="(item, key) in getTipsMap(records)" :key="key">
        <header class="head f-0">{{ item.title }}</header>
        <ul class="ul f-1 all-hide-scroll">
          <li class="li" v-for="(it, i) in item.list" :key="i">{{ i + 1 }}. {{ it }}</li>
        </ul>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { typeOf } from "@/core/utils";

interface TipsMap {
  [key: string]: {
    title: string;
    list: string[];
  };
}
type TipsType = null | string[] | TipsMap;

const $slots = defineSlots<{
  default: () => void; // 默认插槽
  side: () => void; // 侧边栏插槽
}>();

const props = withDefaults(
  defineProps<{
    records?: TipsType;
  }>(),
  {
    records: null,
  }
);
const isFold = ref(false);

function getTipsMap(records: TipsType): TipsMap | null {
  if (!records) return null;
  if (typeOf(records) === "Array") {
    return {
      remark: {
        title: "备忘录",
        list: records as string[],
      },
    };
  }
  return records as TipsMap;
}
</script>
<style lang="scss" scoped>
.test-view {
  height: 100%;
  width: 100%;
  .box {
    flex-basis: 1px;
    // padding: $gap-half;
    // border: $border-main;
    // border-radius: $radius-main;
    background: #fff;
    &:not(:last-child) {
      margin-right: $gap-half;
    }
  }
  // .main {
  // }
  // .side {
  // }
  .tips {
    flex-basis: 1px;
    &.fold {
      position: relative;
      width: 0;
    }
    .fold-btn {
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      background: $color-primary;
      width: 20px;
      border-radius: $radius-main 0 0 $radius-main;
      height: 80px;
      z-index: 100000;
    }
    .head {
      padding: $gap-half;
      font-size: 16px;
      border-bottom: $border-main;
    }
    .ul {
      padding: $gap-half;
      overflow: auto;
      .li {
        line-height: 1.6;
      }
    }
  }
}
</style>
