<!-- @click="handleClick" -->
<template>
  <BaseImg
    class="base-avatar"
    :class="{ round }"
    loadTips="加载中…"
    :style="style"
    :to="to"
    :src="src || avatarMap[gender] || avatarImg"
    :preview="!!src"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import avatarImg from "@/assets/images/default/avatar.png";
import avatarManImg from "@/assets/images/default/avatar-man.png";
import avatarWomanImg from "@/assets/images/default/avatar-woman.png";
import { toCssVal } from "@/components/_utils";
import { CommonObj } from "@/vite-env";
const avatarMap = {
  1: avatarManImg,
  2: avatarWomanImg,
};
const props = withDefaults(
  defineProps<{
    size?: number | string;
    src?: string;
    round?: boolean;
    to?: string | CommonObj;
    gender?: 0 | 1; //性别
  }>(),
  {
    // size: 60,
  }
);
const router = useRouter();
const style = reactive({
  // cursor: props.to ? "pointer" : "default",
  height: toCssVal(props.size),
  width: toCssVal(props.size),
});
// function handleClick() {
//   props.to && router.push(props.to);
// }
</script>

<style lang="scss" scoped>
.base-avatar {
  height: 60px;
  width: 60px;
  border-radius: $radius-main;
}

.round {
  border-radius: 50%;
}
</style>
