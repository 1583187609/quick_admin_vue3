<!-- 页面-简介 -->
<!-- @submit="handleSubmit" -->
<template>
  <BaseForm
    v-model="modelData"
    :fetch="PostUserLogin"
    :afterSuccess="handleSuccess"
    :afterFail="handleFail"
    submitText="登录"
    :fields="fields"
    style="width: 350px"
  ></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { FormField } from "@/core/components/form/_types";
import { CommonObj, FinallyNext } from "@/vite-env";
import { easyNoteDomain, PostUserLogin } from "../apis";
import { storage } from "@/utils";
const props = withDefaults(
  defineProps<{
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>({
  phone: "18483221111",
  password: "mstx123456",
});
const timestamp = ref(Date.now());
const imgUrl = computed(() => `${easyNoteDomain}/easy-note/tool/captcha?width=100&height=30&background=none&key=${timestamp.value}`);
const fields: FormField[] = [
  { prop: "phone", label: "账号", required: true, quickAttrs: { rulesType: "phone" } },
  { prop: "password", label: "密码", required: true, quickAttrs: { rulesType: "password" } },
  {
    prop: "captcha",
    label: "验证码",
    required: true,
    attrs: {
      maxlength: 4,
      showWordLimit: false,
      slots: {
        append: [
          "img",
          {
            src: imgUrl,
            style: "height:30px;cursor:pointer;",
            onClick() {
              timestamp.value = Date.now();
            },
          },
        ],
      },
    },
  },
];

function handleSuccess(params, next) {
  const { token } = params;
  storage.setItem("token", token);
  props.refreshList?.();
  next();
}
function handleFail() {
  timestamp.value = Date.now();
}
</script>
<style lang="scss" scoped></style>
