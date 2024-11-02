<template>
  <div
    :class="{ [`el-range-editor--${size}`]: true }"
    class="base-number-range el-date-editor el-date-editor--daterange el-input__wrapper el-range-editor"
  >
    <input
      v-model="modelVals[0]"
      class="el-range-input"
      :maxlength="maxLength"
      :placeholder="minPlaceholder"
      @input="handleEvent('input', $event, 0)"
      @change="handleEvent('change', $event, 0)"
      @blur="handleBlur(0)"
    />
    <span class="el-range-separator">{{ rangeSeparator }}</span>
    <input
      v-model="modelVals[1]"
      class="el-range-input"
      :maxlength="maxLength"
      :placeholder="maxPlaceholder"
      @input="handleEvent('input', $event, 1)"
      @change="handleEvent('change', $event, 1)"
      @blur="handleBlur(1)"
    />
    <el-icon class="el-icon el-input__icon el-range__close-icon" :class="{ hidden: !modelVals?.length }" @click="handleEvent('clear')">
      <CircleClose />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useFormItem } from "element-plus";
import { CircleClose } from "@element-plus/icons-vue";
import { emptyVals, defaultCommonSize, rangeJoinChar } from "@/core/_utils";
import { StrNum, CommonSize } from "@/vite-env";

type ValsArr = [StrNum?, StrNum?]; //[StrNumUnd, StrNumUnd]

const { formItem } = useFormItem();
const props = withDefaults(
  defineProps<{
    modelValue?: ValsArr;
    min?: number;
    max?: number;
    size?: CommonSize;
    fixedNum?: number; // 保留n位小数
    minPlaceholder?: string;
    maxPlaceholder?: string;
    // 属性名跟date-picker的保持一致
    rangeSeparator?: string;
  }>(),
  {
    modelValue: () => [],
    // min: -100,
    // max: 100,
    // fixedNum: 2,
    minPlaceholder: "最小值",
    maxPlaceholder: "最大值",
    size: defaultCommonSize,
    rangeSeparator: rangeJoinChar,
  }
);
const $emit = defineEmits(["update:modelValue", "change", "input", "clear", "blur"]);
const modelVals = reactive<ValsArr>(props.modelValue);
const maxLength = computed(() => {
  const { min, max, fixedNum } = props;
  if (min === undefined || max === undefined) return undefined;
  const numLen = Math.max(String(min || 0).length, String(max || 0).length);
  if (!fixedNum) return numLen;
  return numLen + fixedNum + 1;
});
// 判断最小值是否超过了最大值
function isMinOverMax(vals: ValsArr = []) {
  const [minVal = 0, maxVal = 0] = vals;
  if (emptyVals.includes(minVal) || emptyVals.includes(maxVal)) return false;
  return Number(minVal) > Number(maxVal);
}

function handleEvent(type: "input" | "change" | "clear", e, ind: number) {
  if (type === "clear") {
    modelVals.length = 0;
    formItem?.validate("change");
    $emit("change", modelVals);
    $emit("update:modelValue", modelVals);
    return;
  }
  const { value } = e.target;
  let val = value.replace(/[^\d.-]/g, "");
  const { min, max, fixedNum } = props;
  if (type === "change") {
    const valNum = Number(val);
    if (!emptyVals.includes(min) && valNum < Number(min)) val = min;
    if (!emptyVals.includes(max) && valNum > Number(max)) val = max;
  }
  modelVals[ind] = val;
  if (type === "change") {
    const isOver = isMinOverMax(modelVals);
    if (isOver) modelVals[ind === 0 ? 1 : 0] = "";
    if (!fixedNum) return;
    modelVals.forEach((v?: StrNum, i: number) => {
      if (!emptyVals.includes(v)) modelVals[i] = Number(v).toFixed(fixedNum);
    });
  }
  formItem?.validate(type);
  $emit(type, modelVals);
  $emit("update:modelValue", modelVals);
}
function handleBlur(ind) {
  $emit("blur", modelVals[ind]);
  formItem?.validate("blur");
}
</script>
<style lang="scss" scoped>
.base-number-range {
  .el-range__close-icon {
    opacity: 0;
    visibility: hidden;
    &.hidden {
      display: none;
    }
  }
  &:hover {
    .el-range__close-icon {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
