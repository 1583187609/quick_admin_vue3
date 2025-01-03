<template>
  <!-- 没有被el-form-item包裹的的空行，用作插入一些按钮或其他内容 -->
  <BaseRender :renderData="field.renderData ?? throwTplError('缺乏renderData')" v-if="formItemAttrs.type === 'custom'" />
  <el-form-item
    class="field-item"
    :class="{
      'label-h-center': formItemAttrs.quickAttrs?.popover,
      [`value-v-${formItemAttrs.quickAttrs?.valueAlignContent ?? ''}`]: true,
    }"
    v-bind="deleteAttrs(formItemAttrs, ['attrs', 'quickAttrs', 'slots', 'tpl'])"
    v-else
  >
    <!-- el-form-item 的插槽(label、error等) -->
    <template #[key]="scope" v-for="(val, key) in getFormItemSlots(formItemAttrs, formItemAttrs.quickAttrs?.popover)" :key="key">
      <BaseRender :renderData="val" :scope="scope" />
      <QuestionPopover :popover="formItemAttrs.quickAttrs?.popover" v-if="formItemAttrs.quickAttrs?.popover" />
      <!-- 冒号（：）等 -->
      <template v-if="labelSuffix">{{ labelSuffix }}</template>
    </template>
    <template v-if="formItemAttrs.quickAttrs?.before">
      <div class="mr-h" v-if="typeof formItemAttrs.quickAttrs.before === 'string'">
        {{ formItemAttrs.quickAttrs.before }}
      </div>
      <BaseRender :renderData="formItemAttrs.quickAttrs.before" v-else />
    </template>
    <slot name="custom" :field="formItemAttrs" v-if="formItemAttrs.type === 'slot'">
      <div class="color-danger">【自定义】{{ `${formItemAttrs.label}（${formItemAttrs.prop})` }}</div>
    </slot>
    <FormItem
      v-model="modelVal"
      :is="formItemAttrs.type"
      :class="flexClass"
      :field="formItemAttrs"
      @blur="(val, e) => $emit('blur', val, formItemAttrs.prop, e)"
      @focus="(val, e) => $emit('focus', val, formItemAttrs.prop, e)"
      @change="(val, e) => $emit('change', val, formItemAttrs.prop, e)"
      v-if="getIsEl(formItemAttrs.type)"
    />
    <component
      v-model="modelVal"
      :is="formItemAttrs.type"
      :class="flexClass"
      :field="formItemAttrs"
      @blur="(val, e) => $emit('blur', val, formItemAttrs.prop, e)"
      @focus="(val, e) => $emit('focus', val, formItemAttrs.prop, e)"
      @change="(val, e) => $emit('change', val, formItemAttrs.prop, e)"
      v-else-if="getIsBase(formItemAttrs.type)"
    />
    <template v-else>{{ throwTplError(`不存在此类型：${formItemAttrs.type}`) }}</template>
    <template v-if="formItemAttrs.quickAttrs?.after">
      <div class="ml-h" v-if="typeof formItemAttrs.quickAttrs.after === 'string'">{{ formItemAttrs.quickAttrs.after }}</div>
      <BaseRender :renderData="formItemAttrs.quickAttrs.after" v-else />
    </template>
    <div class="notice" v-html="'注：' + formItemAttrs.quickAttrs.tips" v-if="formItemAttrs.quickAttrs?.tips" />
  </el-form-item>
</template>
<script lang="ts" setup>
// 表单校验规则参考：https://blog.csdn.net/m0_61083409/article/details/123158056
import { defaultFormItemType, getFormItemSlots, deleteAttrs, throwTplError, defaultCommonSize } from "@/core/utils";
import { CommonObj, OptionItem, CommonSize } from "@/core/_types";
import { Grid, FormField, FormFieldAttrs } from "@/core/components/form/_types";
import { FormItemRule } from "element-plus";
import { defaultFieldAttrs, defaultFormItemTplsMap, getStandAttrsFromTpl } from ".";
import { useFormAttrs } from "@/hooks";
import { FormItemType, FormTplType } from "./_types";
import QuestionPopover from "@/core/components/QuestionPopover.vue";
import FormItem from "../FormItem/Index.vue";
import _ from "lodash";

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    field: FormFieldAttrs;
    // grid?: Grid;
    // size?: CommonSize;
    // pureText?: boolean; //是否展示纯文本
    // disabled?: boolean; //是否禁用
    // readonly?: boolean; //是否只读
    // labelSuffix?: string;
    // labelWidth?: string;
    inputDebounce?: boolean;
    hideLabel?: boolean; // 是否隐藏label
    formRef?: any;
    tplType?: FormTplType;
  }>(),
  {
    tplType: "common",
    // grid: 24,
    // size: defaultCommonSize,
  }
);
const $emit = defineEmits(["update:modelValue", "blur", "focus", "change"]);
const $attrs = useAttrs();
const { labelSuffix } = useFormAttrs({ ...props, ...$attrs });
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const formItemTpls = defaultFormItemTplsMap[props.tplType];
const formItemAttrs = computed<FormFieldAttrs>(() => {
  const { field, hideLabel } = props;
  if (field.type === "custom") return;
  /*** 合并统一 tempField ***/
  const { tpl, type = defaultFormItemType, rules = [], ...restField } = field;
  const { rules: defRules = [], ...restDefField } = defaultFieldAttrs[type] ?? {};
  const { rules: tplRules = [], ...restTplField } = tpl ? getStandAttrsFromTpl(tpl, formItemTpls) : {};
  const tempField: FormFieldAttrs = merge({}, restDefField, restTplField, restField, {
    type,
    rules: mergeRules([...defRules, ...tplRules, ...rules]),
  });
  if (restDefField?.attrs?.getInferredAttrs) {
    merge(tempField.attrs, restDefField.attrs.getInferredAttrs(tempField), field.attrs);
    delete tempField.attrs!.getInferredAttrs;
  }
  /*** 处理完善 templateField ***/
  tempField.rules = getRules(tempField);
  if (hideLabel) delete tempField.label;
  delete tempField.tpl;
  return tempField;
});
/**
 * 获取表单校验的rules
 */
function getRules(field: FormFieldAttrs) {
  const { label = "", rules = [], required } = field;
  if (!required || rules.find(it => it.required)) return rules;
  rules.unshift({ required, message: label + "必填" });
  return rules;
}
// 弹性伸缩类名
const flexClass = computed(() => {
  const { before, after, middleFlexGrow = 1 } = formItemAttrs.value.quickAttrs ?? {};
  return { [`f-${middleFlexGrow}`]: before || after };
});

// 判断是否是ElementPlus的控件（待完善）
function getIsEl(type: FormItemType) {
  const code = type.charCodeAt(0);
  return code >= 97 && code <= 122;
}
// 判断是否是系统的基础组件（待完善）
function getIsBase(type: FormItemType) {
  const code = type.charCodeAt(0);
  return code >= 65 && code <= 90;
}
//合并表单校验的rules
function mergeRules(rules: FormItemRule[] = []) {
  const arr: FormItemRule[] = [];
  const keys: string[] = ["required", "min", "max", "pattern", "validator"];
  rules.forEach((item: CommonObj) => {
    const { type } = item;
    const findInd = rules.findIndex((it: CommonObj) => {
      // if (i < ind) return false;
      if (type) return it.type === type;
      return !!keys.find(k => item[k] !== undefined && it[k] !== undefined);
    });
    findInd === -1 ? arr.push(item) : (arr[findInd] = item);
  });
  return arr;
}
// 不要删除，用作测试
// console.log(
//   "mergeRules----------",
//   mergeRules([
//     { required: true, message: "必填1" },
//     { max: 10, message: "最大10" },
//     { min: 10, message: "最小10" },
//     { pattern: /1/, message: "正则1" },
//     { max: 20, message: "最大20" },
//     { pattern: /2/, message: "正则2" },
//     { required: true, message: "必填2" },
//     { min: 20, message: "最小20" },
//   ])
// );
defineExpose({});
</script>
<style lang="scss" scoped>
.field-item {
  &.label-h-center {
    :deep(.el-form-item__label) {
      align-items: center;
    }
  }
  // 值区域的垂直方向上的布局方式
  &.value-v-flex-start {
    :deep(.el-form-item__content) {
      align-content: flex-start;
    }
  }
  &.value-v-center {
    :deep(.el-form-item__content) {
      align-content: center;
    }
  }
  &.value-v-flex-end {
    :deep(.el-form-item__content) {
      align-content: flex-end;
    }
  }
  &.value-v-space-between {
    :deep(.el-form-item__content) {
      align-content: space-between;
    }
  }
  &.value-v-space-around {
    :deep(.el-form-item__content) {
      align-content: space-around;
    }
  }
}
.notice {
  color: $color-text-light;
  font-weight: 500;
  line-height: 2;
  width: 100%;
  font-size: $font-size-lighter;
  :deep(a) {
    text-decoration: underline;
    &:hover {
      color: $color-primary;
    }
  }
}
</style>
