<!-- summary
  目标：定位为分块（组）表单。
  功能：继承并扩展基础表单（BaseForm），并扩展了展开/折叠，多级属性设置等功能。
-->
<template>
  <el-form
    class="section-form f-fs-s-c"
    :class="type"
    :model="formData"
    v-bind="defaultFormAttrs"
    @keyup.enter="handleEnter"
    ref="formRef"
  >
    <div class="all-hide-scroll f-fs-s-w" :class="{ 'auto-fixed-foot': autoFixedFoot }">
      <template v-if="newSections.length">
        <section class="section" v-for="(sItem, sInd) in newSections" :key="sInd">
          <!-- @click="toggleFold($event, sInd)" -->
          <div class="head f-sb-c">
            <div class="title f-0 f-fs-c">
              <span class="f-0">{{ sItem.title }}</span>
              <QuestionPopover :popover="sItem.popover" class="ml-q f-0 mr-h" v-if="sItem.popover" />
            </div>
            <slot name="head-right" :section="sItem" :index="sInd">
              <slot :name="'head-right-' + (sItem.prop ?? sInd + 1)" />
            </slot>
            <el-icon
              @click="folds[sInd] = !folds[sInd]"
              class="fold-btn f-0"
              :class="folds[sInd] ? 'rotate-180' : ''"
              size="1.5em"
              v-if="foldable"
            >
              <CaretTop />
            </el-icon>
          </div>
          <el-row class="body f-fs-fs-w" :style="{ 'max-height': folds[sInd] ? '0' : '100vh' }">
            <slot name="body" :section="sItem" :index="sInd" v-if="sItem.type === 'custom'">
              <slot :name="sItem.prop" />
            </slot>
            <!-- <slot :name="sItem.prop" v-if="sItem.type === 'custom'"/> -->
            <template v-else>
              <template v-for="(field, ind) in sItem.fields" :key="field?.key ?? ind">
                <FieldItemCol
                  :field="field"
                  :formRef="formRef"
                  v-bind="getLevelsAttrs(field, sItem)"
                  v-model="formData[sItem.prop][field.prop as string]"
                  @blur="(...args) => $emit('blur', ...args)"
                  @focus="(...args) => $emit('focus', ...args)"
                  @change="(val:any, prop:any) => $emit('change', val, prop)"
                  v-if="sItem.prop"
                >
                  <template #custom="scope">
                    <slot name="field" :field="scope.field">
                      <slot :name="scope.field.prop" :field="scope.field" />
                    </slot>
                  </template>
                </FieldItemCol>
                <FieldItemCol
                  :field="field"
                  :formRef="formRef"
                  v-bind="getLevelsAttrs(field, sItem)"
                  v-model="formData[field.prop as string]"
                  @blur="(...args) => $emit('blur', ...args)"
                  @focus="(...args) => $emit('focus', ...args)"
                  @change="(val:any, prop:any) => $emit('change', val, prop)"
                  v-else
                >
                  <template #custom="scope">
                    <slot name="field" :field="scope.field">
                      <slot :name="scope.field.prop" :field="scope.field" />
                    </slot>
                  </template>
                </FieldItemCol>
              </template>
            </template>
          </el-row>
        </section>
      </template>
      <BaseEmpty v-else />
    </div>
    <slot name="footer" v-if="footer">
      <FooterBtns
        :loading="loading"
        :moreBtns="moreBtns"
        :submitText="submitText"
        :resetText="resetText"
        :disabled="!newSections.length"
        :formRef="formRef"
        :omit="omit"
        :log="log"
        :debug="debug"
        :params="params"
        :fetch="fetch"
        :afterSuccess="afterSuccess"
        :afterFail="afterFail"
        :handleRequest="handleRequest"
        :handleResponse="handleResponse"
        @moreBtns="(name:string, args?:CommonObj, cb?:FinallyNext) => $emit('moreBtns', name, args, cb)"
        @submit="(args:CommonObj)=>$emit('submit', args)"
        ref="footerBtnsRef"
        v-if="!pureText"
      />
    </slot>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { typeOf, isProd } from "@/core/_utils";
import { handleFields } from "./_utils";
import FooterBtns from "./_components/FooterBtns.vue";
import { BaseBtnType } from "@/core/BaseBtn/_types";
import { SectionFormItemAttrs, SectionFormItem } from "@/core/form/_types";
import { defaultFormAttrs, FormLevelsAttrs, getFormLevelAttrs } from "@/core/form";
import { CommonObj, CommonSize, FinallyNext, UniteFetchType } from "@/vite-env";
import FieldItemCol from "@/core/form/_components/FieldItemCol/Index.vue";
import { FormStyleType } from "./_types";
import { Grid } from "./_components/FieldItem/_types";
import { defaultCommonSize } from "@/core/_utils";
import QuestionPopover from "@/core/QuestionPopover.vue";
import { CaretTop } from "@element-plus/icons-vue";
import config from "@/config";
import _ from "lodash";

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    type?: FormStyleType;
    sections?: SectionFormItem[];
    pureText?: boolean; //是否纯文本展示
    readonly?: boolean; //是否只读
    disabled?: boolean; //是否禁用
    size?: CommonSize; //是否禁用
    labelWidth?: string; //label的宽度
    scrollToError?: boolean; //校验失败后是否自动滚到失败位置
    foldable?: boolean; //是否允许折叠
    fetch?: UniteFetchType; //接口请求
    afterSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    afterFail?: () => void; //fetch请求失败之后的回调方法
    footer?: boolean; //是否显示底部按钮
    grid?: Grid; // 同ElementPlus的el-col的属性，可为数值：1~24
    submitText?: string; //提交按钮的文字
    resetText?: string; //提交按钮的文字
    extraParams?: CommonObj; //额外的参数
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    loading?: boolean; //提交按钮是否显示加载图标
    omit?: boolean; //是否剔除掉值为 undefined, null, “” 的参数
    log?: boolean; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    handleRequest?: (args: any) => any; // 处理请求参数
    handleResponse?: (data: any) => any; // 处理请求数据
  }>(),
  {
    modelValue: () => reactive({}),
    type: "common",
    size: defaultCommonSize,
    scrollToError: true,
    grid: 24,
    footer: true,
    omit: true,
    foldable: true,
    autoFixedFoot: true,
    sections: () => [],
    ...config?.SectionForm?.Index,
  }
);
const $emit = defineEmits(["update:modelValue", "submit", "change", "blur", "focus", "moreBtns"]);
const $attrs = useAttrs();
provide(FormLevelsAttrs, getFormLevelAttrs({ ...props, ...$attrs }));
const footerBtnsRef = ref<any>(null);
const folds = ref<boolean[]>([]);
const formRef = ref<FormInstance>();
const newSections = ref<SectionFormItemAttrs[]>([]);
const formData = computed({
  get: () => props.modelValue,
  set: (val: CommonObj) => $emit("update:modelValue", val),
});
const params = computed(() => merge({}, formData.value, props.extraParams));
watch(
  () => props.sections,
  newVals => {
    const { modelValue } = props;
    newSections.value = newVals.filter((secItem: SectionFormItem) => {
      if (typeOf(secItem) !== "Object") return false;
      const { type, prop, fields } = secItem as SectionFormItemAttrs;
      if (typeOf(prop) !== "Undefined") {
        const defVal = modelValue?.[prop as string];
        formData.value[prop as string] = type === "custom" ? defVal : handleFields(fields, $emit, defVal).data;
      } else {
        const result = handleFields(fields, $emit, modelValue);
        const { fields: _fields } = result;
        const { data } = result;
        merge(formData.value, data);
        (secItem as SectionFormItemAttrs).fields = _fields;
      }
      return true;
    }) as SectionFormItemAttrs[];
  },
  { immediate: true, deep: true }
);
// function toggleFold(e: any, ind: number) {
//   if (e.target?.classList?.contains("head")) {
//     folds.value[ind] = !folds.value[ind];
//   }
// }
// function getLevelsAttrs(field, sItem) {
//   const { grid, readonly, pureText, disabled, size, labelWidth } = props;
//   return {
//     grid: field?.quickAttrs?.grid ?? sItem.grid ?? grid,
//     readonly: field?.quickAttrs?.readonly ?? sItem.readonly ?? readonly,
//     pureText: field?.quickAttrs?.pureText ?? sItem?.pureText ?? pureText,
//     disabled: field?.quickAttrs?.disabled ?? sItem.disabled ?? disabled,
//     size: field?.attrs?.size ?? field.size ?? sItem.size ?? size,
//     labelWidth: field?.labelWidth ?? sItem.labelWidth ?? labelWidth,
//   };
// }
function getLevelsAttrs(field, sItem) {
  const { attrs = {}, quickAttrs = {} } = field;
  const {
    size = field.size ?? sItem.size ?? props.size,
    labelWidth = field?.labelWidth ?? sItem.labelWidth ?? props.labelWidth,
  } = attrs;
  const {
    grid = sItem.grid ?? props.grid,
    readonly = sItem.readonly ?? props.readonly,
    pureText = sItem?.pureText ?? props.pureText,
    disabled = sItem.disabled ?? props.disabled,
  } = quickAttrs;
  return { size, labelWidth, grid, readonly, pureText, disabled };
}
//处理表单的enter时间
function handleEnter() {
  if (props.fetch) return footerBtnsRef.value.submit();
  $emit("submit", params.value);
}
defineExpose({
  formRef,
  formValidate() {
    return footerBtnsRef.value.formValidate();
  },
});
</script>
<style lang="scss">
// $border-main: 1px solid red;
$g: 4px; // 2px 4px 6px small default large
.section-form {
  &.cell {
    .section {
      outline: $border-main;
      border: $border-main;
      border-radius: $radius-main;
      .head {
        background: $color-bg-main;
      }
      .body {
        margin: 0;
        // border-top: 1px solid $color-border-main;
      }
      .el-form-item__label-wrap {
        border-right: 2px solid $color-border-main;
        padding: $g 0 $g $g;
      }
      .el-form-item__content {
        padding: $g;
      }
      .el-form-item {
        margin: 0;
        outline: $border-main;
      }
      .el-form-item__error {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.section-form {
  height: 100%;
}
.section {
  width: 100%;
  margin-bottom: $gap;
  .head {
    padding: $gap-qtr;
    border-bottom: $border-main;
    .title {
      margin-right: auto;
      font-size: $font-size-heavy;
      &::before {
        content: "";
        display: block;
        width: 6px;
        height: 1em;
        border-radius: 3px;
        background: $color-primary;
        margin-right: $gap-half;
      }
    }
    .fold-btn {
      margin-left: $gap-qtr;
      cursor: pointer;
      transition: all $transition-time-main;
      &:hover {
        color: $color-primary;
      }
    }
  }
  .body {
    margin: $gap 0 0;
    width: 100%;
    transition: max-height $transition-time-main;
    overflow: hidden;
  }
}
.auto-fixed-foot {
  overflow: auto;
  // overscroll-behavior: auto; // 默认为auto
}
</style>
