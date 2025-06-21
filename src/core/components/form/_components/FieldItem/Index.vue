<!-- 没有被el-form-item包裹的的空行，用作插入一些按钮或其他内容 -->
<template>
  <div class="mb-18" v-bind="formItemAttrs.attrs" v-if="formItemAttrs.type === 'custom'">
    <BaseRender :renderData="formItemAttrs.renderData ?? throwTplError('缺乏renderData')" />
  </div>
  <el-form-item
    class="field-item"
    :class="{
      'label-h-center': formItemAttrs.quickAttrs?.explain,
      [`value-v-${formItemAttrs.quickAttrs?.valueAlignContent ?? ''}`]: true,
    }"
    v-bind="deleteAttrs(formItemAttrs, ['attrs', 'quickAttrs', 'slots', 'tpl'])"
    :prop="prefixProp ? `${prefixProp}.${formItemAttrs.prop}` : formItemAttrs.prop"
    v-else
  >
    <!-- el-form-item 的插槽(label、error等) -->
    <template #[key]="scope" v-for="(val, key) in getFormItemSlots(formItemAttrs)" :key="key">
      <BaseRender :renderData="val" :scope="scope" />
      <ExplainPopover :explain="formItemAttrs.quickAttrs?.explain" v-if="formItemAttrs.quickAttrs?.explain" />
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
    <template v-else>
      <template v-if="formItemAttrs.quickAttrs?.pureText || pureText">
        {{ optionVal }}
      </template>
      <template v-else>
        <FormItem
          v-model="modelVal"
          :is="formItemAttrs.type"
          :class="flexClass"
          :field="formItemAttrs"
          @blur="(val, e) => $emit('blur', val, formItemAttrs.prop, e)"
          @focus="(val, e) => $emit('focus', val, formItemAttrs.prop, e)"
          @change="(val, e) => $emit('change', val, formItemAttrs.prop, e)"
          v-if="getIsEl(formItemAttrs.type as FormItemType)"
        />
        <component
          v-model="modelVal"
          :is="formItemAttrs.type"
          :class="flexClass"
          :prefixProp="['BaseAnyEleList', 'BaseAddDelList'].includes(formItemAttrs.type as FormItemType) ? formItemAttrs.prop : undefined"
          v-bind="formItemAttrs.attrs"
          @blur="(val, e) => $emit('blur', val, formItemAttrs.prop, e)"
          @focus="(val, e) => $emit('focus', val, formItemAttrs.prop, e)"
          @change="(val, e) => $emit('change', val, formItemAttrs.prop, e)"
          v-else-if="getIsBase(formItemAttrs.type as FormItemType)"
        />
        <template v-else>{{ throwTplError(`不存在此类型：${formItemAttrs.type}`) }}</template>
      </template>
    </template>
    <template v-if="formItemAttrs.quickAttrs?.after">
      <div class="ml-h" v-if="typeof formItemAttrs.quickAttrs.after === 'string'">{{ formItemAttrs.quickAttrs.after }}</div>
      <BaseRender :renderData="formItemAttrs.quickAttrs.after" v-else />
    </template>
    <template v-if="formItemAttrs.quickAttrs?.tips">
      <div class="notice" v-html="'注：' + formItemAttrs.quickAttrs.tips" v-if="typeof formItemAttrs.quickAttrs.tips === 'string'" />
      <BaseRender :renderData="formItemAttrs.quickAttrs.tips" v-else />
    </template>
  </el-form-item>
</template>
<script lang="ts" setup>
// 表单校验规则参考：https://blog.csdn.net/m0_61083409/article/details/123158056
import { emptyVals } from "@/core/consts";
import { defaultRangeJoinChar, defaultEmptyStr, defaultFormItemType } from "@/core/config";
import { getFormItemSlots, deleteAttrs, throwTplError, getTextFromOpts, getStandardTplInfo } from "@/core/utils";
import { CommonObj, OptionItem } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { defaultFieldAttrs, defaultFormItemTplsMap } from "./_config";
import { useDict } from "@/hooks";
import { FormItemType, FormTplType, RuleItem } from "./_types";
import ExplainPopover from "@/core/components/ExplainPopover.vue";
import FormItem from "../FormItem/Index.vue";
import { typeOf } from "@/utils";
import { DictName } from "@/dict/_types";
import _ from "lodash";
import { asyncComputed } from "@vueuse/core";

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    field: FormFieldAttrs;
    prefixProp?: string;
    pureText?: boolean; //是否展示纯文本
    // disabled?: boolean; //是否禁用
    // readonly?: boolean; //是否只读
    labelSuffix?: string;
    // labelWidth?: string;
    inputDebounce?: boolean;
    hideLabel?: boolean; // 是否隐藏label
    tplType?: FormTplType;
  }>(),
  {
    tplType: "common",
  }
);
const $emit = defineEmits(["update:modelValue", "blur", "focus", "change"]);
const { getOpts } = useDict();
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const formItemTpls = defaultFormItemTplsMap[props.tplType];
const formItemAttrs = computed<FormFieldAttrs>(() => {
  const { field, hideLabel } = props;
  if (field.type === "custom") return field;
  /*** 合并统一 tempField ***/
  const { tpl, type = defaultFormItemType, rules = [], ...restField } = field;
  const { rules: defRules = [], ...restDefField } = defaultFieldAttrs[type] ?? {};
  const { rules: tplRules = [], ...restTplField } = tpl ? getStandardTplInfo(tpl, formItemTpls) : {};
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
function mergeRules(rules: RuleItem[] = []) {
  const arr: RuleItem[] = [];
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
// 获取标准下拉项
async function getStandardOptions(opts): Promise<OptionItem[]> {
  if (!opts) return [];
  const t = typeOf(opts);
  if (t === "String") {
    const newOpts = getOpts(opts as DictName);
    const nt = typeOf(newOpts);
    if (nt === "Array") return newOpts as OptionItem[];
    throw new Error(`暂未处理此类型：${nt}`);
    // return getOpts(opts);
  }
  if (t === "Array") return opts;
  if (t === "Promise") return await opts;
  throw new Error(`暂未处理此种options的类型：${t}`);
}
const optionVal = asyncComputed(async () => (await getOptionValue(formItemAttrs.value, modelVal.value)).value);
//获取表单键值对的值
async function getOptionValue(field: FormFieldAttrs, val: any) {
  const { type = defaultFormItemType, label, attrs = {}, quickAttrs = {} } = field;
  const stanOpts = await getStandardOptions(attrs.options);
  if (["select", "radio-group"].includes(type)) {
    val = stanOpts?.find(it => it.value === val)?.label;
  } else if (type.includes("Time") || type.includes("date")) {
    const { format } = merge({}, defaultFieldAttrs[type]?.attrs, attrs);
    const isArr = typeOf(val) === "Array";
    const joinStr = ` ${defaultRangeJoinChar} `;
    if (quickAttrs?.pureText || props.pureText) {
      val = isArr ? val.join(joinStr) : val;
    } else {
      val = isArr ? val.map((it: any) => it.format(format)).join(joinStr) : val?.format(format);
    }
  } else if (type === "checkbox-group") {
    val = stanOpts
      ?.filter((it: OptionItem) => val.includes(it.value))
      ?.map((it: OptionItem) => it.label)
      .join("，");
  } else if (type === "input-number") {
    const { after = "" } = quickAttrs;
    if (val) val = val + after;
  } else if (type === "switch") {
    const { activeText = "是", inactiveText = "否", activeValue } = attrs;
    val = activeValue === val ? activeText : inactiveText;
  } else if (type === "checkbox") {
    // val = val ? "是" : "否";
    val = stanOpts.find(it => it.value === val)?.label;
  } else if (type === "cascader") {
    val = getTextFromOpts(stanOpts, val);
  } else if (type === "BaseNumberRange") {
    val = val?.join(defaultRangeJoinChar);
  } else if (type === "slot") {
    val = defaultEmptyStr;
  } else {
    new Error(`暂未处理此种类型：${type}`);
  }
  if (emptyVals.includes(val)) val = defaultEmptyStr;
  return { label, value: val };
}
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
  color: $color-text-lighter;
  font-weight: 500;
  margin-top: $gap-half;
  line-height: 1.4;
  width: 100%;
  font-size: $font-size-light;
  :deep(a) {
    text-decoration: underline;
    &:hover {
      color: $color-primary;
    }
  }
}
</style>
