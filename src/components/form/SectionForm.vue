<!-- 分块（组）表单 -->
<template>
  <el-form class="section-form f-fs-s-c" :model="formData" v-bind="newAttrs" @keyup.enter="handleEnter" ref="formRef">
    <div class="all-hide-scroll f-fs-s-w" :class="{ 'auto-fixed-foot': autoFixedFoot }">
      <template v-if="newSections.length">
        <section
          class="section"
          :class="{
            [`f-span-${sItem.span ?? 24}`]: true,
          }"
          v-for="(sItem, sInd) in newSections"
          :key="sInd"
        >
          <div @click="toggleFold($event, sInd)" class="head f-sb-c">
            <div class="title f-fs-c">
              <span class="line-1">{{ sItem.title }}</span>
              <el-popover v-bind="getPopoverAttrs(sItem.popover)" v-if="sItem.popover">
                <template #reference>
                  <BaseIcon :color="cssVars.colorInfo" class="ml-q" name="QuestionFilled" v-if="sItem.popover"></BaseIcon>
                </template>
              </el-popover>
            </div>
            <slot :name="'right-' + (sItem.prop ?? sInd)"></slot>
            <BaseIcon
              @click="folds[sInd] = !folds[sInd]"
              class="fold-btn f-0"
              :class="folds[sInd] ? 'rotate-180' : ''"
              size="1.5em"
              name="CaretTop"
              v-if="foldable"
            />
          </div>
          <div class="body f-fs-fs-w" :style="{ 'max-height': folds[sInd] ? '0' : '100vh' }">
            <slot :name="sItem.prop" :form="formData" v-if="sItem.type === 'custom'"></slot>
            <template v-else>
              <template v-for="(field, ind) in sItem.fields" :key="field.key || ind">
                <!-- <BaseFormItem
                :className="`f-span-${field.span || span}`"
                :field="field"
                :pureText="field.pureText || sItem.pureText || pureText"
                v-model="modelFormItem(sItem.prop, field.prop)"
              >
                <template #custom="{ field }">
                  <slot
                    :name="field.prop"
                    :field="field"
                    :form="formData"
                  ></slot>
                </template>
              </BaseFormItem> -->
                <BaseFormItem
                  :className="`f-span-${field.span || span}`"
                  :field="field"
                  :pureText="field.pureText || sItem.pureText || pureText"
                  v-model="formData[sItem.prop][field.prop as string]"
                  @change="(prop:any,val:any)=>emits('change',prop,val)"
                  v-if="sItem.prop"
                >
                  <!-- formData[sItem.prop ? `${sItem.prop}.${field.prop}` : field.prop] -->
                  <!-- formData[sItem.prop][field.prop] -->
                  <!-- formData[field.prop] -->
                  <template #custom="{ field }">
                    <slot :name="field.prop" :field="field" :form="formData"></slot>
                  </template>
                </BaseFormItem>
                <BaseFormItem
                  :className="`f-span-${field.span || span}`"
                  :field="field"
                  :pureText="field.pureText || sItem.pureText || pureText"
                  v-model="formData[field.prop as string]"
                  @change="(prop:any,val:any)=>emits('change',prop,val)"
                  v-else
                >
                  <template #custom="{ field }">
                    <slot :name="field.prop" :field="field" :form="formData"></slot>
                  </template>
                </BaseFormItem>
              </template>
            </template>
          </div>
        </section>
      </template>
      <div class="f-c-c pb-o" v-else>空空如也~</div>
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
      :disabled="!newSections.length"
      @moreBtns="(name:string, args?:CommonObj, cb?:FinallyNext) => emits('moreBtns', name, args, cb)"
      @submit="(args:CommonObj)=>emits('submit', args)"
      ref="footerBtnsRef"
      v-if="!pureText && footer"
    />
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect } from "vue";
import { FormInstance } from "element-plus";
import { getMaxLength, typeOf, getPopoverAttrs, isProd } from "@/utils";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { merge } from "lodash";
import { handleFields } from "./_utils";
import FooterBtns from "./_components/FooterBtns.vue";
import { BaseBtnType } from "@/components/BaseBtn";
import { SectionFormItemAttrs, SectionFormItem, defaultFormAttrs } from "@/components/form";
import { CommonObj, FinallyNext, UniteFetchType, StrNum } from "@/vite-env";
import cssVars from "@/assets/styles/_var.module.scss";
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    sections?: SectionFormItem[];
    pureText?: boolean; //是否纯文本展示
    foldable?: boolean; //是否允许折叠
    fetch?: UniteFetchType; //接口请求
    fetchSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    fetchFail?: () => void; //fetch请求失败之后的回调方法
    footer?: boolean; //是否显示底部按钮
    span?: number | string; // 同ElementPlus的span，1~24
    submitText?: string; //提交按钮的文字
    resetText?: string; //提交按钮的文字
    extraParams?: CommonObj; //额外的参数
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    loading?: boolean; //提交按钮是否显示加载图标
    isOmit?: boolean; //是否剔除掉 undefined，'' 参数
    log?: boolean; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    noSubmitProps?: string[]; //提交表单时，不要提交的prop属性
    labelWidthBySection?: boolean; //表单项的labelWidth根据各部分的label文字自动确定宽度
    handleRequest?: (args: CommonObj) => CommonObj; //处理参数
  }>(),
  {
    modelValue: () => reactive({}),
    log: !isProd,
    span: 24,
    footer: true,
    isOmit: true,
    foldable: true,
    autoFixedFoot: true,
    labelWidthBySection: true,
    sections: () => [],
  }
);
const emits = defineEmits(["update:modelValue", "submit", "change", "moreBtns"]);
const footerBtnsRef = ref<any>(null);
const folds = ref<boolean[]>([]);
const formRef = ref<FormInstance>();
const newAttrs = computed(() => {
  const maxLen = Math.max(
    ...props.sections.map((sItem: SectionFormItem, sInd: number) => {
      if (typeOf(sItem) !== "Object") return 0;
      const item: SectionFormItemAttrs = sItem as SectionFormItemAttrs;
      const { fold = false } = item;
      folds.value[sInd] = fold;
      item.fields?.map((fIt: FormField) => {
        if (typeOf(fIt) !== "Object") return fIt;
        const it: FormFieldAttrs = fIt as FormFieldAttrs;
        //子级的属性影响父级的属性
        it.attrs = merge({}, item.attrs, it.attrs);
        return it;
      });
      return getMaxLength(item?.fields);
    })
  );
  return merge({ labelWidth: maxLen + "em" }, defaultFormAttrs);
});
const newSections = ref<SectionFormItemAttrs[]>([]);
// const formData = reactive<CommonObj>({});
// const params = computed(() => merge({}, formData, props.extraParams));
// watch(
//   () => props.sections,
//   (newVals) => {
//     const { modelValue, labelWidthBySection } = props;
//     newSections.value = newVals.filter((secItem: SectionFormItem) => {
//       if (typeOf(secItem) !== "Object") return false;
//       const { type, prop, fields, fieldAttrs } =
//         secItem as SectionFormItemAttrs;
//       if (typeOf(prop) !== "Undefined") {
//         const defVal = modelValue?.[prop as string];
//         formData[prop as string] =
//           type === "custom" ? defVal : handleFields(fields, emits, defVal).data;
//       } else {
//         const result = handleFields(fields, emits, modelValue, fieldAttrs);
//         let { data, fields: _fields } = result;
//         merge(formData, data);
//         if (labelWidthBySection) {
//           const labelLen = getMaxLength(fields);
//           _fields = _fields.map((field: FormFieldAttrs, ind: number) => {
//             field.labelWidth = labelLen + "em";
//             return field;
//           });
//         }
//         (secItem as SectionFormItemAttrs).fields = _fields;
//       }
//       return true;
//     }) as SectionFormItemAttrs[];
//   },
//   { immediate: true, deep: true }
// );
// watch(
//   () => props.modelValue,
//   (newVal) => {
//     merge(formData, newVal);
//   },
//   { immediate: false, deep: true }
// );
// watch(
//   formData,
//   (newVal) => {
//     merge(props.modelValue, newVal);
//   },
//   { immediate: true, deep: true }
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
  () => props.sections,
  newVals => {
    const { modelValue, labelWidthBySection } = props;
    newSections.value = newVals.filter((secItem: SectionFormItem) => {
      if (typeOf(secItem) !== "Object") return false;
      const { type, prop, fields, fieldAttrs } = secItem as SectionFormItemAttrs;
      if (typeOf(prop) !== "Undefined") {
        const defVal = modelValue?.[prop as string];
        formData.value[prop as string] = type === "custom" ? defVal : handleFields(fields, emits, defVal).data;
      } else {
        const result = handleFields(fields, emits, modelValue, fieldAttrs);
        let { data, fields: _fields } = result;
        merge(formData.value, data);
        if (labelWidthBySection) {
          const labelLen = getMaxLength(fields);
          _fields = _fields.map((field: FormFieldAttrs, ind: number) => {
            field.labelWidth = labelLen + "em";
            return field;
          });
        }
        (secItem as SectionFormItemAttrs).fields = _fields;
      }
      return true;
    }) as SectionFormItemAttrs[];
  },
  { immediate: true, deep: true }
);
function toggleFold(e: any, ind: number) {
  if (e.target?.classList?.contains("head")) {
    folds.value[ind] = !folds.value[ind];
  }
}
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
    padding: $gap 0 0;
    width: 100%;
    transition: max-height $transition-time-main;
    overflow: hidden;
  }
}
.auto-fixed-foot {
  overflow: auto;
  overscroll-behavior: auto;
}
</style>
