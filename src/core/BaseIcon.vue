<!-- summary
设计这个组件的初衷是为了方便快速开发（占位，省去引入图标再使用的时间）。
-->
<template>
  <el-icon class="base-icon" @click="handleClick" :class="{ pointer: !!to || !!$attrs.onClick }" :size="size">
    <component :is="Icons[name] ?? Icons[defaultIconName]" />
  </el-icon>
</template>

<script lang="ts" setup>
import * as Icons from "@element-plus/icons-vue";
import { defaultIconName, typeOf } from "@/core/_utils";
import { CommonObj, RouteTo, StrNum } from "./_types";
import { useAttrs } from "vue";
import { useRouter } from "vue-router";

export type IconNames = keyof typeof Icons;

const router = useRouter();
const props = withDefaults(
  defineProps<{
    name?: IconNames;
    size?: StrNum;
    to?: RouteTo | ((data: CommonObj) => RouteTo);
    data?: any; // to 的函数要传递的参数
  }>(),
  {
    name: defaultIconName,
    size: "1em",
  }
);
const $attrs = useAttrs();
// 跳转页面或触发点击事件
function handleClick(e) {
  const { to, data } = props;
  if (!to) return;
  if (typeOf(to) === "Function") return router.push((to as Function)(data));
  return router.push(to as RouteTo);
}
</script>
<style lang="scss" scope>
.base-icon {
  &.pointer {
    cursor: pointer;
  }
}
</style>
