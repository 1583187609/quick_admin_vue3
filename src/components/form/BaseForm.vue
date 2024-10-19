<!-- summary
  基础表单。除了实现ElementPlus的默认功能外，还在extraAttrs中提供了grid、example、popover、tips、pureText、rulesType、before、after、……等功能
-->
<template>
  <el-form class="base-form f-fs-s-c f-1" :class="type" :model="formData" v-bind="defaultFormAttrs" @keyup.enter="handleEnter" ref="formRef">
    <slot name="custom" v-if="$slots.custom" />
    <el-row class="section all-hide-scroll" :class="[newFields.length ? 'f-fs-s-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']" v-else>
      <template v-if="newFields.length">
        <!-- :class="{ custom: field.type === 'custom' }" -->
        <FieldItemCol
          :grid="grid"
          :size="size"
          :field="field"
          :readonly="readonly"
          :pureText="pureText"
          v-model="formData[field.prop as string]"
          @change="(prop:any,val:any)=>$emit('change',prop,val)"
          :formRef="formRef"
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
        :submitText="submitText"
        :resetText="resetText"
        :formRef="formRef"
        :isOmit="isOmit"
        :log="log"
        :debug="debug"
        :params="params"
        :fetch="fetch"
        :afterSuccess="afterSuccess"
        :afterFail="afterFail"
        :noSubmitProps="noSubmitProps"
        :handleRequest="handleRequest"
        :disabled="!newFields.length"
        @moreBtns="(name:string, args?:CommonObj, cb?:FinallyNext) => $emit('moreBtns', name, args, cb)"
        @submit="(args:CommonObj)=>$emit('submit', args)"
        ref="footerBtnsRef"
        v-if="!pureText"
      />
    </slot>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, useSlots } from "vue";
import { FormInstance } from "element-plus";
import { handleFields } from "./_utils";
import FieldItemCol from "@/components/form/_components/FieldItemCol/Index.vue";
import { FormField, FormFieldAttrs, Grid } from "@/components/form/_types";
import FooterBtns from "./_components/FooterBtns.vue";
import { isProd } from "@/components/_utils";
import { BaseBtnType } from "@/components/BaseBtn/_types";
import { defaultFormAttrs } from "@/components/form";
import { CommonObj, CommonSize, FinallyNext, UniteFetchType } from "@/vite-env";
import { FormStyleType } from "./_types";
import { defaultCommonSize } from "@/components/_utils";
import _ from "lodash";

const { merge } = _;
const $slots = useSlots();
const props = withDefaults(
  defineProps<{
    type?: FormStyleType;
    size?: CommonSize;
    modelValue?: CommonObj; //表单数据
    fields?: FormField[]; //表单字段项
    readonly?: boolean; //是否只读
    pureText?: boolean; //是否纯文本展示
    fetch?: UniteFetchType; //请求接口，一般跟fetchSuccess，fetchFail一起配合使用
    afterSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    afterFail?: FinallyNext; //fetch请求失败之后的回调方法
    grid?: Grid; //同ElementPlus 的 el-col 的属性，也可为数值：1 ~ 24
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
    type: "",
    size: defaultCommonSize,
    modelValue: () => reactive({}),
    log: !isProd,
    grid: (_props: CommonObj) => (_props.type === "cell" ? 8 : 24),
    footer: true,
    isOmit: true,
    autoFixedFoot: true,
    fields: () => [],
  }
);
const $emit = defineEmits(["update:modelValue", "submit", "change", "moreBtns"]);
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
  $emit("submit", params.value);
}

defineExpose<{
  formValidate: () => void;
  [key: string]: any;
}>({
  formRef,
  formValidate() {
    return footerBtnsRef.value.formValidate();
  },
});
</script>
<style lang="scss">
// $border-main: 1px solid red;
$g: 4px; // 2px 4px 6px small default large
.base-form {
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
    overscroll-behavior: auto;
  }
}
</style>
