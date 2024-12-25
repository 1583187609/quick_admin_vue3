<!-- summary
  目标：定位为基础（通用）表单，继承并扩展 el-form 的功能，提供快捷属性，实现快速开发。
  快捷属性：在 quickAttrs 中，例：grid、example、popover、tips、pureText、rulesType、before、after、……
  表单样式风格：通用表单、单元格表单、纯文本表单
-->
<template>
  <el-form class="base-form f-fs-s-c f-1" :class="styleType" :model="formData" v-bind="defaultFormAttrs" @keyup.enter="handleEnter" ref="formRef">
    <slot name="header" />
    <slot name="content" v-if="$slots.content" />
    <el-row class="section all-hide-scroll" :class="[newFields.length ? 'f-fs-s-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']" v-else>
      <template v-if="newFields.length">
        <!-- :class="{ custom: field.type === 'custom' }" -->
        <FieldItemCol
          v-model="formData[field.prop as string]"
          :field="field"
          :formRef="formRef"
          @change="(val:any, prop:any) => $emit('change', val, prop)"
          v-for="(field, ind) in newFields"
          :key="field.key ?? ind"
        >
          <template #custom="{ field: currField }">
            <slot :name="currField.prop" :field="currField" :form="formData" />
          </template>
        </FieldItemCol>
      </template>
      <BaseEmpty v-else />
    </el-row>

    <slot name="footer" v-if="footer">
      <FooterBtns
        :loading="loading"
        :moreBtns="moreBtns"
        :submitBtn="submitBtn"
        :resetBtn="resetBtn"
        :disabled="!newFields.length"
        :formRef="formRef"
        :omits="omits"
        :log="log"
        :debug="debug"
        :params="params"
        :fetch="fetch"
        :afterSuccess="afterSuccess"
        :afterFail="afterFail"
        :afterReset="afterReset"
        :handleRequest="handleRequest"
        :handleResponse="handleResponse"
        @moreBtns="(...args) => $emit('moreBtns', ...args)"
        @submit="(...args) => $emit('submit', ...args)"
        @reset="$attrs.onReset"
        ref="footerBtnsRef"
        v-if="!pureText && footer === true"
      />
    </slot>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { getFootBtnAttrs, handleFields } from "./_utils";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";
import { FormField, FormFieldAttrs } from "@/core/components/form/_types";
import { defaultFormAttrs } from "@/core/components/form";
import FooterBtns, { AfterReset, FootBtn } from "./_components/FooterBtns.vue";
import { BaseBtnType } from "@/core/components/BaseBtn/_types";
import { BaseDataType, CommonObj, FinallyNext, UniteFetchType } from "@/core/_types";
import { FormStyleType } from "./_types";
import { defaultCommonSize, isBaseBtn, isRenderData, showMessage } from "@/core/utils";
import config from "@/config";
import { useFormAttrs, useNextCallback, usePopup } from "@/core/hooks";
import { BaseRenderComponentType } from "../BaseRender.vue";
import _ from "lodash";

const { merge } = _;

const { closePopup } = usePopup();
const $slots = defineSlots<{
  header?: () => void; // 顶部插槽
  content?: () => void; // 内容插槽
  "[fieldItem]": () => void; // 字段Item插槽
  footer?: () => void; // 底部插槽
}>();
const props = withDefaults(
  defineProps<{
    /**
     * 基础属性
     */
    modelValue?: CommonObj; //表单数据
    fields?: FormField[]; //表单字段项
    /**
     * 继承属性
     */
    // grid?: Grid; //同ElementPlus 的 el-col 的属性，也可为数值：1 ~ 24
    // size?: CommonSize;
    // readonly?: boolean; //是否只读
    // disabled?: boolean; //是否禁用
    pureText?: boolean; //是否纯文本展示
    styleType?: FormStyleType; // 表格样式类型：cell单元格、common常用
    /**
     * 底部按钮
     */
    submitBtn?: FootBtn; //提交按钮的文字
    resetBtn?: FootBtn; //提交按钮的文字
    loading?: boolean; //提交请求状态。控制提交按钮是否显示加载图标
    footer?: boolean | BaseRenderComponentType; //是否显示底部按钮
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    /**
     * 处理属性
     */
    extraParams?: CommonObj; //额外的参数
    omits?: boolean | BaseDataType[]; //是否剔除掉值为 undefined, null, "" 的请求参数
    fetch?: UniteFetchType; //请求接口，一般跟fetchSuccess，fetchFail一起配合使用
    handleRequest?: (args: any) => any; //处理请求参数
    handleResponse?: (data: any) => any; //处理请求数据
    afterSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    afterFail?: FinallyNext; //fetch请求失败之后的回调方法
    afterReset?: AfterReset; // 重置之后的处理方法
    /**
     * 调试属性
     */
    log?: boolean | string; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
  }>(),
  {
    styleType: "common",
    modelValue: () => reactive({}),
    // size: defaultCommonSize,
    // grid: (_props: CommonObj) => (_props.styleType === "cell" ? 8 : 24),
    footer: true,
    omits: true,
    autoFixedFoot: true,
    fields: () => [],
    ...config?.BaseForm?.Index,
  }
);
const $emit = defineEmits(["update:modelValue", "submit", "change", "moreBtns"]);
const $attrs = useAttrs();
useFormAttrs({ ...props, ...$attrs }, undefined, true);
const footerBtnsRef = ref<any>(null);
const formRef = ref<FormInstance>();
const newFields = ref<FormFieldAttrs[]>([]);
const formData = computed({
  get: () => props.modelValue,
  set: (val: CommonObj) => $emit("update:modelValue", val),
});
const params = computed(() => merge({}, formData.value, props.extraParams));
watch(
  () => props.fields,
  newVal => {
    const { modelValue } = props;
    const result = handleFields(newVal, $emit, modelValue);
    const { data, fields } = result;
    newFields.value = fields;
    merge(formData.value, data);
  },
  { immediate: true, deep: true }
);
//处理表单的enter时间
function handleEnter() {
  if (props.fetch) return footerBtnsRef.value.submit();
  $emit("submit", params.value, useNextCallback(getFootBtnAttrs(props.submitBtn)?.text ?? "提交", closePopup));
}

defineExpose<{
  validate: () => void;
  [key: string]: any;
}>({
  formRef,
  validate() {
    return footerBtnsRef.value.formValidate();
  },
  reset() {
    footerBtnsRef.value.reset();
  },
});
</script>
<style lang="scss">
// $border-main: 1px solid red;
$g: 4px; // 2px 4px 6px small default large
.base-form {
  // width: 400px;
  &.cell {
    .section {
      outline: $border-main;
      border: $border-main;
      border-radius: $radius-main;
      .el-form-item__label-wrap {
        border-right: 2px solid $color-border-main;
        padding: $g 0 $g $g;
      }
      .el-form-item__content {
        padding: $g;
        // align-content: flex-start;
      }
      // .custom {
      //   .el-form-item__content {
      //     // 下面是针对type==='cell'时加的属性，也可以在el-form-item上添加{class:'f-fs-fs'}
      //     align-content: flex-start;
      //   }
      // }
      .el-form-item {
        margin: 0;
        outline: $border-main;
        height: 100%;
      }
      .el-form-item__error {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.base-form {
  height: 100%;
  .auto-fixed-foot {
    overflow: auto;
    // overscroll-behavior: auto; // 默认为auto
  }
}
</style>
