<template>
  <BaseForm style="width: 450px" v-model="modelData" :fields="fields">
    <template #captcha>
      <Captcha v-model="modelData.captcha" prop="captcha" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import Captcha from "./_components/Captcha.vue";
import { CommonObj } from "@/vite-env";

const modelData = reactive<CommonObj>({});
const fields = [
  {
    prop: "pheon",
    label: "电话",
    required: true,
    quickAttrs: {
      rulesType: "phone",
    },
  },
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
