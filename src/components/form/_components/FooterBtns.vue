<!-- 页面-简介 -->
<template>
  <div class="footer-btns f-c-c f-0 pt-h pb-h">
    <el-button type="primary" v-debounce.immediate="handleSubmit" :disabled="disabled || isLoading" v-if="submitText">
      <template #icon>
        <BaseIcon :class="{ rotate: isLoading }" :name="isLoading ? 'Loading' : 'Promotion'"></BaseIcon>
      </template>
      {{ submitText }}
    </el-button>
    <template v-for="(btn, ind) in newMoreBtns" :key="ind">
      <BaseBtn @click="handleMoreBtns(btn)" :name="btn" :disabled="disabled" v-if="btn.popconfirm" />
      <BaseBtn v-debounce.immediate="() => handleMoreBtns(btn)" :name="btn" :disabled="disabled" v-else />
    </template>
    <el-button :icon="RefreshLeft" @click="handleReset" :disabled="disabled || isLoading" v-if="resetText">{{
      resetText
    }}</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, watch, computed } from "vue";
import { RefreshLeft } from "@element-plus/icons-vue";
import { BaseBtnType, BtnItem, getBtnObj } from "@/components/BaseBtn";
import { deleteAttrs, omitAttrs, printLog, splitPropsParams, showMessage } from "@/components/_utils";
import { CommonObj, FinallyNext, UniteFetchType } from "@/vite-env";
import { ClosePopupType } from "@/App.vue";
const closePopup: any = inject("closePopup");
const props = withDefaults(
  defineProps<{
    loading?: boolean;
    submitText?: string;
    resetText?: string;
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    formRef?: any;
    isOmit?: boolean;
    log?: boolean;
    debug?: boolean;
    params?: any;
    fetch?: UniteFetchType; //请求接口，一般跟fetchSuccess，fetchFail一起配合使用
    fetchSuccess?: FinallyNext;
    fetchFail?: FinallyNext;
    noSubmitProps?: string[]; //提交表单时，不要提交的prop属性
    handleRequest?: (args: CommonObj) => CommonObj; //处理参数
    disabled?: boolean; //是否禁用按钮
  }>(),
  {
    isOmit: true,
    submitText: "提交",
    resetText: "重置",
    moreBtns: () => [],
  }
);
const emits = defineEmits(["moreBtns", "submit"]);
const isLoading = ref(false);
const newMoreBtns = computed(() => props.moreBtns.map((btn: BaseBtnType) => getBtnObj(btn)));
watch(
  () => props.loading,
  newVal => {
    isLoading.value = newVal;
  }
);
//处理校验逻辑
function handleValidate() {
  const { log, debug, isOmit, noSubmitProps } = props;
  return new Promise((resolve, reject) => {
    let { params } = props;
    const { formRef, handleRequest } = props;
    if (!formRef) return;
    formRef.validate((valid: any, fieldsObj: CommonObj) => {
      if (valid) {
        params = splitPropsParams(params);
        if (handleRequest) {
          params = handleRequest(params);
        }
        isOmit && (params = omitAttrs(params));
        params = deleteAttrs(params, noSubmitProps);
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
const fetchSucCb: FinallyNext = (
  hint = props.submitText + "成功！",
  closeType?: ClosePopupType,
  cb?: () => void,
  isRefreshList = true
) => {
  showMessage(hint);
  closePopup(closeType);
  cb?.();
};
//提交表单
function handleSubmit() {
  handleValidate()
    .then((params: any) => {
      const { log, fetch, fetchSuccess = fetchSucCb, fetchFail, submitText } = props;
      if (fetch) {
        isLoading.value = true;
        fetch(params)
          .then((res: any) => {
            log && printLog(res, "res");
            fetchSuccess(submitText + "成功！");
          })
          .catch((err: any) => {
            fetchFail?.(err);
          })
          .finally(() => {
            isLoading.value = false;
          });
      } else {
        emits("submit", params);
      }
    })
    .catch(() => {});
}
//重置表单
function handleReset() {
  const { formRef } = props;
  if (!formRef) return;
  formRef.resetFields();
}
//点击更多按钮时
function handleMoreBtns(btn: BtnItem) {
  const { name, validate, to } = btn;
  if (to !== undefined) return;
  if (validate) {
    handleValidate()
      .then(params => {
        emits("moreBtns", name, params, fetchSucCb);
      })
      .catch(() => {});
  } else {
    emits("moreBtns", name, props.params, fetchSucCb);
  }
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
