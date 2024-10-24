<template>
  <el-form-item
    class="field-item"
    :class="{ 'label-h-center': !!currPopover, [`value-v-${newField?.quickAttrs?.valueAlignContent}`]: true }"
    v-bind="deleteAttrs(newField, ['children', 'attrs', 'quickAttrs', 'options', 'slots'])"
  >
    <!-- el-form-item 的插槽(label、error等) -->
    <template #[key] v-for="(val, key) in getFormItemSlots(newField, size)" :key="key">
      <BaseRender :data="val" />
    </template>
    <div class="mr-h" v-if="newField.quickAttrs?.before">
      <BaseRender :data="newField.quickAttrs.before" />
    </div>
    <template v-if="!subFields.length">
      <template v-if="newField.quickAttrs?.pureText ?? pureText">
        <slot name="custom" :field="newField" v-if="newField.type === 'custom'" />
        <template v-else>
          {{ getOptionValue(newField, newVal).value }}
        </template>
      </template>
      <template v-else>
        <!-- 以下按照使用频率高低排序 -->
        <el-input
          :class="flexClass"
          v-debounce:input="(e:any)=>handleInput(e, newField.prop as string)"
          @clear="() => $emit('change', newField.prop, '')"
          v-model.trim="newVal"
          v-bind="newField.attrs"
          v-if="newField.type === 'input'"
        >
          <template #[key] v-for="(val, key) in getSlotsMap(newField?.attrs?.slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-input>
        <el-select
          :class="flexClass"
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'select'"
        >
          <el-option v-for="(opt, ind) in newField.options" :key="ind" v-bind="deleteAttrs(opt, ['slots'])">
            <template #[key] v-for="(val, key) in getSlotsMap(opt.slots)" :key="key">
              <BaseRender :data="val" />
            </template>
          </el-option>
          <template #[key] v-for="(val, key) in getSlotsMap(newField?.attrs?.slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-select>
        <el-tree-select
          :class="flexClass"
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          :data="newField.options"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'tree-select'"
        />
        <el-date-picker
          :class="flexClass"
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'date-picker'"
        >
          <template #[key] v-for="(val, key) in getSlotsMap(newField?.attrs?.slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-date-picker>
        <el-radio-group
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'radio-group'"
        >
          <template v-if="newField?.attrs?.type === 'button'">
            <el-radio-button :disabled="opt.disabled" :value="opt.value" v-for="(opt, ind) in newField.options" :key="ind">
              {{ opt.label }}
            </el-radio-button>
          </template>
          <template v-else>
            <el-radio :disabled="opt.disabled" :value="opt.value" v-for="(opt, ind) in newField.options" :key="ind">
              {{ opt.label }}
            </el-radio>
          </template>
        </el-radio-group>
        <el-checkbox-group
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'checkbox-group'"
        >
          <!-- 这个表单控件需要特殊处理，不能直接使用v-bind="opt" -->
          <el-checkbox
            :disabled="opt.disabled"
            :value="opt.value"
            v-bind="deleteAttrs(opt, ['label'])"
            :name="(newField.prop as string)"
            v-for="(opt, ind) in newField.options"
            :key="ind"
          >
            <BaseRender :data="opt.label" />
          </el-checkbox>
        </el-checkbox-group>
        <el-input-number
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'input-number'"
        >
          <template #[key] v-for="(val, key) in getSlotsMap(newField?.attrs?.slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-input-number>
        <el-switch
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'switch'"
        />
        <el-cascader
          :class="flexClass"
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          :options="newField.options"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'cascader'"
        >
          <template #[key] v-for="(val, key) in getSlotsMap(newField?.attrs?.slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-cascader>
        <slot name="custom" :field="newField" v-else-if="newField.type === 'custom'">
          <div class="color-danger">【自定义】{{ `${newField.label}（${newField.prop})` }}</div>
        </slot>
        <BaseNumberRange
          :class="flexClass"
          @change="(prop:string, val:any)=> $emit('change', prop, val ?? '')"
          :size="size"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'BaseNumberRange'"
        />
        <BaseUpload
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-bind="newField.attrs"
          v-model="newVal"
          v-else-if="newField.type === 'BaseUpload'"
        />
        <!-- <BaseEditor
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'BaseEditor'"
        ></BaseEditor> -->
        <el-autocomplete
          :class="flexClass"
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'autocomplete'"
        >
          <template #[key] v-for="(val, key) in getSlotsMap(newField?.attrs?.slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-autocomplete>
        <el-slider
          :class="flexClass"
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'slider'"
        />
        <el-checkbox
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'checkbox'"
        >
          <template #[key] v-for="(val, key) in getSlotsMap(newField?.attrs?.slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-checkbox>
        <!-- 没有label字段的空行，用作插入一些按钮或其他内容 -->
        <BaseRender v-else-if="newField.type === 'empty'" />
        <!-- <el-time-picker
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'time-picker'"
        />
        <el-time-select
          @change="(val:any)=> $emit('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'time-select'"
        /> -->
        <div class="color-danger" v-else>【不存在】{{ newField.type }}</div>
        <BaseRender :data="newField.quickAttrs?.after" v-if="newField.quickAttrs?.after" />
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
import { ref, computed, h } from "vue";
import { typeOf, getTextFromOpts, deleteAttrs, defaultFormItemType, emptyStr, getSlotsMap, getFormItemSlots } from "@/components/_utils";
import { CommonObj, OptionItem, CommonSize } from "@/vite-env";
import { Grid, FormField, FormFieldAttrs } from "@/components/form/_types";
import { FormItemRule } from "element-plus";
import { defaultFieldAttrs, defaultRulesTypes } from ".";
import AddDelList from "../AddDelList.vue";
import AnyEleList from "../AnyEleList.vue";
import { rangeJoinChar, emptyVals } from "@/components/_utils";
import { useDict } from "@/hooks";
import { RuleItem } from "./_types";
import { defaultCommonSize } from "@/components/_utils";
import { DictName } from "@/dict/_types";
import QuestionPopover from "@/components/QuestionPopover.vue";
import _ from "lodash";

const { merge, cloneDeep } = _;
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
let currPopover: any;
const subFields = ref<FormFieldAttrs[]>([]);
const newField = computed<FormFieldAttrs>(() => {
  const { prefixProp, field, size, readonly, disabled, labelWidth, isChild, showChildrenLabel } = props;
  const { type: fType, label, quickAttrs = {}, children } = field;
  let tempField: FormFieldAttrs = JSON.parse(JSON.stringify(field));
  // let tempField: FormFieldAttrs = commonClone(field);
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
    if (typeof tempField.options === "string") tempField.options = getOpts(tempField.options as DictName);
    currPopover = tempField.quickAttrs?.popover;
    tempField.prop = prefixProp ? `${prefixProp}.${field.prop}` : field.prop;
    tempField.rules = getRules(tempField, field.rules);
    if (tempField.attrs) {
      tempField.attrs.placeholder = getPlaceholder(tempField);
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
  // delete tempField.popover; // 如果将popover一并v-bind在el-form-item上，会导致该表单字段不会渲染出来，故需要单独特殊处理
  // delete tempField.quickAttrs; // 此处不能删除
  if (isChild && !showChildrenLabel) {
    delete tempField.label;
  }
  delete tempField.children; //需要删除，不然会在子级表单项上 v-bind 时触发 children 警告
  // if (tempField.prop === "phone") {
  //   console.log(tempField, "tempField--------------");
  // }
  return tempField;
});
const flexClass = { "f-1": newField.value.quickAttrs?.before ?? newField.value.quickAttrs?.after };
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
function getRules(field: FormFieldAttrs, rules: RuleItem[] = []) {
  const { label = "", required, quickAttrs = {} } = field;
  const { rulesType } = quickAttrs;
  const validField: CommonObj = rulesType ? defaultRulesTypes[rulesType] : {};
  const newRules: FormItemRule[] = [
    ...(validField.rules ?? []),
    ...(required ? [{ required, message: label + "必填", trigger: "change" }] : []),
    ...rules,
  ];
  return mergeRules(newRules);
}
//获取表单键值对的值
function getOptionValue(field: FormFieldAttrs, val: any) {
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
    val = val?.join(rangeJoinChar);
  } else if (type === "custom") {
    val = emptyStr;
  } else {
    new Error(`暂未处理此种类型：${type}`);
  }
  if (emptyVals.includes(val)) val = emptyStr;
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
