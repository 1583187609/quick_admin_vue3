<!-- 表单控件 -->
<template>
  <!-- el-cascader的默认插槽中如果写了v-if之类的条件语句，会导致级联的下拉项的label不会展示，故需要分开处理 -->
  <component
    v-model="modelVal"
    :is="`el-${is}`"
    v-bind="newFiled.attrs"
    @blur="(e:any) => handleEvent('blur', e)"
    @focus="(e:any) => handleEvent('focus', e)"
    @change="(e:any) => handleEvent('change', e)"
    v-if="is === 'cascader'"
  >
    <template #[key]="scope" v-for="(val, key) in getSlotsMap(newFiled.attrs?.slots)" :key="key">
      <BaseRender :renderData="val" :scope="scope" />
    </template>
  </component>
  <component
    v-model="modelVal"
    :is="`el-${is}`"
    v-bind="newFiled.attrs"
    @blur="(e:any) => handleEvent('blur', e)"
    @focus="(e:any) => handleEvent('focus', e)"
    @change="(e:any) => handleEvent('change', e)"
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
      <el-checkbox :name="newFiled.prop" v-bind="deleteAttrs(opt as OptionItem, ['slots'])" v-for="(opt, ind) in newFiled.attrs?.options" :key="ind">
        <template #[key]="scope" v-for="(val, key) in getSlotsMap(opt?.slots)" :key="key">
          <BaseRender :renderData="val" :scope="scope" :option="opt" />
        </template>
      </el-checkbox>
    </template>
  </component>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { OptionItem } from "@/core/_types";
import { defaultFormItemType, deleteAttrs, getSlotsMap, typeOf } from "@/core/utils";
import { useDict, useFormAttrs } from "@/hooks";
import { DictName } from "@/dict/_types";
import { FormFieldAttrs } from "../FieldItem/_types";
import { useAttrs } from "vue";
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
const $emit = defineEmits(["update:modelValue", "blur", "focus", "change"]);
const $attrs = useAttrs();
// const formAttrs = useFormAttrs({ ...props, ...$attrs });
const { getOpts } = useDict();
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const newFiled = computed<FormFieldAttrs>(() => {
  const { field } = props;
  const { attrs, type } = field;
  const placeholder = getPlaceholder(field);
  if (attrs) {
    const { options, data } = attrs;
    // 兼容处理 tree-select的下拉属性和其他属性名称不一致的问题
    if (type === "tree-select") {
      if (data ?? options) field.attrs!.data = getStandardOptions(data ?? options);
    } else {
      if (options) field.attrs!.options = getStandardOptions(options);
    }
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
function getStandardOptions(opts): OptionItem[] {
  if (!opts) return [];
  const t = typeOf(opts);
  if (t === "String") return getOpts(opts as DictName);
  if (t === "Array") return opts;
  throw new Error(`暂未处理此种options的类型：${t}`);
}
// 事件处理
function handleEvent(name: "blur" | "focus" | "change", e: any) {
  const val = e.target?.value ?? e;
  $emit(name, val, e);
}
</script>
<style lang="scss" scoped></style>
