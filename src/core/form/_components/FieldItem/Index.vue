<template>
  <el-form-item
    class="field-item"
    :class="{ 'label-h-center': !!currQuickAttrs?.popover, [`value-v-${currQuickAttrs?.valueAlignContent}`]: true }"
    v-bind="formItemAttrs"
    v-if="typeof currType === 'string'"
  >
    <!-- el-form-item 的插槽(label、error等) -->
    <template #[key] v-for="(val, key) in getFormItemSlots(formItemAttrs, currQuickAttrs?.popover)" :key="key">
      <BaseRender :data="val" />
      <QuestionPopover :popover="currQuickAttrs?.popover" v-if="currQuickAttrs?.popover" />
      <template v-if="labelSuffix">{{ labelSuffix }}</template>
    </template>
    <template v-if="!subFields.length">
      <template v-if="newPureText">
        <slot name="custom" :field="formItemAttrs" v-if="currType === 'custom'" />
        <template v-else>
          {{ getOptionValue(formItemAttrs, modelVal).value }}
        </template>
      </template>
      <template v-else>
        <template v-if="currQuickAttrs?.before">
          <div class="mr-h" v-if="typeof currQuickAttrs.before === 'string'">
            {{ currQuickAttrs.before }}
          </div>
          <BaseRender :data="currQuickAttrs.before" v-else />
        </template>
        <slot name="custom" :field="formItemAttrs" v-if="currType === 'custom'">
          <div class="color-danger">【自定义】{{ `${formItemAttrs.label}（${formItemAttrs.prop})` }}</div>
        </slot>
        <FormItem
          v-model="modelVal"
          :elType="currType"
          :name="formItemAttrs.prop"
          :class="flexClass"
          :slots="currSlots"
          :subOptions="currOptions"
          v-bind="currAttrs"
          @blur="handleBlur"
          @focus="handleFocus"
          @change="handleChange"
          v-if="getIsEl()"
        />
        <component
          v-model="modelVal"
          :is="currType"
          :class="flexClass"
          v-bind="currAttrs"
          @blur="handleBlur"
          @focus="handleFocus"
          @change="handleChange"
          v-else-if="getIsBase()"
        />
        <template v-else>{{ throwTplError(`不存在此类型：${currType}`) }}</template>
        <template v-if="currQuickAttrs?.after">
          <div class="ml-h" v-if="typeof currQuickAttrs.after === 'string'">{{ currQuickAttrs.after }}</div>
          <BaseRender :data="currQuickAttrs.after" v-else />
        </template>
      </template>
      <div class="notice" v-html="'注：' + currQuickAttrs.tips" v-if="currQuickAttrs?.tips" />
    </template>
    <!-- 当有子项表单时 -->
    <template v-else>
      <AddDelList v-model="modelVal" :fields="subFields" :parentProp="formItemAttrs.prop" :formRef="formRef" v-if="currType === 'addDel'" />
      <AnyEleList v-model="modelVal" :fields="subFields" :prefixProp="formItemAttrs.prop" v-else-if="currType === 'childrenFields'" />
      <template v-else>{{ throwTplError(`不存在此子类型：${currType}`) }}</template>
    </template>
  </el-form-item>
  <!-- 没有被el-form-item包裹的的空行，用作插入一些按钮或其他内容 -->
  <BaseRender :data="currType" v-else />
</template>
<script lang="ts" setup>
// 表单校验规则参考：https://blog.csdn.net/m0_61083409/article/details/123158056
import { typeOf, getTextFromOpts, defaultFormItemType, defaultFormChildrenType, emptyStr, getFormItemSlots } from "@/core/_utils";
import { CommonObj, OptionItem, CommonSize } from "@/vite-env";
import { Grid, FormField, FormFieldAttrs } from "@/core/form/_types";
import { FormItemRule } from "element-plus";
import { defaultFieldAttrs, defaultRulesTypes } from ".";
import { rangeJoinChar, emptyVals, throwTplError } from "@/core/_utils";
import { useDict, useFormAttrs } from "@/hooks";
import { FormItemType } from "./_types";
import { defaultCommonSize } from "@/core/_utils";
import { DictName } from "@/dict/_types";
import QuestionPopover from "@/core/QuestionPopover.vue";
import FormItem from "../FormItem/Index.vue";
import _ from "lodash";
// 下列两个组件不采用按需加载方式，不然控件会出现延迟出现的现象
import AddDelList from "../AddDelList.vue";
import AnyEleList from "../AnyEleList.vue";
import { BaseRenderData } from "@/core/BaseRender.vue";

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
    prefixProp?: string; //前置prop属性
    inputDebounce?: boolean;
    isChild?: boolean; //是否是父级children 的子级
    formRef?: any;
  }>(),
  {
    // grid: 24,
    // size: defaultCommonSize,
  }
);

const $emit = defineEmits(["update:modelValue", "change", "blur", "focus"]);
const $attrs = useAttrs();
const { labelSuffix, pureText } = useFormAttrs({ ...props, ...$attrs });
const newPureText = ref(pureText);
let currType = ref<FormItemType | BaseRenderData>(defaultFormItemType);
let currSlots: any; // 当前表单控件的插槽
let currOptions: any;
let currFormItemSlots: any; // 当前el-form-item的插槽
let currQuickAttrs: any;
let currChildren: any;
let currAttrs: any;
const { getOpts } = useDict();
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const subFields = ref<FormFieldAttrs[]>([]);
const formItemAttrs = computed<FormFieldAttrs>(() => {
  const { prefixProp, field, isChild } = props;
  // let tempField: FormFieldAttrs = JSON.parse(JSON.stringify(field));
  /*** 合并统一 tempField ***/
  const rulesType = field.quickAttrs?.rulesType;
  const validField: CommonObj = rulesType ? defaultRulesTypes[rulesType] : undefined;
  const vType = validField?.type;
  const endType = field.type ?? vType ?? (field.children?.length ? defaultFormChildrenType : defaultFormItemType);
  const defField = defaultFieldAttrs[endType];
  const tempField: FormFieldAttrs = merge({ type: endType }, defField, validField, field);
  if (defField?.attrs?.getInferredAttrs) {
    merge(tempField.attrs, defField.attrs.getInferredAttrs(tempField), field.attrs);
    delete tempField.attrs!.getInferredAttrs;
  }
  /*** 推断完善 templateField ***/
  if (tempField.children?.length) {
    const { children, required } = tempField;
    subFields.value = children as FormFieldAttrs[];
    // // 当是 addDel 类型的子项时，如果子项都未设置 required，则默认父级需显示必传红星符号
    // if (type === "addDel") {
    //   const someRequired = children.some((item: FormField, ind: number) => {
    //     const isLast = ind === children.length - 1;
    //     if (typeof item === "object") return item?.required ?? (isLast ? true : false);
    //     return false;
    //   });
    //   if (someRequired) tempField.required = true;
    // } else {
    // 当子项有一个必填项时，父级自动变为必填项
    if (required === undefined) {
      const someRequired = children.some((item: FormField) => {
        if (typeof item === "object") return item?.required ?? false;
        return false;
      });
      if (someRequired) tempField.required = true;
    }
    // }
  }
  if (prefixProp) tempField.prop = `${prefixProp}.${field.prop}`;
  /*** 处理完善 templateField ***/
  tempField.rules = getRules(tempField);
  if (tempField.attrs) {
    const { options } = tempField.attrs;
    tempField.attrs.placeholder = getPlaceholder(tempField);
    if (options) {
      if (typeof options === "string") {
        const opts = getOpts(options as DictName);
        tempField.attrs.options = opts;
        currOptions = opts;
      } else {
        currOptions = options;
      }
    }
  }
  /*** 解析使用 tempField ***/
  const { attrs, quickAttrs = {}, children, slots, ...restFormItemAttrs } = tempField;
  currQuickAttrs = quickAttrs;
  currChildren = children;
  currFormItemSlots = slots;
  newPureText.value = quickAttrs.pureText ?? pureText;
  const { type, labelWidth } = restFormItemAttrs;
  currType.value = type;
  if (attrs) {
    const { slots, ...restAttrs } = attrs;
    currAttrs = restAttrs;
    currSlots = slots;
  }
  /*** 调整显示 templateField ***/
  if (isChild && Number(labelWidth) === 0) {
    delete restFormItemAttrs.label;
  }
  return restFormItemAttrs;
});
// 弹性伸缩类名
const flexClass = computed(() => {
  const { before, after, middleFlexGrow = 1 } = formItemAttrs.value.quickAttrs ?? {};
  return { [`f-${middleFlexGrow}`]: before || after };
});

// 判断是否是ElementPlus的控件（待完善）
function getIsEl() {
  const code = formItemAttrs.value.type[0].charCodeAt();
  return code >= 97 && code <= 122;
}
// 判断是否是系统的基础组件（待完善）
function getIsBase() {
  const code = formItemAttrs.value.type[0].charCodeAt();
  return code >= 65 && code <= 90;
}

// 事件处理
function handleBlur(val: any = "") {
  $emit("blur", val, formItemAttrs.value.prop);
}
function handleFocus(val: any = "") {
  $emit("focus", val, formItemAttrs.value.prop);
}
function handleChange(val: any = "") {
  $emit("change", val, formItemAttrs.value.prop);
}

/**
 * 获取 placeholder 文本
 * @param field
 */
function getPlaceholder(field: FormFieldAttrs) {
  const { label = "", quickAttrs = {}, attrs = {} } = field;
  let { placeholder: phr = "" } = attrs;
  if (phr) phr = phr.replace("${label}", label);
  const { example } = quickAttrs;
  if (example) phr += `，例：${example}`;
  return phr;
}
//合并表单校验的rules
function mergeRules(rules: FormItemRule[] = []) {
  const arr: FormItemRule[] = [];
  rules.forEach((item: CommonObj) => {
    const keys: string[] = ["required", "min", "max", "pattern", "validator"];
    const { type } = item;
    const findInd = rules.findIndex((it: CommonObj) => {
      // if (i < ind) return false;
      let isFind = false;
      if (type) {
        isFind = it.type === type;
      } else {
        isFind = !!keys.find((k, j) => item[k] !== undefined && it[k] !== undefined);
      }
      return isFind;
    });
    findInd === -1 ? arr.push(item) : (arr[findInd] = item);
  });
  return arr;
}
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
/**
 * 获取表单校验的rules
 * @params rules 不能取 合并之后的tempField上的rules
 */
function getRules(field: FormFieldAttrs) {
  const { label = "", rules = [], required, quickAttrs } = field;
  const rulesType = quickAttrs?.rulesType;
  const defField: CommonObj = rulesType ? defaultRulesTypes[rulesType] : undefined;
  const newRules: FormItemRule[] = [
    ...(defField?.rules ?? []),
    ...(required ? [{ required, message: label + "必填", trigger: "change" }] : []),
    ...rules,
  ];
  return mergeRules(newRules);
}
//获取表单键值对的值
function getOptionValue(field: FormFieldAttrs, val: any) {
  const { type = defaultFormItemType, label, attrs = {}, quickAttrs = {} } = field;
  const { options = [] } = attrs;
  if (["select", "radio-group"].includes(type)) {
    val = options?.find(it => it.value === val)?.label;
  } else if (type.includes("Time") || type.includes("date")) {
    const { format } = merge({}, defaultFieldAttrs[type]?.attrs, attrs);
    const isArr = typeOf(val) === "Array";
    const joinStr = ` ${rangeJoinChar} `;
    if (newPureText.value) {
      val = isArr ? val.join(joinStr) : val;
    } else {
      val = isArr ? val.map((it: any) => it.format(format)).join(joinStr) : val?.format(format);
    }
  } else if (type === "checkbox-group") {
    val = options
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
    val = val ? "是" : "否";
  } else if (type === "cascader") {
    val = getTextFromOpts(options, val);
  } else if (type === "BaseNumberRange") {
    val = val?.join(rangeJoinChar);
  } else if (type === "custom") {
    val = emptyStr;
  } else {
    new Error(`暂未处理此种类型：${type}`);
  }
  if (emptyVals.includes(val)) val = emptyStr;
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
