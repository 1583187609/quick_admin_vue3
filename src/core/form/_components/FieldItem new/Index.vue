<template>
  <el-form-item class="field-item" v-bind="deleteAttrs(newField, ['children', 'attrs', 'quickAttrs', 'options'])">
    <template #label v-if="(!prefixProp || newField.labelWidth) && newField.label">
      <BaseRender :data="newField.label" />
      <QuestionPopover :popover="popoverAttrs" :size="size" v-if="popoverAttrs" />
    </template>
    <div class="mr-h" v-if="newField.quickAttrs?.before">
      <BaseRender :data="newField.quickAttrs.before" />
    </div>
    <template v-if="!subFields.length">
      <template v-if="newField.quickAttrs?.pureText ?? pureText">{{ getKeyVal(newField, newVal).value ?? "-" }}</template>
      <template v-else>
        <component :is="'el-input'" v-model="newVal.value" v-bind="newField.attrs" v-if="widgetsMap[newField.type as string]" />
        <!-- :is="'el-input'" -->
        <!-- <component
          :is="h(...widgetsMap[newField.type as string])"
          v-model.trim="newVal.value"
          v-bind="newField.attrs"
          v-if="widgetsMap[newField.type as string]"
        /> -->
        <!-- <BaseRender :data="widgetsMap[newField.type as string]" v-if="widgetsMap[newField.type as string]" /> -->
        <div class="color-danger" v-else>【不存在】{{ newField.type }}</div>
        <div class="ml-h" v-if="newField.quickAttrs?.after">
          <BaseRender :data="newField.quickAttrs?.after" />
        </div>
      </template>
      <template v-if="newField.quickAttrs?.tips">
        <div class="show-tips" v-html="'注：' + newField.quickAttrs.tips"></div>
      </template>
    </template>
    <!-- 当有子项表单时 -->
    <template v-else>
      <AddDelList
        v-model="newVal"
        :fields="subFields"
        :parentProp="newField.prop"
        :grid="grid"
        :size="size"
        :disabled="disabled"
        :readonly="readonly"
        :pureText="pureText"
        :showChildrenLabel="newField.showChildrenLabel"
        :formRef="formRef"
        v-if="newField.type === 'addDel'"
      />
      <AnyEleList
        v-model="newVal"
        :fields="subFields"
        :prefixProp="newField.prop"
        :grid="grid"
        :size="size"
        :disabled="disabled"
        :readonly="readonly"
        :pureText="pureText"
        :showChildrenLabel="newField.showChildrenLabel"
        v-else
      />
    </template>
  </el-form-item>
</template>
<script lang="ts" setup>
// 表单校验规则参考：https://blog.csdn.net/m0_61083409/article/details/123158056
import { h, ref, computed } from "vue";
import _ from "lodash";
import { typeOf, getTextFromOpts, deleteAttrs, defaultFormItemType } from "@/core/_utils";
import { CommonObj, OptionItem, CommonSize } from "@/vite-env";
import { Grid, FormField, FormFieldAttrs } from "@/core/form/_types";
import { defaultFieldAttrs, defaultRulesTypes } from ".";
import AddDelList from "../AddDelList.vue";
import AnyEleList from "../AnyEleList.vue";
import { rangeJoinChar, emptyVals } from "@/core/_utils";
import { useDict } from "@/hooks";
import { RuleItem } from "./_types";
import { defaultCommonSize } from "@/core/_utils";
import { DictName } from "@/dict/_types";
import BaseRender from "@/core/BaseRender.vue";
import BaseNumberRange from "@/core/BaseNumberRange.vue";
import BaseUpload from "@/core/upload/BaseUpload.vue";
import BaseEditor from "@/core/BaseEditor.vue";
import {
  ElSelect,
  ElOption,
  ElInput,
  ElTreeSelect,
  ElDatePicker,
  ElRadioGroup,
  ElRadioButton,
  ElRadio,
  ElCheckboxGroup,
  ElCheckbox,
  ElInputNumber,
  ElSwitch,
  ElCascader,
  ElAutocomplete,
  ElSlider,
  ElTimePicker,
  ElTimeSelect,
} from "element-plus";
import type { FormItemRule } from "element-plus";

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    prefixProp?: string; //前置prop属性
    grid?: Grid;
    size?: CommonSize;
    field: FormFieldAttrs;
    pureText?: boolean; //是否展示纯文本
    disabled?: boolean; //是否禁用
    readonly?: boolean; //是否只读
    labelWidth?: string; //label宽度
    inputDebounce?: boolean;
    showChildrenLabel?: boolean; //子项的label是否显示
    isChild?: boolean; //是否是父级children 的子级
    formRef?: any;
  }>(),
  {
    grid: 24,
    size: defaultCommonSize,
  }
);

const $emit = defineEmits(["update:modelValue", "change"]);
const { getOpts } = useDict();
const newVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
let popoverAttrs: any;

const subFields = ref<FormFieldAttrs[]>([]);
const newField = computed<FormFieldAttrs>(() => {
  const { prefixProp, field, size, readonly, disabled, labelWidth, isChild, showChildrenLabel } = props;
  const { type: fType, label, quickAttrs = {}, children, slots } = field;
  let tempField: FormFieldAttrs = JSON.parse(JSON.stringify(field));
  const hasChildren = !!children?.length;
  // let tempField: FormFieldAttrs = field;
  if (hasChildren) {
    const { required } = field;
    subFields.value = children as FormFieldAttrs[];
    // // 当是 addDel 类型的子项时，如果子项都未设置 required，则默认父级需显示必传红星符号
    // if (fType === "addDel") {
    //   const someRequired = children.some((item: FormField, ind: number) => {
    //     const isLast = ind === children.length - 1;
    //     if (typeof item === "object") return item?.required ?? (isLast ? true : false);
    //     return false;
    //   });
    //   if (someRequired) tempField.required = true;
    // } else {
    // 当子项有一个必填项时，父级自动变为必填项
    if (!required) {
      const someRequired = children.some((item: FormField) => {
        if (typeof item === "object") return item?.required ?? false;
        return false;
      });
      if (someRequired) tempField.required = true;
    }
    // }
  } else {
    const { rulesType = "" } = quickAttrs;
    const validField: CommonObj = rulesType ? defaultRulesTypes[rulesType] : {};
    const { type: vType } = validField;
    const type = fType ?? vType ?? defaultFormItemType;
    const defField = defaultFieldAttrs[type];
    // tempField = merge({ type, required: prefixProp ? true : false }, defField, validField, field);
    tempField = merge({ type }, defField, validField, field);
    const { getInferredAttrs } = tempField?.attrs ?? {};
    getInferredAttrs && merge(tempField, { attrs: getInferredAttrs(tempField) }, field);
    let { options } = tempField;
    if (typeof options === "string") tempField.options = getOpts(options as DictName);
    popoverAttrs = tempField.quickAttrs?.popover;
    tempField.prop = prefixProp ? `${prefixProp}.${field.prop}` : field.prop;
    tempField.rules = getRules(tempField, field.rules);
    if (tempField?.attrs?.placeholder) {
      tempField.attrs.placeholder = getPlaceholder(tempField);
    }
    if (typeof slots === "string") {
      tempField.slots = { default: slots };
    }
  }
  if (tempField.attrs) {
    if (readonly && tempField.attrs.readonly === undefined) tempField.attrs.readonly = true;
    if (disabled && tempField.attrs.disabled === undefined) tempField.attrs.disabled = true;
    if (size) tempField.size = size;
  }
  if (labelWidth && tempField.labelWidth === undefined) tempField.labelWidth = labelWidth;
  // if (size === "small" && type === "date-picker") {
  //   tempField.labelWidth = label.length + 0.5 + "em";
  // }
  // delete tempField.popover; //如果将popover一并v-bind在el-form-item上，会导致该表单字段不会渲染出来，故需要单独特殊处理
  // delete tempField.quickAttrs; //此处不能删除
  if (isChild && !showChildrenLabel) {
    delete tempField.label;
  }
  delete tempField.children; //需要删除，不然会在子级表单项上 v-bind 时触发 children 警告
  return tempField;
});
const widgetsMap = computed(() => {
  const { size } = props;
  const { label, prop, attrs = {}, options = [], quickAttrs = {}, slots } = newField.value;
  const { before, after } = quickAttrs;
  const flexClass = before ?? after ? "f-1" : "";
  const baseAttrs = {
    "v-bind": attrs,
    "v-model.trim": newVal.value,
  };
  return {
    input: [
      ElInput,
      {
        class: flexClass,
        "v-debounce:input": (e: any) => handleInput(e, prop as string),
        onClear: () => $emit("change", prop, ""),
        ...baseAttrs,
      },
      slots,
    ],
    select: [
      ElSelect,
      {
        class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      options?.map((opt, ind) => {
        const { optionRender } = opt;
        return h(
          ElOption,
          {
            "v-bind": optionRender ? deleteAttrs(opt, ["optionRender"]) : opt,
            key: ind,
          },
          optionRender ? h(BaseRender, { data: optionRender }) : undefined
        );
      }),
    ],
    "tree-select": [
      ElTreeSelect,
      {
        class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
    ],
    "date-picker": [
      ElDatePicker,
      {
        class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      slots,
    ],
    "radio-group": [
      ElRadioGroup,
      {
        // class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      options.map((opt, ind) => {
        const { type } = attrs;
        const { label, ...restAttrs } = opt;
        return h(type === "button" ? ElRadioButton : ElRadio, { key: ind, ...restAttrs }, label);
      }),
    ],
    "checkbox-group": [
      ElCheckboxGroup,
      {
        // class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      options.map((opt, ind) => {
        const { label, ...restAttrs } = opt;
        return h(ElCheckbox, { name: prop, key: ind, ...restAttrs }, label);
      }),
    ],
    "input-number": [
      ElInputNumber,
      {
        // class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
    ],
    switch: [
      ElSwitch,
      {
        // class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
    ],
    cascader: [
      ElCascader,
      {
        class: flexClass,
        options,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      slots,
    ],
    custom: [
      "slot",
      {
        name: "custom",
        field: newField.value,
      },
      h("div", { class: "color-danger" }, `【自定义】${label}（${prop})`),
    ],
    BaseNumberRange: [
      BaseNumberRange,
      {
        class: flexClass,
        size,
        onChange: (prop: string, val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
    ],
    BaseUpload: [
      BaseUpload,
      {
        // class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
    ],
    // BaseEditor: [
    //   BaseEditor,
    //   {
    //     // class: flexClass,
    //     onChange: (val: any) => $emit("change", prop, val ?? ""),
    //     ...baseAttrs,
    //   },
    // ],
    autocomplete: [
      ElAutocomplete,
      {
        class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      slots,
    ],
    slider: [
      ElSlider,
      {
        class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      slots,
    ],
    checkbox: [
      ElCheckbox,
      {
        // class: flexClass,
        onChange: (val: any) => $emit("change", prop, val ?? ""),
        ...baseAttrs,
      },
      slots,
    ],
    // "time-picker": [
    //   ElTimePicker,
    //   {
    //     // class: flexClass,
    //     onChange: (val: any) => $emit("change", prop, val ?? ""),
    //     ...baseAttrs,
    //   },
    //   slots,
    // ],
    // "time-select": [
    //   ElTimeSelect,
    //   {
    //     // class: flexClass,
    //     onChange: (val: any) => $emit("change", prop, val ?? ""),
    //     ...baseAttrs,
    //   },
    //   slots,
    // ],
  };
});

/**
 * 获取输入控件填充文本内容
 * @param {FormFieldAttrs} field 字段对象
 */
function getPlaceholder(field: FormFieldAttrs) {
  const { label = "", quickAttrs = {} } = field;
  const { example } = quickAttrs;
  let phr = field?.attrs?.placeholder ?? "";
  phr = phr.replace("${label}", label);
  if (example) phr += `，例：${example}`;
  return phr;
}
/**
 * 获取表单校验的rules
 * @params rules 不能取 合并之后的tempField上的rules
 */
function getRules(field: FormFieldAttrs, rules: RuleItem[] = []) {
  const { label = "", required, quickAttrs = {} } = field;
  const { rulesType } = quickAttrs;
  const validField: CommonObj = rulesType ? defaultRulesTypes[rulesType] : {};
  const newRules: FormItemRule[] = [
    ...(validField.rules ?? []),
    ...(required ? [{ required, message: label + "必填", trigger: "blur" }] : []),
    ...rules,
  ];
  const _rules = mergeRules(newRules);
  return _rules;
}
//合并表单校验的rules
function mergeRules(rules: FormItemRule[] = []) {
  const arr: FormItemRule[] = [];
  rules.forEach((item: CommonObj, ind: number) => {
    const keys: string[] = ["required", "min", "max", "pattern", "validator"];
    const { type } = item;
    const findInd = rules.findIndex((it: CommonObj, i: number) => {
      // if (i < ind) return false;
      let isFind = false;
      if (type) {
        isFind = it.type === type;
      } else {
        isFind = !!keys.find((k, j) => item[k] !== undefined && it[k] !== undefined);
      }
      return isFind;
    });
    if (findInd === -1) {
      arr.push(item);
    } else {
      arr[findInd] = item;
    }
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
//获取表单键值对的值
function getKeyVal(field: FormFieldAttrs, val: any) {
  const { pureText } = props;
  const { type = defaultFormItemType, label, attrs = {}, options = [], quickAttrs = {} } = field;
  const { after = "" } = quickAttrs;
  if (["select", "radio-group"].includes(type)) {
    val = options?.find(it => it.value === val)?.label;
  } else if (type.includes("Time") || type.includes("date")) {
    const { format } = merge({}, defaultFieldAttrs[type]?.attrs, attrs);
    const isArr = typeOf(val) === "Array";
    const joinStr = ` ${rangeJoinChar} `;
    if (pureText) {
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
    if (val) val = val + after;
  } else if (type === "switch") {
    const { activeText = "是", inactiveText = "否", activeValue } = attrs;
    val = activeValue === val ? activeText : inactiveText;
  } else if (type === "checkbox") {
    val = val ? "是" : "否";
  } else if (type === "cascader") {
    val = getTextFromOpts(attrs?.options, val);
  } else if (type === "BaseNumberRange") {
    val = val.join(rangeJoinChar);
  } else if (type === "custom") {
    val = "";
  }
  // else {
  //   val = "暂未解析";
  // }
  if (emptyVals.includes(val)) val = "-";
  return { label, value: val };
}
function handleInput(e: any, prop: string) {
  if (props.inputDebounce) {
    const inp = e.querySelector("input") || e.querySelector("textarea");
    const val = inp.value;
    $emit("change", prop, val);
  }
}

defineExpose({});
</script>
<style lang="scss" scoped>
.field-item {
}
.hide-tips,
.show-tips {
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
.hide-tips {
  // background: $color-bg-main;
}
.show-tips {
  color: $color-text-light;
}
</style>
