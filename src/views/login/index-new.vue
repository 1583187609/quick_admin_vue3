<!-- 页面 - 登录 -->
<template>
  <div class="page f-c-c">
    <h1 class="h1">{{ title }}</h1>
    <div class="box f-fs-c">
      <!-- d="M 50 50 m -50 0 a 50 50 0 1 1 100 0 a 50 50 0 1 1 -100 0 z" -->
      <!-- d="M 0,50 a 50,50 0 1, 1 0, 1 z" -->
      <!-- <div class="circle">
        <svg class="svg" viewBox="0 0 100 100">
          <path
            d="M 50 50 m -50 0 a 50 50 0 1 1 100 0 a 50 50 0 1 1 -100 0 z"
            id="circle"
          />
          <text>
            <textPath xlink:href="#circle">脱单计划管理后台</textPath>
          </text>
        </svg>
      </div> -->
      <div class="wrap f-c-c-c">
        <h2 class="h2 f-0">{{ typeMap[type].title }}</h2>
        <BaseForm
          class="form f-0"
          v-model="modelData"
          :fields="fields"
          :submitText="typeMap[type].submitText"
          :loading="loading"
          :autoFixedFoot="false"
          @submit="handleSubmit"
          :key="type"
        >
        </BaseForm>
      </div>
      <template v-if="type === 'login'">
        <div @click="type = 'register'" class="btns f-c-c blue">去注册</div>
        <div @click="type = 'forget'" class="btns f-c-c">忘记密码</div>
      </template>
      <div @click="type = 'login'" class="btns f-c-c" v-else>去登录</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { PostUserLogin } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { CommonObj } from "@/vite-env";
import CaptchaBtn from "./_components/CaptchaBtn.vue";
import { ElMessage } from "element-plus";
import BaseIcon from "@/core/components/BaseIcon.vue";
import { useUserStore } from "@/store";
import { h } from "vue";
export type FormType = "login" | "register" | "forget";
// const userStore = useUserStore();
const typeMap: CommonObj = {
  login: {
    title: "登录",
    api: PostUserLogin,
    submitText: "登录",
  },
  register: {
    title: "注册",
    api: PostUserLogin,
    submitText: "注册",
  },
  forget: {
    title: "忘记密码",
    api: PostUserLogin,
  },
};
// const props = withDefaults(defineProps<{}>(), {});
const type = ref<FormType>("login");
const userStore = useUserStore();
const loading = ref(false);
const title = import.meta.env.VITE_APP_TITLE;
const { login_account } = localStorage;
const modelData = reactive<CommonObj>({
  account: login_account || "",
  password: "",
  remember: !!login_account,
});
const fields = computed<FormField[]>(() => {
  return [
    {
      prop: "account",
      label: "账号",
      required: true,
      attrs: {
        showWordLimit: false,
        slots: {
          prefix: h(BaseIcon, { name: "User", size: "24" }),
        },
      },
      quickAttrs: {
        // rulesType: "phone",
      },
    },
    type.value !== "login" && {
      prop: "yzm",
      label: "验证码",
      required: true,
      class: "captcha-box",
      attrs: {
        maxlength: 4,
        showWordLimit: false,
        slots: {
          prefix: h(BaseIcon, { name: "Clock", size: "24" }),
          append: CaptchaBtn,
        },
      },
    },
    {
      prop: "password",
      label: "密码",
      required: true,
      attrs: {
        slots: {
          prefix: h(BaseIcon, { name: "Lock", size: "24" }),
        },
      },
      quickAttrs: {
        rulesType: "password",
      },
    },
    type.value === "register" && {
      prop: "confirmPsd",
      label: "确认密码",
      required: true,
      rules: [{ validator: checkConfirmPsd, trigger: "blur" }],
      attrs: {
        placeholder: "请再次输入密码",
        slots: {
          prefix: h(BaseIcon, { name: "Unlock", size: "24" }),
        },
      },
      quickAttrs: {
        rulesType: "password",
      },
    },
    type.value === "login" && {
      prop: "remember",
      label: "记住我",
      type: "checkbox",
      class: "rember",
      attrs: {
        size: "large",
        // border: true,
      },
    },
  ];
});
//校验两次输入的密码是否一致
function checkConfirmPsd(rule: any, value: any, callback: any) {
  if (value !== modelData.password) {
    callback(new Error("确认密码和密码需要保持一致"));
  } else {
    callback();
  }
}
//处理表单提交
function handleSubmit(params: any) {
  const map: CommonObj = {
    login: () => handleLogin(params),
    register: () => handleRegister(params),
    forget: () => handleForgetPsd(params),
  };
  map[type.value] ? map[type.value]() : ElMessage.warning(`点击了${type.value}按钮`);
}
//登录
function handleLogin(params: CommonObj) {
  loading.value = true;
  userStore.handleLoginIn(params).finally(() => {
    loading.value = false;
  });
}
//注册
function handleRegister(params: CommonObj) {
  ElMessage.warning("注册功能暂未开通，敬请期待！");
}
//找回密码
function handleForgetPsd(params: CommonObj) {
  ElMessage.warning("找回密码功能暂未开通，敬请期待！");
}
</script>
<style lang="scss" scoped>
$size: 600px;
$ratio: 1; //500/350   1.43
$transition-time: 0.5s;
.page {
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #eff0f4;
}
.h1 {
  position: absolute;
  font-size: 40px;
  letter-spacing: 0.4em;
  text-shadow: #999 2px 4px 10px;
  transform: translate($ratio * -85px, $size * -0.5 - 50px);
}
.circle {
  position: absolute;
  top: -50px;
  left: -50px;
  // left: 50%;
  // transform: translateX(-50%);
  width: $size * 1.2;
  height: $size * 0.5;
  .svg {
    font-size: 20px;
    display: block;
    overflow: visible;
  }
  path {
    fill: none;
  }
}

.box {
  position: relative;
  width: ($size + 170px) * $ratio;
  .wrap {
    position: relative;
    width: $size * $ratio;
    height: $size * $ratio;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05), 25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.5),
      inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    transition: $transition-time;
    border-radius: 52% 48% 33% 67%/38% 45% 55% 62%;
    &:hover {
      border-radius: 50%;
    }
    &::before {
      content: "";
      position: absolute;
      top: 70px * $ratio;
      left: 120px * $ratio;
      width: 50px * $ratio;
      height: 50px * $ratio;
      border-radius: 50%;
      background: #fff;
      opacity: 0.5;
    }
    &::after {
      content: "";
      position: absolute;
      top: 125px * $ratio;
      left: 155px * $ratio;
      width: 20px * $ratio;
      height: 20px * $ratio;
      border-radius: 50%;
      background: #fff;
      opacity: 0.5;
    }
    .h2 {
      font-size: 26px * $ratio;
      color: $color-primary;
      line-height: 1;
      letter-spacing: 0.2em;
      margin-bottom: 22px * $ratio;
    }
  }
  .btns {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 170px * $ratio;
    height: 170px * $ratio;
    background: #c61dff;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    transition: $transition-time;
    border-radius: 44% 56% 65% 35%/57% 58% 42% 43%;
    box-shadow: inset 10px 10px 10px rgba(190, 1, 254, 0.05), 15px 25px 10px rgba(190, 1, 254, 0.1),
      15px 20px 20px rgba(190, 1, 254, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.5);
    &:hover {
      border-radius: 50%;
      font-size: 18px;
    }
    &::before {
      content: "";
      position: absolute;
      top: 26px * $ratio;
      left: 40px * $ratio;
      width: 28px * $ratio;
      height: 28px * $ratio;
      border-radius: 50%;
      background: #fff;
      opacity: 0.5;
    }
  }
  .blue {
    bottom: 210px * $ratio;
    right: 0px;
    width: 110px * $ratio;
    height: 110px * $ratio;
    background: #01b4ff;
    border-radius: 49% 51% 52% 48%/63% 59% 41% 37%;
    box-shadow: inset 10px 10px 10px rgba(1, 180, 255, 0.05), 15px 25px 10px rgba(1, 180, 255, 0.1),
      15px 20px 20px rgba(1, 180, 255, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.5);
    &::before {
      top: 16px * $ratio;
      left: 28px * $ratio;
      width: 20px * $ratio;
      height: 20px * $ratio;
    }
  }
}
.form {
  position: reactive;
  z-index: 1;
  flex: 0;
  width: 310px * $ratio;
  :deep(.el-form-item__label) {
    padding: 0;
  }
  :deep(.el-form-item:not(.rember)) {
    position: relative;
    border-radius: 30px * $ratio;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1), inset -2px -5px 10px rgba(255, 255, 255, 1),
      15px 15px 10px rgba(0, 0, 0, 0.5), 15px 10px 15px rgba(0, 0, 0, 0.25);
    background: #eff0f4;
    margin-bottom: 36px * $ratio;
    &::before {
      content: "";
      position: absolute;
      top: 5px * $ratio;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 5px * $ratio;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px * $ratio;
    }
  }
  :deep(.el-input__wrapper) {
    height: 54px * $ratio;
    border-radius: 27px * $ratio;
    background: transparent;
    font-size: 18px;
    // box-shadow: none;
  }
  :deep(.el-input-group__append) {
    border-radius: 0 27px * $ratio 27px * $ratio 0;
    flex-basis: 7em;
    flex: 0;
    font-size: 18px;
    // font-size: 16px;
    background: transparent;
    &:hover {
      color: $color-primary;
    }
  }
  :deep(.captcha-box .el-input__wrapper) {
    border-radius: 27px * $ratio 0 0 27px * $ratio;
  }
  :deep(.footer-btns) {
    padding: 0;
  }
  :deep(.footer-btns .el-button) {
    position: relative;
    width: 36%;
    margin: 0 7%;
    height: 54px * $ratio;
    font-size: 18px;
    border-radius: 27px * $ratio;
    transition: $transition-time;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1), inset -2px -5px 10px rgba(255, 255, 255, 1),
      15px 15px 10px rgba(0, 0, 0, 0.5), 15px 10px 15px rgba(0, 0, 0, 0.25);
    &::before {
      content: "";
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 55%;
      height: 5px * $ratio;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px * $ratio;
    }
    &:hover {
      width: 50%;
      margin: 0;
    }
    &:first-child {
      box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1), inset -2px -5px 10px rgba(255, 255, 255, 0.25),
        15px 15px 10px rgba(0, 0, 0, 0.5), 15px 10px 15px rgba(0, 0, 0, 0.25);
    }
  }
  :deep(.el-form-item__label) {
    display: none;
    line-height: 54px;
    height: 54px;
    margin-right: $gap-half;
  }
  :deep(.el-input__inner) {
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #eff0f4 inset !important;
      -webkit-text-fill-color: $color-text-main !important;
    }
  }
  :deep(.el-form-item__error) {
    margin-top: 14px * $ratio;
  }
}
</style>
