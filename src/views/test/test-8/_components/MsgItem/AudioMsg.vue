<!--组件 - 音频组件 -->
<template>
  <BaseAudio
    class="audio-msg"
    :class="position"
    :src="data.msgContent.Url"
    :showProgress="false"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, NextHintCb, StrNum } from "@/vite-env";
import { MsgPosition } from "@/views/chat/records/_components/MsgItem/Index.vue";
const props = withDefaults(
  defineProps<{
    data: CommonObj;
    position: MsgPosition;
  }>(),
  {}
);
</script>
<style lang="scss" name="" scoped>
.audio-msg {
  &.right {
    color: $color-primary;
    background: #fff;
  }
}
</style>
