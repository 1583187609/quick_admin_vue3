<template>
  <el-form-item class="base-number-range">
    <el-form-item class="f-1 hide-err-text" :prop="minProp" :rules="[{ validator: validate, trigger: 'blur' }]">
      <el-input v-model.number="minVal" @change="handleChange" @clear="handleClear('min')" :placeholder="minPlaceholder" clearable v-bind="attrs" />
    </el-form-item>
    <div class="f-c-c f-0 separator" :class="size">
      {{ rangeSeparator }}
    </div>
    <el-form-item class="f-1 hide-err-text" :prop="maxProp" :rules="[{ validator: validate, trigger: 'blur' }]">
      <el-input v-model.number="maxVal" @change="handleChange" @clear="handleClear('max')" :placeholder="maxPlaceholder" clearable v-bind="attrs" />
    </el-form-item>
  </el-form-item>
</template>
<script lang="ts" setup>
import { type FormItemRule } from "element-plus";
import { CommonObj, StrNum, CommonSize } from "@/core/_types";
import { propsJoinChar, rangeJoinChar, showMessage } from "@/core/utils";

type InputType = "min" | "max";
type StrNumUnd = StrNum | undefined;
const props = withDefaults(
  defineProps<{
    modelValue?: [StrNumUnd, StrNumUnd];
    prop?: string | [string, string];
    label?: string;
    minPlaceholder?: string;
    maxPlaceholder?: string;
    rules?: FormItemRule[];
    attrs?: CommonObj;
    rangeSeparator?: string;
    size?: CommonSize;
  }>(),
  {
    label: "",
    minPlaceholder: "最小值",
    maxPlaceholder: "最大值",
    rangeSeparator: rangeJoinChar,
  }
);
const $emit = defineEmits(["update:modelValue", "change", "clear"]);
const [minProp, maxProp] = [`${props.prop}[0]`, `${props.prop}[1]`];
const minVal = computed<StrNumUnd>({
  get: () => props.modelValue?.[0],
  set(val: StrNumUnd) {
    $emit("update:modelValue", [val, maxVal.value]);
  },
});
const maxVal = computed<StrNumUnd>({
  get: () => props.modelValue?.[1],
  set(val: StrNumUnd) {
    $emit("update:modelValue", [minVal.value, val]);
  },
});

function validate(rule: FormItemRule, value: any, callback: any) {
  const min = minVal.value ?? "";
  const max = maxVal.value ?? "";
  if (min === "" || max === "") return callback();
  if (min <= max) return callback();
  const msg = props.label + "最小值不能超过最大值";
  showMessage(msg, "error");
  callback(new Error(msg));
}
function handleChange() {
  const { prop } = props;
  const arrVals = [minVal.value, maxVal.value];
  $emit("change", prop?.join?.(propsJoinChar) ?? prop, arrVals);
}
function handleClear(type: InputType) {
  const { prop } = props;
  const arrVals = type === "min" ? [undefined, maxVal.value] : [minVal.value, undefined];
  const _prop = prop?.join?.(propsJoinChar) ?? prop;
  $emit("change", _prop, arrVals);
  $emit("clear", _prop, arrVals);
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
