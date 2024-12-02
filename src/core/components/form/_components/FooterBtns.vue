<!-- summary
  表单底部按钮
-->
<template>
  <div class="footer-btns f-c-c f-0 pt-h pb-h">
    <el-button type="primary" v-debounce.immediate="handleSubmit" :disabled="disabled || isLoading" v-if="submitText">
      <template #icon>
        <el-icon :class="{ rotate: isLoading }" :name="isLoading ? 'Loading' : 'Promotion'">
          <Loading v-if="isLoading" />
          <Promotion v-else />
        </el-icon>
      </template>
      {{ submitText }}
    </el-button>
    <template v-for="(btn, ind) in newMoreBtns" :key="ind">
      <BaseBtn @click="handleMoreBtns(btn)" :name="btn" :disabled="disabled" v-if="btn.popconfirm" />
      <BaseBtn v-debounce.immediate="() => handleMoreBtns(btn)" :name="btn" :disabled="disabled" v-else />
    </template>
    <el-button :icon="RefreshLeft" @click="handleReset" :disabled="disabled || isLoading" v-if="resetText">
      {{ resetText }}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, inject, computed } from "vue";
import { RefreshLeft } from "@element-plus/icons-vue";
import { BaseBtnType, BtnItem } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import { omitAttrs, printLog, splitPropsParams, showMessage } from "@/core/utils";
import { CommonObj, FinallyNext, UniteFetchType } from "@/core/_types";
import { ClosePopupInject, ClosePopupType } from "@/core/components/BasicPopup/_types";
import { Loading, Promotion } from "@element-plus/icons-vue";

const closePopup = inject<ClosePopupInject>("closePopup");
const props = withDefaults(
  defineProps<{
    loading?: boolean;
    submitText?: string;
    resetText?: string;
    moreBtns?: BaseBtnType[]; // 底部的额外更多按钮
    formRef?: any;
    omit?: boolean;
    log?: boolean;
    debug?: boolean;
    disabled?: boolean; // 是否禁用按钮
    params?: any;
    fetch?: UniteFetchType; // 请求接口，一般跟fetchSuccess，fetchFail一起配合使用
    afterSuccess?: FinallyNext;
    afterFail?: FinallyNext;
    handleRequest?: (args: any) => any; // 处理请求参数
    handleResponse?: (data: any) => any; // 处理请求数据
  }>(),
  {
    omit: true,
    submitText: "提交",
    resetText: "重置",
    moreBtns: () => [],
  }
);
const $emit = defineEmits(["moreBtns", "submit"]);
const isLoading = ref(props.loading);
watch(
  () => props.loading,
  (newVal, oldVal) => {
    isLoading.value = newVal;
  }
);
const newMoreBtns = computed(() => props.moreBtns.map((btn: BaseBtnType) => getBtnObj(btn)));
//处理校验逻辑
function handleValidate() {
  const { log, debug, omit } = props;
  return new Promise((resolve, reject) => {
    let { params } = props;
    const { formRef, handleRequest } = props;
    if (!formRef) return;
    formRef.validate((valid: any, fieldsObj: CommonObj) => {
      if (valid) {
        params = splitPropsParams(params);
        if (handleRequest) params = handleRequest(params);
        if (omit) params = omitAttrs(params);
        if (log || debug) {
          printLog(params, "req");
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
//请求成功之后的回调函数
const defaultAfterSuccess: FinallyNext = (hint = props.submitText + "成功！", closeType?: ClosePopupType, cb?: () => void) => {
  showMessage(hint);
  closePopup(closeType);
  cb?.();
};
//提交表单
function handleSubmit() {
  handleValidate()
    .then((params: any) => {
      const { log, fetch, handleResponse, afterSuccess = defaultAfterSuccess, afterFail, submitText } = props;
      if (!fetch) return $emit("submit", params);
      isLoading.value = true;
      fetch(params)
        .then((res: any) => {
          log && printLog(res, "res");
          if (handleResponse) res = handleResponse(res);
          afterSuccess(res, defaultAfterSuccess);
        })
        .catch((err: any) => {
          afterFail?.(err);
        })
        .finally(() => {
          isLoading.value = false;
        });
    })
    .catch(() => {});
}
//重置表单
function handleReset() {
  const { formRef } = props;
  formRef?.resetFields();
}
//点击更多按钮时
function handleMoreBtns(btn: BtnItem) {
  const { name, validate, to } = btn;
  if (to) return;
  if (!validate) return $emit("moreBtns", name, props.params, defaultAfterSuccess);
  handleValidate()
    .then(params => {
      $emit("moreBtns", name, params, defaultAfterSuccess);
    })
    .catch(() => {});
}
defineExpose({
  formValidate: handleValidate,
  submit: handleSubmit,
});
</script>
<style lang="scss" scoped>
.footer-btns {
  width: 100%;
}
</style>
