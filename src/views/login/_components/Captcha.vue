<template>
  <div class="f-sb-fs">
    <el-form-item class="mb-0" :prop="prop">
      <el-input class="f-1" :maxlength="4" placeholder="请输入验证码" v-model="newVal" clearable />
    </el-form-item>
    <div @click="getCaptcha" class="captcha ml-16 f-0 f-c-c">
      {{ captchaCode }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { GetUserCaptcha } from "@/api-mock";
const props = withDefaults(
  defineProps<{
    prop: string;
    modelValue?: string;
  }>(),
  {}
);
const captchaCode = ref<string>("0000");
const $emit = defineEmits(["update:modelValue"]);
getCaptcha();
const newVal = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    $emit("update:modelValue", val);
  },
});
function getCaptcha() {
  GetUserCaptcha().then((res: any) => {
    captchaCode.value = res;
  });
}
</script>
<style lang="scss" scoped>
//渐变色文字
//渐变色文字
@mixin text-gradient() {
  color: $color-primary;
  background-image: -webkit-linear-gradient(135deg, $color-gradient-dark-light 0%, $color-gradient-dark-dark 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.captcha {
  @include text-gradient();
  cursor: pointer;
  width: 5em;
  text-align: center;
  margin-left: $gap;
  font-style: italic;
  font-size: 24px;
  font-weight: 500;
  border: $border-main;
  border-radius: $radius-main;
  letter-spacing: 0.4em;
  user-select: none;
}
</style>
