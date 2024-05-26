<template>
  <div class="f-fs-fs base-number-range">
    <el-form-item class="f-1 hide-err-text" :prop="minProp" :rules="[{ validator: validate, trigger: 'blur' }]">
      <el-input
        v-model.number="minVal"
        @change="handleChange('min')"
        @clear="handleClear('min')"
        placeholder="最小值"
        clearable
      />
    </el-form-item>
    <div class="f-c-c f-0 separator" :class="size">
      {{ rangeSeparator }}
    </div>
    <el-form-item class="f-1 hide-err-text" :prop="maxProp" :rules="[{ validator: validate, trigger: 'blur' }]">
      <el-input
        v-model.number="maxVal"
        @change="handleChange('max')"
        @clear="handleClear('max')"
        placeholder="最大值"
        clearable
      />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, useAttrs } from "vue";
import { useFormItem } from "element-plus";
import { CommonObj, StrNum, CommonSize } from "@/vite-env";
import { emptyVals, propsJoinChar, rangeJoinChar, showMessage } from "@/utils";
type InputType = "min" | "max";
type StrNumUnd = StrNum | undefined;
const { formItem } = useFormItem();
const props = withDefaults(
  defineProps<{
    modelValue?: [StrNumUnd, StrNumUnd];
    prop?: string | [string, string];
    label?: string;
    rules?: any[];
    attrs?: CommonObj;
    rangeSeparator?: string;
    size?: CommonSize;
  }>(),
  {
    rangeSeparator: rangeJoinChar,
  }
);
const emits = defineEmits(["update:modelValue", "change", "clear"]);
const [minProp, maxProp] = [`${props.prop}[0]`, `${props.prop}[1]`];
const minVal = computed<StrNumUnd>({
  get() {
    return props.modelValue?.[0];
  },
  set(val: StrNumUnd) {
    emits("update:modelValue", [val, maxVal.value]);
  },
});
const maxVal = computed<StrNumUnd>({
  get() {
    return props.modelValue?.[1];
  },
  set(val: StrNumUnd) {
    emits("update:modelValue", [minVal.value, val]);
  },
});

function validate(rule: any, value: any, callback: any) {
  if (minVal.value === undefined || minVal.value === "" || maxVal.value === undefined || maxVal.value === "") {
    callback();
  } else {
    if (minVal.value > maxVal.value) {
      showMessage(props.label + "最小值不能超过最大值", "error");
      callback("最小值不能超过最大值");
    } else {
      callback();
    }
  }
}
function handleChange(type: InputType) {
  const { prop } = props;
  const arrVals = [minVal.value, maxVal.value];
  emits("change", prop?.join?.(propsJoinChar) ?? prop, arrVals);
}
function handleClear(type: InputType) {
  const { prop } = props;
  const arrVals = type === "min" ? [undefined, maxVal.value] : [minVal.value, undefined];
  const _prop = prop?.join?.(propsJoinChar) ?? prop;
  emits("change", _prop, arrVals);
  emits("clear", _prop, arrVals);
}
</script>
<style lang="scss" scoped>
.base-number-range {
  width: 100%;
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
