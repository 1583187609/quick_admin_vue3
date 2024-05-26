<!-- 基础表单 -->
<template>
  <el-form class="base-form f-fs-s-c f-1" :model="formData" v-bind="newAttrs" @keyup.enter="handleEnter" ref="formRef">
    <div class="all-hide-scroll" :class="[newFields.length ? 'f-fs-fs-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']">
      <template v-if="newFields.length">
        <!-- @change="(prop:any,val:any)=>emits('change',prop,val)" -->
        <BaseFormItem
          :className="`f-span-${field.span || span}`"
          :field="field"
          :pureText="field.pureText || pureText"
          v-model="formData[field.prop as string]"
          @change="(prop:any,val:any)=>emits('change',prop,val)"
          v-for="(field, ind) in newFields"
          :key="field.key === undefined ? ind : field.key"
        >
          <template #custom="{ field }">
            <slot :name="field.prop" :field="field" :form="formData"></slot>
          </template>
        </BaseFormItem>
      </template>
      <template v-else>空空如也~</template>
    </div>
    <FooterBtns
      :loading="loading"
      :moreBtns="moreBtns"
      :submitText="submitText"
      :resetText="resetText"
      :formRef="formRef"
      :isOmit="isOmit"
      :log="log"
      :debug="debug"
      :params="params"
      :fetch="fetch"
      :fetchSuccess="fetchSuccess"
      :fetchFail="fetchFail"
      :noSubmitProps="noSubmitProps"
      :handleRequest="handleRequest"
      :disabled="!newFields.length"
      @moreBtns="(name:string, args?:CommonObj, cb?:FinallyNext) => emits('moreBtns', name, args, cb)"
      @submit="(args:CommonObj)=>emits('submit', args)"
      ref="footerBtnsRef"
      v-if="!pureText && footer"
    />
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect, inject } from "vue";
import { FormInstance } from "element-plus";
import { handleFields } from "./_utils";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { merge } from "lodash";
import FooterBtns from "./_components/FooterBtns.vue";
import { getMaxLength, isProd } from "@/utils";
import { BaseBtnType } from "@/components/BaseBtn";
import { defaultFormAttrs } from "@/components/form";
import { CommonObj, FinallyNext, UniteFetchType } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: FormField[]; //表单字段项
    pureText?: boolean; //是否纯文本展示
    fetch?: UniteFetchType; //请求接口，一般跟fetchSuccess，fetchFail一起配合使用
    fetchSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    fetchFail?: FinallyNext; //fetch请求失败之后的回调方法
    span?: string | number; //同ElementPlus 的span，1 ~ 24
    footer?: boolean; //是否显示底部按钮
    submitText?: string; //提交按钮的文字
    resetText?: string; //提交按钮的文字
    extraParams?: CommonObj; //额外的参数
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    loading?: boolean; //提交按钮是否显示加载图标
    isOmit?: boolean; //是否剔除掉 undefined，'' 参数
    log?: boolean; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
    isCache?: boolean; //是否缓存
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    noSubmitProps?: string[]; //提交表单时，不要提交的prop属性
    handleRequest?: (args: CommonObj) => CommonObj; //处理参数
  }>(),
  {
    modelValue: () => reactive({}),
    log: !isProd,
    span: 24,
    footer: true,
    isOmit: true,
    autoFixedFoot: true,
    fields: () => [],
  }
);
const emits = defineEmits(["update:modelValue", "submit", "change", "moreBtns"]);
const footerBtnsRef = ref<any>(null);
const formRef = ref<FormInstance>();
const newAttrs = computed(() => merge({ labelWidth: getMaxLength(props.fields) + "em" }, defaultFormAttrs));
const newFields = ref<FormFieldAttrs[]>([]);
// const formData = ref<CommonObj>({});
// const params = computed(() => merge({}, formData.value, props.extraParams));
// watch(
//   () => props.fields,
//   (newVal) => {
//     const { modelValue } = props;
//     const result = handleFields(newVal, emits, modelValue);
//     const { data, fields } = result;
//     newFields.value = fields;
//     merge(formData.value, data);
//   },
//   { immediate: true, deep: true }
// );
// watch(
//   () => props.modelValue,
//   (newVal) => {
//     formData.value = newVal;
//   },
//   { immediate: false, deep: true }
// );
// watch(
//   formData.value,
//   (newVal) => {
//     // merge(props.modelValue, newVal);
//     emits("update:modelValue", newVal);
//   },
//   { immediate: false, deep: true }
// );
const formData = computed({
  get() {
    return props.modelValue;
  },
  set(val: CommonObj) {
    emits("update:modelValue", val);
  },
});
const params = computed(() => merge({}, formData.value, props.extraParams));
watch(
  () => props.fields,
  newVal => {
    const { modelValue } = props;
    const result = handleFields(newVal, emits, modelValue);
    const { data, fields } = result;
    newFields.value = fields;
    merge(formData.value, data);
  },
  { immediate: true, deep: true }
);
//处理表单的enter时间
function handleEnter() {
  if (props.fetch) {
    footerBtnsRef.value.submit();
  } else {
    emits("submit", params.value);
  }
}
defineExpose({
  formRef,
  formValidate() {
    return footerBtnsRef.value.formValidate();
  },
});
</script>
<style lang="scss" scoped>
.base-form {
  height: 100%;
}
.auto-fixed-foot {
  overflow: auto;
  overscroll-behavior: auto;
}
</style>
