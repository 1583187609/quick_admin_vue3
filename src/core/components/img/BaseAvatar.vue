<!-- summary
目标：定位为头像。用作占位，实现快速开发，兼顾细节处理，性别默认头像等，同时考虑扩展性，可能会增加会员标识、用户类型标识等。 
-->
<template>
  <BaseImg
    class="base-avatar"
    loadTips="加载中…"
    :data-circle="circle"
    :src="src || (avatarMap[gender] ?? avatarImg)"
    :preview="!!src"
    :size="size"
    :circle="circle"
  />
</template>

<script lang="ts" setup>
import avatarImg from "@/assets/images/default/avatar.png";
import avatarManImg from "@/assets/images/default/avatar-man.png";
import avatarWomanImg from "@/assets/images/default/avatar-woman.png";

export type GenderType = 0 | 1;

const avatarMap: Record<number, string> = {
  1: avatarManImg,
  2: avatarWomanImg,
};
const props = withDefaults(
  defineProps<{
    src?: string;
    gender?: GenderType; // 性别
    circle?: boolean; // 是否圆形
    size?: string | number;
  }>(),
  {
    size: 60,
    gender: 0, // 0未知 1男 2女
  }
);
</script>

<style lang="scss" scoped>
.base-avatar {
  border-radius: $radius-main;
}
</style>
