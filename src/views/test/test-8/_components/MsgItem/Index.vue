<template>
  <div class="message f-fs-fs" :class="position">
    <template v-if="data.msgType === 'TIMCustomElem'">
      <CustomMsg :data="data" :position="position" />
    </template>
    <template v-else>
      <BaseAvatar :src="userInfo.avatar" :gender="userInfo.gender" size="40" class="avatar f-0" round />
      <div class="msg-box">
        <template v-if="data.msgType === 'TIMTextElem'">
          {{ data.msgContent.Text }}
        </template>
        <ImgMsg :data="data" v-else-if="data.msgType === 'TIMImageElem'" />
        <AudioMsg :position="position" :data="data" v-else-if="data.msgType === 'TIMSoundElem'" />
        <VideoMsg :data="data" v-else-if="data.msgType === 'TIMVideoFileElem'" />
        <!-- <template :data="data" v-else-if="data.msgType === 'TIMCustomElem'">{{
        data.msgContent.Desc
      }}</template> -->
        <span class="err-tips" v-else>暂未处理此种类型{{ data.msgType }}</span>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { BtnName } from "@/core/BaseBtn/_types";
import { CommonObj, NextHintCb, StrNum } from "@/vite-env";
import CustomMsg from "./CustomMsg.vue";
import AudioMsg from "./AudioMsg.vue";
import VideoMsg from "./VideoMsg.vue";
import ImgMsg from "./ImgMsg.vue";
export type MsgPosition = "left" | "right";
const props = withDefaults(
  defineProps<{
    data: CommonObj;
    userInfo: CommonObj;
    position?: MsgPosition;
  }>(),
  {}
);
</script>
<style lang="scss" scoped>
.message {
  .avatar {
  }
  .msg-box {
    max-width: 70%;
    min-height: 36px;
    position: relative;
    margin-top: 4px;
    background: #fff;
    padding: $gap-half $gap;
    border-radius: $radius-main;
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.24));
    // box-shadow: $shadow-heavy;
    .time {
      position: absolute;
      bottom: -18px;
      font-size: 12px;
      color: $color-text-light;
    }
  }
  &.left {
    .avatar {
      margin-right: $gap;
    }
    .msg-box {
      $white: #f5f5f5;
      background: $white;
      &::before {
        content: "";
        display: block;
        height: 14px;
        width: 14px;
        background: $white;
        position: absolute;
        left: -4px; //-7px能跟左侧对齐
        top: 10px; //-6px能跟顶部对齐
        transform: rotate(45deg);
      }
      .time {
        left: $gap-half;
      }
    }
  }
  &.center {
    text-align: center;
  }
  &.right {
    flex-direction: row-reverse;
    .avatar {
      margin-left: $gap;
    }
    .msg-box {
      color: #fff;
      background: $color-primary;
      &::after {
        content: "";
        display: block;
        height: 14px;
        width: 14px;
        background: $color-primary;
        position: absolute;
        right: -4px; //-7px能跟右侧对齐
        top: 10px; //-6px能跟顶部对齐
        transform: rotate(45deg);
      }
      .time {
        right: $gap-half;
      }
    }
  }
}
.err-tips {
  color: $color-danger;
}
</style>
