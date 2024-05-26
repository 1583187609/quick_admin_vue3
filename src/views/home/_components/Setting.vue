<!-- 页面-简介 -->
<!-- v-drag -->
<template>
  <div class="set-move">
    <img @click="handleOnIcon" class="icon" :src="setDragImg" />
    <!-- <div class="wrap">
      <ul class="list f-fs-fs-w">
        <li
          :class="{ active: actives.includes(ind) }"
          class="item f-c-c"
          @click="handleClick(ind)"
          v-for="(item, ind) in 8"
          :key="ind"
        >
          文
        </li>
      </ul>
      <div class="f-c-c foot">
        <el-button type="primary">恢复默认设置</el-button>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import setDragImg from "@/assets/images/sys/menu-drag.png";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { showMessage } from "@/utils";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const actives = ref<StrNum[]>([1, 3]);
function handleOnIcon() {
  showMessage("别摸我，后续功能正在开发中", "warning");
}
function handleClick(ind: number) {
  const findInd = actives.value.findIndex(i => i === ind);
  if (findInd === -1) {
    actives.value.push(ind);
  } else {
    actives.value.splice(findInd, 1);
  }
}
</script>
<style lang="scss" name="" scoped>
.set-move {
  position: fixed;
  $size: 72px;
  right: $size * -0.45;
  // left: calc(100vw - 40px);
  top: $header-height + $page-tags-height;
  z-index: 100;
  .icon {
    height: $size;
    width: $size;
    border-radius: 50%;
  }
}
.wrap {
  cursor: default;
  border-radius: $radius-main;
  background: #fff;
  @include shadow-main();
  .list {
    width: 284px;
    padding: $gap-half $gap;
    .item {
      cursor: pointer;
      height: 44px;
      width: 44px;
      border-radius: 50%;
      background: #eee;
      color: #999;
      font-size: 18px;
      margin: $gap-qtr 0;
      &:not(:nth-child(5n)) {
        margin-right: $gap-half;
      }
      &.active {
        color: #fff;
        background: $color-primary;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .foot {
    border-top: $border-main;
    padding: $gap-half 0;
  }
}
</style>
