<!-- summary 基础用法
  提供音频逻辑方案，处理通用业务逻辑，并暴露相关api，支持覆盖
  待完善
-->
<template>
  <div class="f-sb-fs">
    <BaseAudio class="f-1" :src="src" />
    <BaseAudio class="f-1" :src="src" controls />
    <BaseAudio class="f-1 custom" :src="src">
      <BaseIcon size="1.4em" class="play-icon" @click="playing = !playing" :name="playing ? 'VideoPause' : 'VideoPlay'" />
      自定义控制面板
      <BaseIcon @click="isMute = !isMute" size="1.4em" :name="isMute ? 'Mute' : 'Microphone'" />
    </BaseAudio>
  </div>
</template>
<script lang="ts" setup>
const src = "http://files.xiangqinjiaoapp.com/user/voice/2022-10-26/sKHFUKQiaOeZwgtwUjh5rq3FNoIKQ90y.aac";
const playing = ref(false);
const isMute = ref(false);
</script>
<style lang="scss" scoped>
.base-audio {
  &:not(:last-child) {
    margin-right: $gap-two;
  }
}
.custom {
  padding: $gap-half $gap;
  border-radius: 40px;
  background: $color-bg-main;
}
</style>
