<template>
  <BaseForm v-model="modelData" style="width: 450px" :fields="fields" :fetch="PostMockUser" submitText="注册" />
</template>
<script lang="ts" setup>
import { PostMockUser } from "@/api-mock";
import { CommonObj } from "@/core/_types";
import { reactive } from "vue";

const modelData = reactive<CommonObj>({});
const fields = [
  {
    tpl: "T_Phone",
    prop: "pheon",
    label: "电话",
    required: true,
  },
  {
    tpl: "T_Password",
    prop: "password",
    label: "密码",
    required: true,
    attrs: { type: "password" },
  },
  {
    tpl: "T_Password",
    prop: "confirm_psd",
    label: "确认密码",
    required: true,
    rules: [{ validator: checkConfirmPsd, trigger: "blur" }],
    attrs: { type: "password" },
  },
];
//校验两次输入的密码是否一致
function checkConfirmPsd(rule: any, value: any, callback: any) {
  if (value !== modelData.password) {
    callback(new Error("确认密码和密码需要保持一致"));
  } else {
    callback();
  }
}
</script>
<style lang="scss" scoped></style>
