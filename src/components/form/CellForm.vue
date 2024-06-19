<!-- 单元格表单 -->
<template>
  <el-form class="cell-form f-fs-s-c f-1" :model="formData" v-bind="defaultFormAttrs" ref="formRef">
    <div class="box all-hide-scroll" :class="[fields.length ? 'f-fs-s-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']">
      <template v-if="fields.length">
        <el-col
          v-bind="field.colAttrs || Object.assign({}, defaultColSpanAttrs, colSpanAttrs)"
          v-for="(field, ind) in fields"
          :key="ind"
        >
          <BaseFormItem
            :field="field"
            :pureText="field.extra?.pureText || pureText"
            v-model="formData[field.prop as string]"
            @change="(prop:any,val:any)=>emits('change',prop,val)"
            :formRef="formRef"
          >
            <template #custom="{ field: currField }">
              <slot :name="currField.prop" :field="currField" :form="formData"></slot>
            </template>
          </BaseFormItem>
        </el-col>
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
      :params="merge({}, formData, extraParams)"
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

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect } from "vue";
import { FormInstance } from "element-plus";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { merge } from "lodash";
import { handleFields } from "./_utils";
import FooterBtns from "./_components/FooterBtns.vue";
import { getMaxLength, omitAttrs, typeOf, isProd } from "@/utils";
import { ColSpanAttrs } from "../table/CellTable.vue";
import { BaseBtnType, getBtnObj } from "@/components/BaseBtn";
import { defaultFormAttrs } from "@/components/form";
import { CommonObj, FinallyNext, FetchType } from "@/vite-env";
export interface CellFormField extends FormFieldAttrs {
  colAttrs?: ColSpanAttrs;
}
const defaultColSpanAttrs: ColSpanAttrs = {
  // xs: 24, // <768
  // sm: 12, // >=768
  // md: 8, // >=992
  // lg: 6, // >=1200
  // xl: 4, // >=1920
  span: 6,
};
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: CellFormField[]; //表单字段项
    pureText?: boolean; //是否纯文本展示
    fetch?: FetchType | ((params: CommonObj) => FetchType);
    fetchSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    fetchFail?: () => void; //fetch请求失败之后的回调方法
    footer?: boolean; //是否显示底部按钮
    submitText?: string; //提交按钮的文字
    resetText?: string; //提交按钮的文字
    extraParams?: CommonObj; //额外的参数
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    colSpanAttrs?: ColSpanAttrs;
    loading?: boolean; //提交按钮是否显示加载图标
    isOmit?: boolean; //是否剔除掉 undefined，'' 参数
    log?: boolean; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    noSubmitProps?: string[]; //提交表单时，不要提交的prop属性
    handleRequest?: (args: CommonObj) => CommonObj; //处理参数
  }>(),
  {
    modelValue: () => reactive({}),
    log: !isProd,
    footer: true,
    isOmit: true,
    autoFixedFoot: true,
    fields: () => [],
  }
);
const emits = defineEmits(["update:modelValue", "submit", "change", "moreBtns"]);
const formRef = ref<FormInstance>();
const footerBtnsRef = ref<any>(null);
// const newAttrs = computed(() => merge({ labelWidth: getMaxLength(props.fields) + "em" }, defaultFormAttrs));
const newFields = ref<FormFieldAttrs[]>([]);
// const formData = reactive<CommonObj>({});
// watch(
//   () => props.fields,
//   (newVal) => {
//     const { model } = props;
//     const result = handleFields(newVal, emits, model);
//     const { data, fields } = result;
//     merge(formData, data);
//     newFields.value = fields;
//   }
// );
// watch(
//   () => props.model,
//   (newVal) => {
//     merge(formData, newVal);
//   },
//   { immediate: false, deep: true }
// );
// watch(
//   formData,
//   (newVal) => {
//     merge(props.model, newVal);
//   },
//   { immediate: false, deep: true }
// );
// const formData = ref<CommonObj>({});
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
defineExpose({
  formRef,
});
</script>
<style lang="scss" scoped>
.cell-form {
  height: 100%;
  outline: $color-border-main solid 1px;
}
.auto-fixed-foot {
  overflow: auto;
  overscroll-behavior: auto;
}
.base-form-item {
  padding: 2px;
  margin-bottom: 0;
  outline: $color-border-main solid 1px;
  overflow: hidden;
  // flex: 1;
  // flex-basis: 250px;
}
</style>
