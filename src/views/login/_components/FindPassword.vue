<template>
  <BaseForm style="width: 450px" v-model="model" :fields="fields">
    <template #captcha>
      <Captcha v-model="model.captcha" prop="captcha" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import Captcha from "./Captcha.vue";
import { CommonObj } from "@/vite-env";

// import { ref, reactive, watch, computed } from "vue";
// const props = withDefaults(
//   defineProps<{
//     data?: CommonObj;
//   }>(),
//   {
//     data: () => ({}),
//   }
// );
let model = reactive<CommonObj>({});
const fields = [
  { prop: "pheon", label: "电话", valid: "phone", required: true },
  {
    prop: "captcha",
    label: "验证码",
    required: true,
    // type: "custom",
    attrs: {
      maxlength: 4,
    },
  },
];
</script>
<style lang="scss" scoped></style>
