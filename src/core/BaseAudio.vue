<!-- 语音播放组件面板 -->
<template>
  <div class="base-audio f-sb-c" :class="{ default: !$slots.default }">
    <slot
      :playing="playing"
      :muted="muted"
      :currentTime="audioRef?.currentTime || 0"
      :duration="audioRef?.duration || 0"
      :timeStr="timeStr"
      :progress="progress"
      :play="play"
      :pause="pause"
      :togglePlaying="togglePlaying"
      :toggleMuted="toggleMuted"
      :formatTime="formatTime"
    >
      <el-icon @click="togglePlaying" size="20" class="f-0 btn" :class="{ disabled }">
        <VideoPause v-if="playing" />
        <VideoPlay v-else />
      </el-icon>

      <time class="f-0 ml-h">{{ timeStr }}</time>
      <el-slider
        @change="handleSliderChange"
        @input="handleSliderInput"
        v-model="progress"
        :show-tooltip="false"
        :disabled="disabled"
        class="f-1 ml-o"
        v-if="showProgress"
      />
      <el-tooltip :content="muted ? '取消静音' : '静音'" :show-after="400" :disabled="disabled">
        <el-icon @click="toggleMuted" size="20" class="btn f-0 ml-h" :class="{ disabled }">
          <Mute v-if="muted" />
          <Microphone v-else />
        </el-icon>
      </el-tooltip>
    </slot>
    <audio @canplay="handleCanPlay" @timeupdate="handleTimeupdate" @ended="handleEnded" :muted="muted" controls hidden ref="audioRef" v-if="src">
      <source :src="src" type="audio/mpeg" />
      <source :src="src" type="audio/ogg" />
      您的浏览器不支持音频播放
    </audio>
  </div>
</template>
<script lang="ts" setup>
/**
 * 参考地址：
 * https://blog.csdn.net/lhz_19/article/details/122428176
 * https://blog.csdn.net/lhz_19/article/details/122428176
 */
import { VideoPause, VideoPlay, Mute, Microphone } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    src?: string;
    showProgress?: boolean;
    default?: boolean;
  }>(),
  {
    default: true,
    showProgress: true,
    // src: "http://files.xiangqinjiaoapp.com/user/voice/2022-10-26/sKHFUKQiaOeZwgtwUjh5rq3FNoIKQ90y.aac",
  }
);
const audioRef = ref<any>(null);
const playing = ref(false);
const progress = ref(0);
const muted = ref(false);
const timeStr = ref("00:00/00:00");
const disabled = ref(true);
//当音频资源加载完毕，可以播放时的处理
function handleCanPlay(e: any) {
  const { currentTime, duration } = audioRef.value;
  timeStr.value = `${formatTime(currentTime)}/${formatTime(duration)}`;
  disabled.value = !duration;
}
// 更新进度条与当前播放时间
function handleTimeupdate(e: any) {
  const { currentTime, duration } = audioRef.value;
  timeStr.value = `${formatTime(currentTime)}/${formatTime(duration)}`;
  progress.value = (currentTime / duration) * 100;
}
//播放结束时
function handleEnded() {
  playing.value = false;
  timeStr.value = `00:00/${formatTime(audioRef.value.duration)}`;
}
//滑块拖动停止时
function handleSliderChange(val: number) {
  const { duration } = audioRef.value;
  audioRef.value.currentTime = duration * ((val as number) / 100);
  play();
}
//滑块拖动时
function handleSliderInput(val: number) {
  const { duration } = audioRef.value;
  const currentTime = duration * ((val as number) / 100);
  timeStr.value = `${formatTime(currentTime)}/${formatTime(duration)}`;
  pause();
}
//切换播放状态
function togglePlaying() {
  playing.value ? pause() : play();
}
//切换静音
function toggleMuted() {
  if (disabled.value) return;
  muted.value = !muted.value;
}
//格式化时间
function formatTime(time: number) {
  time = Math.round(time);
  const m = Math.floor(time / 60);
  const s = time % 60;
  const arr = [m, s].map(it => (it < 10 ? "0" : "") + it);
  return arr.join(":");
}
//播放
function play() {
  if (disabled.value) return;
  playing.value = true;
  audioRef.value.play();
}
//暂停
function pause() {
  if (disabled.value) return;
  playing.value = false;
  audioRef.value.pause();
}
//暴露方法名、变量等，后续可能会用到
defineExpose<any>({
  playing,
  progress,
  timeStr,
  muted,
  play,
  pause,
  audioCtx: audioRef,
  toggleMuted,
  formatTime,
});
</script>
<style lang="scss" scoped>
.base-audio {
  &.default {
    width: 100%;
    border-radius: 40px;
    height: 28px;
    padding: 0 12px;
    background: #eee;
    .btn {
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
      &.disabled {
        cursor: not-allowed;
        &:hover {
          color: $color-text-main;
        }
      }
    }
  }
}
</style>
