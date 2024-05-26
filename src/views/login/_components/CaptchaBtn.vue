<template>
  <el-button @click="handleClick" class="captcha-btn" :class="{ 'has-send': hasSend }" type="primary">
    <template v-if="hasSend">已发送({{ currSecond }})</template>
    <template v-else>发送验证码</template>
  </el-button>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { ElMessage } from "element-plus";
import { CommonObj, SetInterval } from "@/vite-env";
let seconds = 5;
const currSecond = ref(seconds);
const hasSend = ref(false);
let timer: SetInterval = null;
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
function handleClick(params: type) {
  if (hasSend.value) {
    ElMessage.warning("验证码已发送，请稍后再试");
  } else {
    hasSend.value = true;
    timer = setInterval(() => {
      currSecond.value -= 1;
      if (currSecond.value < 1) {
        hasSend.value = false;
        currSecond.value = seconds;
        clearInterval(timer);
      }
    }, 1000);
    ElMessage.success("验证码已发送，请注意查收");
  }
}
</script>
<style lang="scss" scoped>
.captcha-btn.has-send {
  // &:hover {
  //   color: $color-text-light !important;
  // }
}
</style>
