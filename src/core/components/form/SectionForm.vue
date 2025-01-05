<!-- summary 分组表单
  将字段分区块展示。继承并扩展了基础表单（BaseForm），提供了展开/折叠，多级属性设置覆盖等功能。
-->
<template>
  <el-form class="section-form f-fs-s-c" v-bind="defaultFormAttrs" :class="styleType" :model="formData" @keyup.enter="handleEnter" ref="formRef">
    <div class="all-hide-scroll f-fs-s-w" :class="{ 'auto-fixed-foot': autoFixedFoot }">
      <template v-if="newSections.length">
        <!-- <section class="section" v-for="(sItem, sInd) in newSections" :key="sInd">
          <div @click="toggleFold($event, sInd)" class="head f-sb-c">
            <div class="title f-0 f-fs-c">
              <span class="f-0">{{ sItem.title }}</span>
              <QuestionPopover :popover="sItem.popover" class="ml-q f-0 mr-h" v-if="sItem.popover" />
            </div>
            <slot name="head-right" :section="sItem" :index="sInd">
              <slot :name="'head-right-' + (sItem.prop ?? sInd + 1)" />
            </slot>
            <el-icon
              @click="foldStatusList[sInd] = !foldStatusList[sInd]"
              class="fold-btn f-0"
              :class="foldStatusList[sInd] ? '' : 'rotate-90'"
              size="1.5em"
              v-if="foldable"
            >
              <ArrowRight />
            </el-icon>
          </div>
          <el-row
            class="body hover-show-scroll"
            :class="bodyClass"
            :style="foldStatusList[sInd] ? { maxHeight: 0, overflow: 'hidden' } : { maxHeight: bodyMaxHeight, overflow: 'auto' }"
          >
            <slot :name="sItem.prop ?? `body-${sInd}`" :section="sItem" :index="sInd" v-if="sItem.type === 'slot'" />
            <template v-else>
              <template v-for="(field, ind) in sItem.fields" :key="field?.key ?? ind">
                <FieldItemCol
                  :field="field"
                  :formRef="formRef"
                  v-model="formData[sItem.prop][field.prop as string]"
                  v-bind="getLevelsAttrs(field, sItem)"
                  @blur="(...args) => $emit('blur', ...args)"
                  @focus="(...args) => $emit('focus', ...args)"
                  @change="(...args) => $emit('change', ...args)"
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
                  v-model="formData[field.prop as string]"
                  v-bind="getLevelsAttrs(field, sItem)"
                  @blur="(...args) => $emit('blur', ...args)"
                  @focus="(...args) => $emit('focus', ...args)"
                  @change="(...args) => $emit('change', ...args)"
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
        </section> -->
        <BaseSection
          :title="sItem.title"
          :popover="sItem.popover"
          :badgeAttrs="sItem.badgeAttrs"
          :border="false"
          foldable
          @toggle="toggleFold($event, sInd)"
          v-for="(sItem, sInd) in newSections"
          :key="sInd"
        >
          <template #head-right>
            <slot :name="'head-right-' + (sItem.prop ?? sInd)" :section="sItem" :index="sInd" />
          </template>
          <slot :name="sItem.prop ?? `body-${sInd}`" :section="sItem" :index="sInd" v-if="sItem.type === 'slot'" />
          <el-row v-else>
            <template v-for="(field, ind) in sItem.fields" :key="field?.key ?? ind">
              <FieldItemCol
                v-model="formData[sItem.prop][field.prop as string]"
                v-bind="getLevelsAttrs(field, sItem)"
                :field="field"
                :formRef="formRef"
                @blur="(...args) => $emit('blur', ...args)"
                @focus="(...args) => $emit('focus', ...args)"
                @change="(...args) => $emit('change', ...args)"
                v-if="sItem.prop"
              >
                <template #custom="scope">
                  <slot :name="scope.field.prop" v-bind="scope" />
                </template>
              </FieldItemCol>
              <FieldItemCol
                v-model="formData[field.prop as string]"
                v-bind="getLevelsAttrs(field, sItem)"
                :field="field"
                :formRef="formRef"
                @blur="(...args) => $emit('blur', ...args)"
                @focus="(...args) => $emit('focus', ...args)"
                @change="(...args) => $emit('change', ...args)"
                v-else
              >
                <template #custom="scope">
                  <slot :name="scope.field.prop" v-bind="scope" />
                </template>
              </FieldItemCol>
            </template>
          </el-row>
        </BaseSection>
      </template>
      <BaseEmpty v-else />
    </div>
    <slot name="footer" v-if="footer">
      <FooterBtns
        :loading="loading"
        :moreBtns="moreBtns"
        :submitBtn="submitBtn"
        :resetBtn="resetBtn"
        :disabled="!newSections.length"
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
        v-if="!formAttrs.pureText && footer === true"
      />
    </slot>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { typeOf } from "@/core/utils";
import { getHandleFields } from "./_utils";
import FooterBtns, { AfterReset, FootBtn } from "./_components/FooterBtns.vue";
import { BaseBtnType } from "@/core/components/BaseBtn/_types";
import { SectionFormItemAttrs, SectionFormItem } from "@/core/components/form/_types";
import { defaultFormAttrs, FormLevelsAttrs } from "@/core/components/form";
import { BaseDataType, CommonObj, CommonSize, FinallyNext, UniteFetchType } from "@/core/_types";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";
import { FormStyleType } from "./_types";
import { Grid } from "./_components/FieldItem/_types";
import { defaultCommonSize } from "@/core/utils";
import QuestionPopover from "@/core/components/QuestionPopover.vue";
import { ArrowRight } from "@element-plus/icons-vue";
import config from "@/config";
import { useFormAttrs, useNextCallback, usePopup } from "@/core/hooks";
import { BaseRenderComponentType } from "../BaseRender.vue";
import _ from "lodash";

const { merge } = _;

const { closePopup } = usePopup();
const props = withDefaults(
  defineProps<{
    /**
     * 基础属性
     */
    modelValue?: CommonObj; //表单数据
    sections?: SectionFormItem[];
    bodyMaxHeight?: string; // body内容区域的最大高度
    foldable?: boolean; //是否允许折叠
    defaultExpands?: number[]; // 默认展开的块
    accordion?: boolean; // 是否手风琴模式
    bodyClass?: string;
    /**
     * 继承属性
     */
    // labelWidth?: string; //label的宽度
    // grid?: Grid; // 同ElementPlus的el-col的属性，可为数值：1~24
    // size?: CommonSize; //是否禁用
    // 布尔值必须写，不然从$attrs传过来后，会处理成''
    readonly?: boolean; //是否只读
    disabled?: boolean; //是否禁用
    pureText?: boolean; //是否纯文本展示
    styleType?: FormStyleType;
    /**
     * 底部按钮
     */
    footer?: boolean | BaseRenderComponentType; //是否显示底部按钮
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    submitBtn?: FootBtn; //提交按钮的文字
    resetBtn?: FootBtn; //提交按钮的文字
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    loading?: boolean; //提交按钮是否显示加载图标
    /**
     * 处理属性
     */
    extraParams?: CommonObj; //额外的参数
    omits?: boolean | BaseDataType[]; //是否剔除掉值为 undefined, null, "" 的参数
    fetch?: UniteFetchType;
    afterSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    afterFail?: () => void; //fetch请求失败之后的回调方法
    afterReset?: AfterReset; // 重置之后的处理方法
    /**
     * 调试属性
     */
    log?: boolean | string; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
  }>(),
  {
    modelValue: () => reactive({}),
    bodyClass: "f-fs-fs-w",
    styleType: "common",
    // size: defaultCommonSize,
    // grid: 24,
    footer: true,
    omits: true,
    foldable: true,
    bodyMaxHeight: "90vh",
    autoFixedFoot: true,
    sections: () => [],
    ...config?.SectionForm?.Index,
  }
);
const $emit = defineEmits(["update:modelValue", "toggle", "moreBtns", "submit", "reset", "blur", "focus", "change"]);
const $attrs = useAttrs();
const formAttrs = useFormAttrs({ ...props, ...$attrs }, undefined, true);
const footerBtnsRef = ref<any>(null);
const foldStatusList = ref<boolean[]>(getInitFolds(props.defaultExpands));
const formRef = ref<FormInstance>();
const newSections = ref<SectionFormItemAttrs[]>([]);
const formData = computed({
  get: () => props.modelValue,
  set: (val: CommonObj) => $emit("update:modelValue", val),
});
watch(
  () => props.sections,
  newVals => {
    const { modelValue } = props;
    newSections.value = newVals.filter((secItem: SectionFormItem) => {
      if (typeOf(secItem) !== "Object") return false;
      const { type, prop, fields } = secItem as SectionFormItemAttrs;
      if (typeOf(prop) !== "Undefined") {
        const defVal = modelValue?.[prop as string];
        formData.value[prop as string] = type === "slot" ? defVal : getHandleFields(fields, defVal).data;
      } else {
        const { fields: _fields, data } = getHandleFields(fields, modelValue);
        merge(formData.value, data);
        (secItem as SectionFormItemAttrs).fields = _fields;
      }
      return true;
    }) as SectionFormItemAttrs[];
  },
  { immediate: true, deep: true }
);
function getInitFolds(expands?: number[]) {
  const { sections } = props;
  if (!expands?.length || !sections?.length) return [];
  const arr = Array(sections.length).fill(true);
  expands.forEach(ind => (arr[ind] = false));
  return arr;
}
function toggleFold(e: any, ind: number) {
  if (!e.target?.classList?.contains("head")) return;
  const { accordion } = props;
  if (!accordion) {
    foldStatusList.value[ind] = !foldStatusList.value[ind];
  } else {
    newSections.value?.forEach((it, i) => {
      foldStatusList.value[i] = ind !== i;
    });
  }
  $emit("toggle", ind, !foldStatusList.value[ind]);
}
function getLevelsAttrs(field, sItem) {
  const { attrs = {}, quickAttrs = {} } = field;
  const { size = field.size ?? sItem.size ?? formAttrs.size, labelWidth = field?.labelWidth ?? sItem.labelWidth ?? formAttrs.labelWidth } = attrs;
  const {
    grid = sItem.grid ?? formAttrs.grid,
    readonly = sItem.readonly || formAttrs.readonly,
    pureText = sItem?.pureText || formAttrs.pureText,
    disabled = sItem.disabled || formAttrs.disabled,
  } = quickAttrs;
  return { size, labelWidth, grid, readonly, pureText, disabled };
}
//处理表单的enter时间
function handleEnter() {
  footerBtnsRef.value.submit();
}
defineExpose({
  formRef,
  validate() {
    return footerBtnsRef.value.validate();
  },
  reset() {
    footerBtnsRef.value.reset();
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
// .section {
//   width: 100%;
//   margin-bottom: $gap;
//   .head {
//     padding: $gap-qtr;
//     border-bottom: $border-main;
//     .title {
//       margin-right: auto;
//       font-size: $font-size-heavy;
//       &::before {
//         content: "";
//         display: block;
//         width: 6px;
//         height: 1em;
//         border-radius: 3px;
//         background: $color-primary;
//         margin-right: $gap-half;
//       }
//     }
//     .fold-btn {
//       padding: 0.2em;
//       margin-left: $gap-qtr;
//       cursor: pointer;
//       transition: all $transition-time-main;
//       &:hover {
//         color: $color-primary;
//       }
//     }
//   }
//   .body {
//     margin: $gap 0 0;
//     width: 100%;
//     transition: max-height $transition-time-main;
//     overscroll-behavior: auto;
//   }
// }
.auto-fixed-foot {
  overflow: auto;
  // overscroll-behavior: auto; // 默认为auto
}
</style>
