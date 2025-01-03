<!-- 表单控件 -->
<template>
  <template v-if="newFiled.quickAttrs?.pureText || pureText">
    {{ getOptionValue(newFiled, modelVal).value }}
  </template>
  <template v-else>
    <!-- el-cascader的默认插槽中如果写了v-if之类的条件语句，会导致级联的下拉项的label不会展示，故需要分开处理 -->
    <component
      v-model="modelVal"
      :is="`el-${is}`"
      v-bind="newFiled?.attrs"
      @blur="(e:any) => handleEvent(e,'blur')"
      @focus="(e:any) => handleEvent(e,'focus')"
      @change="(e:any) => handleEvent(e,'change')"
      v-if="is === 'cascader'"
    >
      <template #[key]="scope" v-for="(val, key) in getSlotsMap(newFiled.attrs?.slots)" :key="key">
        <BaseRender :renderData="val" :scope="scope" />
      </template>
    </component>
    <component
      v-model="modelVal"
      :is="`el-${is}`"
      v-bind="newFiled?.attrs"
      @blur="(e:any) => handleEvent(e,'blur')"
      @focus="(e:any) => handleEvent(e,'focus')"
      @change="(e:any) => handleEvent(e,'change')"
      v-else
    >
      <template #[key]="scope" v-for="(val, key) in getSlotsMap(newFiled.attrs?.slots)" :key="key">
        <BaseRender :renderData="val" :scope="scope" />
      </template>
      <template v-if="is === 'select'">
        <!-- 分组下拉项 -->
        <template v-if="newFiled.attrs?.options?.find(it => !!it.children)">
          <el-option-group v-for="(gItem, gInd) in newFiled.attrs?.options" v-bind="deleteAttrs(gItem, ['slots', 'children'])" :key="gInd">
            <!-- <template #[key]="scope" v-for="(val, key) in getSlotsMap((gItem as OptionItem).slots)" :key="key"> -->
            <el-option v-bind="deleteAttrs(opt, ['slots'])" v-for="(opt, ind) in gItem.children" :key="ind">
              <template #[key]="scope" v-for="(val, key) in getSlotsMap((opt as OptionItem).slots)" :key="key">
                <BaseRender :renderData="val" :scope="scope" :option="opt" />
              </template>
            </el-option>
            <!-- </template> -->
          </el-option-group>
        </template>
        <!-- 不分组下拉项 -->
        <template v-else>
          <el-option v-bind="deleteAttrs(opt  as OptionItem, ['slots'])" v-for="(opt, ind) in newFiled.attrs?.options" :key="ind">
            <template #[key]="scope" v-for="(val, key) in getSlotsMap((opt as OptionItem).slots)" :key="key">
              <BaseRender :renderData="val" :scope="scope" :option="opt" />
            </template>
          </el-option>
        </template>
      </template>
      <template v-else-if="is === 'radio-group'">
        <component
          :is="`el-radio${newFiled.attrs?.type ? `-${newFiled.attrs?.type}` : ''}`"
          v-bind="deleteAttrs(opt as OptionItem, ['slots', 'children'])"
          v-for="(opt, ind) in newFiled.attrs?.options"
          :key="ind"
        >
          <template #[key]="scope" v-for="(val, key) in getSlotsMap(opt?.slots)" :key="key">
            <BaseRender :renderData="val" :scope="scope" :option="opt" />
          </template>
        </component>
      </template>
      <template v-else-if="is === 'checkbox-group'">
        <!-- 这个表单控件需要特殊处理，不能直接使用v-bind="opt" -->
        <el-checkbox
          :name="newFiled.prop"
          v-bind="deleteAttrs(opt as OptionItem, ['slots'])"
          v-for="(opt, ind) in newFiled.attrs?.options"
          :key="ind"
        >
          <template #[key]="scope" v-for="(val, key) in getSlotsMap(opt?.slots)" :key="key">
            <BaseRender :renderData="val" :scope="scope" :option="opt" />
          </template>
        </el-checkbox>
      </template>
    </component>
  </template>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { OptionItem } from "@/core/_types";
import { defaultFormItemType, deleteAttrs, emptyStr, emptyVals, getSlotsMap, getTextFromOpts, rangeJoinChar, typeOf } from "@/core/utils";
import { useDict, useFormAttrs } from "@/hooks";
import { upperFirst } from "lodash";
import { DictName } from "@/dict/_types";
import { FormFieldAttrs } from "../FieldItem/_types";
import { defaultFieldAttrs } from "../FieldItem";
import _ from "lodash";

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    is?: string;
    field: FormFieldAttrs;
  }>(),
  {
    is: defaultFormItemType,
  }
);
const $emit = defineEmits(["update:modelValue"]);
const $attrs = useAttrs();
const { getOpts } = useDict();
const { pureText } = useFormAttrs({ ...props, ...$attrs }, ["disabled", "readonly", "size"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const newFiled = computed<FormFieldAttrs>(() => {
  const { field } = props;
  const { attrs } = field;
  const placeholder = getPlaceholder(field);
  if (attrs) {
    const { options } = attrs;
    if (options) field.attrs!.options = getStandardOptions(options);
    field.attrs!.placeholder = placeholder;
  } else {
    field.attrs = { placeholder };
  }
  return field;
});
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
// 获取标准下拉项
function getStandardOptions(opts) {
  if (!opts) return;
  const t = typeOf(opts);
  if (t === "String") return getOpts(opts as DictName);
  if (t === "Array") return opts;
  throw new Error(`暂未处理此种options的类型：${t}`);
}
// 事件处理
function handleEvent(e: any, name: string) {
  const val = e.target?.value ?? e;
  $attrs[`on${upperFirst(name)}`]?.(val, e);
}
//获取表单键值对的值
function getOptionValue(field: FormFieldAttrs, val: any) {
  const { type = defaultFormItemType, label, attrs = {}, quickAttrs = {} } = field;
  const stanOpts = attrs.options as OptionItem[];
  if (["select", "radio-group"].includes(type)) {
    val = stanOpts?.find(it => it.value === val)?.label;
  } else if (type.includes("Time") || type.includes("date")) {
    const { format } = merge({}, defaultFieldAttrs[type]?.attrs, attrs);
    const isArr = typeOf(val) === "Array";
    const joinStr = ` ${rangeJoinChar} `;
    if (quickAttrs?.pureText || pureText) {
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
    val = val?.join(rangeJoinChar);
  } else if (type === "slot") {
    val = emptyStr;
  } else {
    new Error(`暂未处理此种类型：${type}`);
  }
  if (emptyVals.includes(val)) val = emptyStr;
  return { label, value: val };
}
</script>
<style lang="scss" scoped></style>
