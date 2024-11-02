<template>
  <BaseImg class="base-avatar" loadTips="加载中…" :src="src || avatarMap[gender] || avatarImg" :preview="!!src" />
</template>

<script lang="ts" setup>
import avatarImg from "@/assets/images/default/avatar.png";
import avatarManImg from "@/assets/images/default/avatar-man.png";
import avatarWomanImg from "@/assets/images/default/avatar-woman.png";

export type GenderType = 0 | 1;

const avatarMap = {
  1: avatarManImg,
  2: avatarWomanImg,
};
const props = withDefaults(
  defineProps<{
    src?: string;
    gender?: GenderType; //性别
  }>(),
  {}
);
</script>

<style lang="scss" scoped>
.base-avatar {
  height: 60px;
  width: 60px;
  border-radius: $radius-main;
}
</style>
