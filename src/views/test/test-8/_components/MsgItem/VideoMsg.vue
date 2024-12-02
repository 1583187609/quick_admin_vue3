<!-- 组件 - 视频组件 -->
<template>
  <BaseVideo class="video-msg" :src="data.msgContent.VideoUrl" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, NextHintCb, StrNum } from "@/core/_types";
// import { MsgPosition } from "./Index.vue";
const props = withDefaults(
  defineProps<{
    data: CommonObj;
    // position: MsgPosition;
  }>(),
  {}
);
// const { ThumbHeight, ThumbWidth } = props.data.msgContent;
// const styleSize = {
//   height: "",
//   width: "",
// };
</script>
<style lang="scss" scoped></style>
