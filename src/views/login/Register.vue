<template>
  <BaseForm v-model="model" style="width: 450px" :fields="fields" :fetch="PostUserRegister" submitText="注册" />
</template>
<script lang="ts" setup>
import { PostUserRegister } from "@/api-mock";
import { CommonObj } from "@/vite-env";
import { reactive } from "vue";

const model = reactive<CommonObj>({});
const fields = [
  {
    prop: "pheon",
    label: "电话",
    required: true,
    extraAttrs: {
      valid: "phone",
    },
  },
  {
    prop: "psd",
    label: "密码",
    required: true,
    attrs: { type: "password" },
    extraAttrs: {
      valid: "password",
    },
  },
  {
    prop: "confirm_psd",
    label: "确认密码",
    required: true,
    rules: [{ validator: checkConfirmPsd, trigger: "blur" }],
    attrs: { type: "password" },
    extraAttrs: {
      valid: "password",
    },
  },
];
//校验两次输入的密码是否一致
function checkConfirmPsd(rule: any, value: any, callback: any) {
  if (value !== model.psd) {
    callback(new Error("确认密码和密码需要保持一致"));
  } else {
    callback();
  }
}
</script>
<style lang="scss" scoped></style>
