<!-- 面试资料 -->
<template>
  <div class="f-sb-s q-page-view">
    <ul class="f-0 menus">
      <li @click="handleMenuChange(ind)" class="menu f-fs-c q-line-1" :class="{ active: currMenu === ind }" v-for="(item, ind) in menus" :key="ind">
        {{ item.label }}
      </li>
    </ul>
    <div class="f-1 topics f-fs-s-c">
      <h2 class="f-c-c head">{{ menus[currMenu]?.label + `【${menus[currMenu]?.topics.length}】` ?? "无" }}</h2>
      <div class="body hover-show-scroll">
        <InfoSection v-bind="item" v-for="(item, ind) in menus[currMenu]?.topics" :index="ind" :key="ind" />
        <BaseEmpty v-if="!menus[currMenu]?.topics?.length" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
import InfoSection from "./_components/InfoSection.vue";
import data from "./_data";
const menus: CommonObj[] = data;

const currMenu = ref(0);
function handleMenuChange(ind: number) {
  currMenu.value = ind;
}
</script>
<style lang="scss" scoped>
.menus {
  height: 100%;
  width: 16em;
  background: #fff;
  border-radius: $radius-main;
  margin-right: $gap;
  @include shadow-main();
  .menu {
    cursor: pointer;
    padding: $gap-half $gap;
    height: $height-light;
    &.active {
      background: $color-bg-main;
    }
    &:hover {
      background: $color-bg-lighter;
    }
  }
}
.topics {
  .head {
    margin-bottom: $gap;
  }
  .body {
    overflow: auto;
    padding-bottom: 20vh;
  }
}
</style>
