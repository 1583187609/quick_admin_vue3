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
        v-model="modelData"
        size="large"
        :loading="loading"
        :fields="fields"
        @submit="handleSubmit"
        submitText="登录"
        ref="formRef"
      >
        <!-- :fetch="PostUserLogin" -->
        <template #captcha>
          <Captcha v-model="modelData.captcha" prop="captcha" />
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
import { ref, reactive, computed } from "vue";
import { GetUserLoginAccounts } from "@/api-mock";
import { FormFieldAttrs } from "@/components/form/_types";
import FindPassword from "./FindPassword.vue";
import Register from "./Register.vue";
import Captcha from "./_components/Captcha.vue";
import { CommonObj } from "@/vite-env";
import { storage } from "@/utils";
import { useUserStore } from "@/store";
import { usePopup } from "@/hooks";

const { VITE_APP_NAME } = import.meta.env;
const { openPopup } = usePopup();
const userStore = useUserStore();
const loading = ref(false);
const accountOpts = ref<CommonObj[]>([]);
const storeAccount = storage.getItem("rememberAccount");
const modelData = reactive<CommonObj>({
  phone: storeAccount?.phone ?? "18483221518",
  psd: storeAccount?.psd ?? "superAdmin12345",
  captcha: "",
  remember: !!storeAccount,
});
const fields = computed<FormFieldAttrs[]>(() => {
  return [
    {
      prop: "phone",
      label: "账号",
      required: true,
      type: "autocomplete",
      attrs: {
        placeholder: "请输入账号 / 手机号",
        autocomplete: "off",
        onSelect: handleSelect,
        fetchSuggestions: handleFetchSuggestions,
      },
      quickAttrs: {
        rulesType: /^\d/.test(modelData.phone) ? "phone" : undefined,
      },
    },
    {
      prop: "psd",
      label: "密码",
      required: true,
      attrs: {
        type: "password",
        autocomplete: "off",
      },
      quickAttrs: {
        rulesType: "password",
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
  GetUserLoginAccounts().then((res: CommonObj[]) => {
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
  modelData.psd = item.psd;
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100vh;
  width: 100vw;
  background: url("./_imgs/login.jpg") no-repeat 0 0/100% 100% #eee;
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
