<!-- 单元格表单 -->
<template>
  <el-form class="cell-form f-fs-s-c f-1" :model="formData" v-bind="defaultFormAttrs" ref="formRef">
    <div class="box all-hide-scroll" :class="[fields.length ? 'f-fs-s-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']">
      <template v-if="fields.length">
        <el-col v-bind="field.grid || Object.assign({}, defaultColSpanAttrs, grid)" v-for="(field, ind) in fields" :key="ind">
          <FieldItem
            :field="field"
            :pureText="field.extraAttrs?.pureText || pureText"
            v-model="formData[field.prop as string]"
            @change="(prop:any,val:any)=>emits('change',prop,val)"
            :formRef="formRef"
          >
            <template #custom="{ field: currField }">
              <slot :name="currField.prop" :field="currField" :form="formData"></slot>
            </template>
          </FieldItem>
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
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { FormFieldAttrs, GridValAttrs } from "@/components/form";
import { merge } from "lodash";
import { handleFields } from "./_utils";
import FooterBtns from "./_components/FooterBtns.vue";
import { isProd } from "@/components/_utils";
import { BaseBtnType } from "@/components/BaseBtn";
import { defaultFormAttrs } from "@/components/form";
import FieldItem from "@/components/form/_components/FieldItem/Index.vue";
import { CommonObj, FinallyNext, FetchType } from "@/vite-env";

export interface CellFormField extends FormFieldAttrs {
  grid?: GridValAttrs;
}
const defaultColSpanAttrs: GridValAttrs = {
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
    grid?: GridValAttrs;
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
const newFields = ref<FormFieldAttrs[]>([]);
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
.field-item {
  padding: 2px;
  margin-bottom: 0;
  outline: $color-border-main solid 1px;
  overflow: hidden;
  // flex: 1;
  // flex-basis: 250px;
}
</style>
