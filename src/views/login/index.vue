<!-- 登录页面 -->
<!-- <route lang="yaml">
name: login
meta:
  title: 登录
  constant: true
  layout: false
</route> -->

<template>
  <div class="wrap f-c-c">
    <div class="bounce-in login-box">
      <h1 class="head f-c-c">{{ VITE_APP_NAME }}</h1>
      <BaseForm
        class="body"
        v-model="model"
        size="large"
        :loading="loading"
        :fields="fields"
        @submit="handleSubmit"
        submitText="登录"
        ref="formRef"
      >
        <!-- :fetch="PostUserLogin" -->
        <template #captcha>
          <Captcha v-model="model.captcha" prop="captcha" />
        </template>
      </BaseForm>
      <div class="foot f-sb-c">
        <el-button
          @click="openPopup({ title: '免费注册', direction: 'ltr' }, Register, 'drawer')"
          class="btn"
          type="info"
          size="small"
          link
        >
          免费注册
        </el-button>
        <el-button @click="openPopup('找回密码', FindPassword, 'drawer')" class="btn" type="info" size="small" link>
          找回密码
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { PostUserLogin, GetUserLoginRoleAccounts } from "@/api-mock";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import FindPassword from "./_components/FindPassword.vue";
import Register from "./_components/Register.vue";
import Captcha from "./_components/Captcha.vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { storage } from "@/utils";
import { useDictStore, useUserStore } from "@/store";

const { VITE_APP_NAME } = import.meta.env;
const openPopup: any = inject("openPopup");
const userStore = useUserStore();
const loading = ref(false);
const accountOpts = ref<CommonObj[]>([]);
const storeAccount = storage.getItem("rememberAccount");
const model = reactive<CommonObj>({
  phone: storeAccount?.phone ?? "superAdmin_1",
  psd: storeAccount?.psd ?? "superAdmin123456",
  captcha: "",
  remember: !!storeAccount,
});
const fields = computed<FormFieldAttrs[]>(() => {
  return [
    {
      prop: "phone",
      label: "账号",
      valid: /^\d/.test(model.phone) ? "phone" : undefined,
      required: true,
      type: "autocomplete",
      attrs: {
        placeholder: "请输入账号 / 手机号",
        autocomplete: "off",
        onSelect: handleSelect,
        fetchSuggestions: handleFetchSuggestions,
      },
    },
    {
      prop: "psd",
      label: "密码",
      valid: "password",
      required: true,
      attrs: {
        type: "password",
        autocomplete: "off",
      },
    },
    {
      prop: "captcha",
      label: "验证码",
      type: "custom",
      required: true,
    },
    {
      prop: "remember",
      label: "记住我",
      type: "checkbox",
      // size: "small",
    },
  ];
});
loadAll();
function loadAll() {
  GetUserLoginRoleAccounts().then((res: CommonObj[]) => {
    accountOpts.value = res.map((item: CommonObj) => {
      const { account, ...rest } = item;
      return { value: account, ...rest };
    });
  });
}
function handleSubmit(data: CommonObj) {
  loading.value = true;
  userStore.handleLoginIn(data).finally(() => {
    loading.value = false;
  });
}
function handleFetchSuggestions(queryStr: string, cb: any) {
  let opts = accountOpts.value;
  if (queryStr) {
    opts = accountOpts.value.filter((queryStr: string) => {
      return (item: CommonObj) => item.value.toLowerCase().indexOf(queryStr.toLowerCase()) === 0;
    });
  }
  cb(opts);
}
function handleSelect(item: CommonObj) {
  model.psd = item.psd;
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100vh;
  width: 100vw;
  background: url("@/assets/images/bg/login.jpg") no-repeat 0 0/100% 100% #eee;
}
.bounce-in {
  animation: bounceIn 1.2s;
}
.login-box {
  width: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $shadow-heavy;
  background: #fff;
  .head {
    color: $color-primary;
    font-weight: 600;
    font-size: 30px;
    height: 100px;
    background: #eee;
  }
  .body {
    padding: $gap-two 50px 0;
  }
  .foot {
    padding: $gap 50px $gap-two;
  }
}
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
