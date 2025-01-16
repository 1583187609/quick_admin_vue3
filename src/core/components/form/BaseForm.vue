<!-- summary
  目标：定位为基础（通用）表单，继承并扩展 el-form 的功能，提供快捷属性，实现快速开发。
  快捷属性：在 quickAttrs 中，例：grid、example、popover、tips、pureText、before、after、……
  表单样式风格：通用表单、单元格表单、纯文本表单
-->
<template>
  <el-form
    class="base-form f-fs-s-c f-1"
    :class="styleType"
    :model="formData"
    v-bind="defaultFormAttrs"
    @keyup.enter="handleEnter"
    ref="formRef"
  >
    <slot name="header" />
    <slot name="content" v-if="$slots.content" />
    <template v-else>
      <el-row
        class="section all-hide-scroll"
        :class="[newFields.length ? 'f-fs-s-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']"
        v-if="newFields.length"
      >
        <!-- :class="{ custom: field.type === 'custom' }" -->
        <FieldItemCol
          v-model="formData[field.prop as string]"
          :field="field"
          :formRef="formRef"
          @blur="(...args) => $emit('blur', ...args)"
          @focus="(...args) => $emit('focus', ...args)"
          @change="(...args) => $emit('change', ...args)"
          v-for="(field, ind) in newFields"
          :key="field.key ?? ind"
        >
          <template #custom="{ field: currField }">
            <slot :name="currField.prop" :field="currField" />
          </template>
        </FieldItemCol>
      </el-row>
      <BaseEmpty v-else />
    </template>
    <slot name="footer" v-if="footer">
      <FooterBtns
        :loading="loading"
        :moreBtns="moreBtns"
        :submitBtn="submitBtn"
        :resetBtn="resetBtn"
        :disabled="disabled || !newFields.length"
        :formRef="formRef"
        :omits="omits"
        :log="log"
        :debug="debug"
        :params="merge({}, formData, extraParams)"
        :fetch="fetch"
        :afterSuccess="afterSuccess"
        :afterFail="afterFail"
        :afterReset="afterReset"
        @moreBtns="(...args) => $emit('moreBtns', ...args)"
        @submit="(...args) => $emit('submit', ...args)"
        @reset="(...args) => $emit('reset', ...args)"
        ref="footerBtnsRef"
        v-if="!pureText && footer === true"
      />
    </slot>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { getHandleFields } from "./_utils";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";
import { FormField, FormFieldAttrs } from "@/core/components/form/_types";
import { defaultFormAttrs } from "@/core/components/form";
import FooterBtns, { AfterReset, FootBtn } from "./_components/FooterBtns.vue";
import { BaseBtnType } from "@/core/components/BaseBtn/_types";
import { BaseDataType, CommonObj, FinallyNext, UniteFetchType } from "@/core/_types";
import { FormStyleType } from "./_types";
import config from "@/config";
import { BaseRenderComponentType } from "../BaseRender.vue";
import { useFormAttrs } from "@/hooks";
import _ from "lodash";
import { omitAttrs } from "@/utils";

const { merge } = _;

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
    // labelWidth?: string; //label的宽度
    // grid?: Grid; //同ElementPlus 的 el-col 的属性，也可为数值：1 ~ 24
    // readonly?: boolean; //是否只读
    pureText?: boolean; //是否纯文本展示
    styleType?: FormStyleType; // 表格样式类型：cell单元格、common常用
    /**
     * 底部按钮
     */
    footer?: boolean | BaseRenderComponentType; //是否显示底部按钮
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    submitBtn?: FootBtn; //提交按钮的文字
    resetBtn?: FootBtn; //提交按钮的文字
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    loading?: boolean; //提交请求状态。控制提交按钮是否显示加载图标
    /**
     * 处理属性
     */
    extraParams?: CommonObj; //额外的参数
    omits?: boolean | BaseDataType[]; //是否剔除掉值为 undefined, null, "" 的请求参数
    fetch?: UniteFetchType;
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
    // grid: (_props: CommonObj) => (_props.styleType === "cell" ? 8 : 24),
    footer: true,
    omits: true,
    autoFixedFoot: true,
    fields: () => [],
    ...config?.BaseForm?.Index,
  }
);
const $emit = defineEmits(["update:modelValue", "moreBtns", "submit", "reset", "blur", "focus", "change"]);
const { disabled } = useFormAttrs();
const footerBtnsRef = ref<any>(null);
const formRef = ref<FormInstance>();
const newFields = ref<FormFieldAttrs[]>([]);
const formData = computed({
  get: () => props.modelValue,
  set: (val: CommonObj) => $emit("update:modelValue", val),
});
watch(
  () => props.fields,
  newVal => {
    const { data, fields } = getHandleFields(newVal, props.modelValue);
    newFields.value = fields;
    merge(formData.value, data);
  },
  { immediate: true, deep: true }
);
//处理表单的enter时间
function handleEnter() {
  footerBtnsRef.value.submit();
}

defineExpose<{
  validate: () => void;
  [key: string]: any;
}>({
  formRef,
  validate: () => footerBtnsRef.value.validate(),
  reset: () => footerBtnsRef.value.reset(),
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
