<template>
  <el-form-item :prop="prop" :label="label" class="base-number-range" :rules="[{ validator, trigger: ['change', 'blur'] }, ...rules]">
    <el-input
      v-model.number="modelVals[0]"
      @change="handleChange"
      @blur="handleBlur(Number($event.target?.value), 0)"
      @clear="handleClear(0)"
      :placeholder="minPlaceholder"
      v-bind="inputAttrs"
    />
    <div class="f-c-c f-0 separator" :class="size">
      {{ rangeSeparator }}
    </div>
    <el-input
      v-model.number="modelVals[1]"
      @change="handleChange"
      @blur="handleBlur(Number($event.target?.value), 1)"
      @clear="handleClear(1)"
      :placeholder="maxPlaceholder"
      v-bind="inputAttrs"
    />
  </el-form-item>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue";
import { type FormItemRule } from "element-plus";
import { CommonObj, StrNum, CommonSize } from "@/vite-env";
import { useFormItem } from "element-plus";
import { emptyVals, propsJoinChar, rangeJoinChar, showMessage } from "@/core/_utils";

type StrNumUnd = StrNum | undefined;
type ValsArr = StrNumUnd[]; //[StrNumUnd, StrNumUnd]
type IndexType = 0 | 1;

const { formItem } = useFormItem();
const props = withDefaults(
  defineProps<{
    modelValue?: ValsArr;
    prop?: string;
    label?: string;
    minPlaceholder?: string;
    maxPlaceholder?: string;
    rules?: FormItemRule[];
    attrs?: CommonObj;
    rangeSeparator?: string;
    size?: CommonSize;
    min?: number;
    max?: number;
    fixedNum?: number; // 保留n位小数
  }>(),
  {
    modelValue: () => reactive([]),
    minPlaceholder: "最小值",
    maxPlaceholder: "最大值",
    rules: () => [],
    fixedNum: 2,
    rangeSeparator: rangeJoinChar,
  }
);
const $emit = defineEmits(["update:modelValue", "change", "blur", "clear"]);
const inputAttrs = {
  class: "f-1",
  clearable: true,
  type: "number",
  ...props.attrs,
};
const modelVals = computed({
  get: () => props.modelValue,
  set: (vals: any) => $emit("update:modelValue", vals),
});
function validator(rule: FormItemRule, value: any, callback: any) {
  const [minVal = "", maxVal = ""] = modelVals.value;
  if (minVal === "" || maxVal === "") return callback();
  if (minVal <= maxVal) return callback();
  const { label } = props;
  const msg = `${label ? label + "的" : ""}最小值不能超过最大值`;
  showMessage(msg, "error");
  return callback(new Error(msg));
}
function handleChange() {
  formItem?.validate("change");
  $emit("change", modelVals.value);
}
function handleBlur(val: number, ind: IndexType) {
  const { min, max } = props;
  if (!emptyVals.includes(min as any) && val < min!) {
    modelVals.value[ind] = min;
  } else if (!emptyVals.includes(max as any) && val > max!) {
    modelVals.value[ind] = max;
  }
  validator(undefined, undefined, (res: any) => res);
  formItem?.validate("blur");
  $emit("blur", modelVals.value);
}
function handleClear(ind: IndexType) {
  modelVals.value[ind] = "";
  $emit("change", modelVals.value);
}
</script>
<style lang="scss" scoped>
.base-number-range {
  width: 100%;
  // width: 202px;
  .separator {
    line-height: 32px;
    margin: 0 $gap-half;
    &.small {
      line-height: 24px;
      margin: 0 $gap-qtr;
    }
  }
}
:deep(.hide-err-text) {
  .el-form-item__error {
    display: none;
  }
}
</style>
