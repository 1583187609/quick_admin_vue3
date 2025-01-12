<!-- summary
  表单底部按钮
-->
<template>
  <div class="footer-btns f-c-c f-0 pt-h pb-h">
    <BaseBtn :tpl="newSubmitBtn" :loading="isLoading" @click="handleSubmit" v-if="newSubmitBtn" />
    <BaseBtn @click="handleMoreBtns" :tpl="btn" v-for="(btn, ind) in newMoreBtns" :key="ind" />
    <BaseBtn v-bind="newResetBtn.attrs" :tpl="newResetBtn.name" @click="handleReset" v-if="newResetBtn" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed, useAttrs } from "vue";
import { BaseBtnType } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import { omitAttrs, printLog, splitPropsParams, showMessage } from "@/core/utils";
import { CommonObj, FinallyNext, UniteFetchType, NextArgs, BaseDataType } from "@/core/_types";
import { getFootBtnAttrs } from "../_utils";
import { typeOf } from "#/mock/utils";

export type AfterReset = (...NextArgs) => void;
export interface FootBtnAttrs {
  text?: string;
  icon?: string;
  // 不提供按钮的其他属性了，因为样式统一的话，原则上不允许随意更改统一的样式了
}
export type FootBtn = FootBtnAttrs | string;
// const closePopup = inject<ClosePopupInject>("closePopup");
const props = withDefaults(
  defineProps<{
    loading?: boolean;
    submitBtn?: FootBtn;
    resetBtn?: FootBtn;
    moreBtns?: BaseBtnType[]; // 底部的额外更多按钮
    omits?: boolean | BaseDataType[];
    log?: boolean | string;
    debug?: boolean;
    params?: any;
    formRef?: any;
    fetch?: UniteFetchType;
    afterSuccess?: (params: CommonObj, FinallyNext) => void;
    afterFail?: FinallyNext;
    afterReset?: AfterReset;
  }>(),
  {
    omits: true,
    submitBtn: "提交",
    resetBtn: "重置",
    moreBtns: () => [],
  }
);
const $emit = defineEmits(["moreBtns", "submit"]);
const $attrs = useAttrs();
const isLoading = ref(props.loading);
const newSubmitBtn = getFootBtnAttrs(props.submitBtn, "submit");
const newResetBtn = getFootBtnAttrs(props.resetBtn, "reset");
watch(
  () => props.loading,
  newVal => {
    isLoading.value = newVal;
  }
);
const newMoreBtns = computed(() => props.moreBtns.map((btn: BaseBtnType) => getBtnObj(btn)));
//处理校验逻辑
function handleValidate() {
  const { log, debug, omits } = props;
  return new Promise((resolve, reject) => {
    let { params } = props;
    const { formRef } = props;
    if (!formRef) return;
    formRef.validate((valid: any, fieldsObj: CommonObj) => {
      if (valid) {
        params = splitPropsParams(params);
        params = omitAttrs(params, omits);
        if (log || debug) {
          printLog(params, "req", log);
          if (debug) return;
        }
        resolve(params);
      } else {
        const target = Object.values(fieldsObj)[0][0];
        showMessage(target.message, "error");
        reject(target);
      }
    });
  });
}
//提交表单
function handleSubmit(...args) {
  const [tpl, btnObj, next, e] = args;
  handleValidate().then((params: CommonObj) => {
    const { fetch, log, afterSuccess, afterFail } = props;
    if (!fetch) return $emit("submit", params, next, e);
    isLoading.value = true;
    fetch(params)
      .then((res: any) => {
        log && printLog(res, "res", log);
        if (!afterSuccess) return next();
        afterSuccess(res, next);
      })
      .catch((err: any) => afterFail?.(err))
      .finally(() => {
        isLoading.value = false;
      });
  });
}
//重置表单
function handleReset(...args) {
  const { formRef, afterReset } = props;
  formRef.resetFields();
  afterReset?.(...args);
}
//点击更多按钮时
function handleMoreBtns(...args) {
  const [tpl, btnObj, next, e] = args;
  const { name, validateForm, to } = btnObj;
  if (to) return;
  if (!validateForm) return $emit("moreBtns", name, props.params, next, e);
  handleValidate()
    .then(params => {
      $emit("moreBtns", name, params, next, e);
    })
    .catch(() => {});
}
defineExpose({
  validate: handleValidate,
  submit: handleSubmit,
  reset: handleReset,
});
</script>
<style lang="scss" scoped>
.footer-btns {
  width: 100%;
}
</style>
