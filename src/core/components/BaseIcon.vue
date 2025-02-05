<!-- summary
目标：占位，方便快速开发。
-->
<template>
  <el-icon class="base-icon" @click="handleClick" :class="{ pointer: !!to || !!$attrs.onClick }" :size="size">
    <component :is="Icons[name] ?? Icons[defaultIconName]" />
  </el-icon>
</template>

<script lang="ts" setup>
import * as Icons from "@element-plus/icons-vue";
import { defaultIconName } from "@/core/config";
import { RouteTo, StrNum } from "@/core/_types";
import { useRouter } from "vue-router";

export type IconNames = keyof typeof Icons;

const router = useRouter();
const props = withDefaults(
  defineProps<{
    name?: IconNames;
    size?: StrNum;
    to?: RouteTo;
  }>(),
  {
    name: defaultIconName,
    size: "1em",
  }
);
const $attrs = useAttrs();
// 跳转页面或触发点击事件
function handleClick(e) {
  const { to } = props;
  if (!to) return;
  return router.push(to as RouteTo);
}
</script>
<style lang="scss" scope>
.base-icon {
  &.pointer {
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
  }
}
</style>
