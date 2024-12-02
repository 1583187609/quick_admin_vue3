<!-- 页面-简介 -->
<template>
  <div class="layout-style f-sb-fs-w">
    <el-tooltip :content="item.name" v-bind="tooltipAttrs" v-for="(item, key) in layoutMap" :key="key">
      <div class="item" @click="handleSelected(key)" :class="{ active: type == key, [item.class]: true, [key]: true }">
        <template v-if="key === 'columns'">
          <div class="menu box f-0"></div>
          <div class="side box f-0"></div>
          <div class="f-fs-s-c f-1">
            <div class="side box f-0 right">1</div>
            <div class="main box f-1"></div>
          </div>
        </template>
        <template v-else-if="key === 'classics'">
          <div class="menu box f-0"></div>
          <div class="f-sb-s f-1">
            <div class="side box f-0"></div>
            <div class="main box f-1"></div>
          </div>
        </template>
        <template v-else-if="key === 'vertical'">
          <div class="menu box f-0"></div>
          <div class="main box f-1"></div>
        </template>
        <template v-else-if="key === 'horizontal'">
          <div class="menu box f-0"></div>
          <div class="main box f-1"></div>
        </template>
      </div>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
import { LayoutType } from "@/store/modules/set";
import store, { useBaseStore, useSetStore } from "@/store";
const layoutMap = {
  columns: {
    name: "分栏",
    class: "f-sb-s",
  },
  classics: {
    name: "经典",
    class: "f-fs-s-c",
  },
  vertical: {
    name: "纵向",
    class: "f-sb-s",
  },
  horizontal: {
    name: "横向",
    class: "f-fs-s-c",
  },
};
const tooltipAttrs = {
  placement: "top",
  showAfter: 200,
};
const props = withDefaults(
  defineProps<{
    modelValue?: LayoutType;
  }>(),
  {
    modelValue: "vertical",
  }
);
const $emit = defineEmits(["update:modelValue"]);
const setStore = useSetStore();
const type = computed({
  get() {
    return props.modelValue;
  },
  set(val: LayoutType) {
    $emit("update:modelValue", val);
  },
});
function handleSelected(val: LayoutType) {
  type.value = val;
  setStore.updateSet("layout", { type: val });
}
</script>
<style lang="scss" scoped>
@use "sass:color";
$ratio: 0.06;
$height: $header-height * $ratio;
$width: $asider-width * $ratio;
$nav-width: $main-menu-width * $ratio;
.layout-style {
  .item {
    padding: $gap-qtr;
    margin: 0 $gap-half;
    width: 1920px * $ratio;
    height: 1080px * $ratio;
    cursor: pointer;
    border-radius: $radius-light;
    border: 2px solid transparent;
    @include shadow-main();
    &:nth-child(1),
    &:nth-child(2) {
      margin-bottom: 12px;
    }
    .box {
      &.menu {
        background: $color-primary;
      }
      &.side {
        background: color.mix($color-primary, #ffffff, 65%);
      }
      &.main {
        border-radius: 2px;
        background: color.mix($color-primary, #ffffff, 15%);
      }
    }
    &.columns {
      .menu {
        width: $nav-width;
      }
      .side {
        width: 16%;
        &.right {
          width: 100%;
          height: 20%;
        }
      }
    }
    &.classics {
      .menu {
        height: $height;
      }
      .side {
        flex-basis: $width;
        background: $color-primary;
      }
    }
    &.vertical {
      .menu {
        width: $width;
        height: 100%;
      }
      .side {
        flex-basis: $height;
      }
    }
    &.horizontal {
      .menu {
        height: $height;
      }
    }
    &.active {
      border: 2px solid $color-primary;
    }
  }
}
</style>
