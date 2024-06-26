<!-- 页面-简介 -->
<template>
  <BaseImg class="img-msg" :src="imgInfo.URL" width="auto" height="auto" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, NextHintCb, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data: CommonObj;
  }>(),
  {}
);
const imgInfo = computed<CommonObj>(() => {
  const { URL, Height, Width } = props.data.msgContent.ImageInfoArray[1];
  return {
    URL,
  };
});
</script>
<style lang="scss" name="" scoped>
.img-msg {
  // max-width: 50%;
  // max-height: 400px;
}
</style>
