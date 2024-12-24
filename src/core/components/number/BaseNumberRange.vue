<!-- summary
目标：数字区间组件。
-->
<template>
  <div
    :class="`el-range-editor--${size}`"
    class="base-number-range el-date-editor el-date-editor--daterange el-input__wrapper el-range-editor"
  >
    <input
      v-model="modelVals[0]"
      class="el-range-input"
      :maxlength="maxLength"
      :placeholder="startPlaceholder"
      @input="handleEvent('input', $event, 0)"
      @change="handleEvent('change', $event, 0)"
      @blur="handleBlur(0)"
    />
    <span class="el-range-separator">{{ rangeSeparator }}</span>
    <input
      v-model="modelVals[1]"
      class="el-range-input"
      :maxlength="maxLength"
      :placeholder="endPlaceholder"
      @input="handleEvent('input', $event, 1)"
      @change="handleEvent('change', $event, 1)"
      @blur="handleBlur(1)"
    />
    <el-icon
      class="el-icon el-input__icon el-range__close-icon"
      :class="{ hidden: !modelVals?.length }"
      @click="handleEvent('clear')"
    >
      <CircleClose />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useFormItem } from "element-plus";
import { CircleClose } from "@element-plus/icons-vue";
import { emptyVals, defaultCommonSize, rangeJoinChar, showMessage } from "@/core/utils";
import { StrNum, CommonSize } from "@/core/_types";

type ValsArr = [StrNum?, StrNum?]; //[StrNumUnd, StrNumUnd]

const { formItem } = useFormItem();
const props = withDefaults(
  defineProps<{
    modelValue?: ValsArr;
    min?: number;
    max?: number;
    size?: CommonSize;
    precision?: number; // 精度（保留n位小数位数）
    maxlength?: number; // 最大字符长度
    startPlaceholder?: string;
    endPlaceholder?: string;
    // 属性名跟 date-picker 的保持一致
    rangeSeparator?: string; // 分隔符
  }>(),
  {
    modelValue: () => reactive([]),
    startPlaceholder: "最小值",
    endPlaceholder: "最大值",
    size: defaultCommonSize,
    rangeSeparator: rangeJoinChar,
  }
);
const $emit = defineEmits(["update:modelValue", "change", "input", "clear", "blur"]);
const modelVals = reactive<ValsArr>(props.modelValue?.map((it, i) => getLimitNum(it, i, false)));
const maxLength = computed(() => {
  const { min, max, maxlength, precision } = props;
  if (maxlength !== undefined) return maxlength;
  if (min === undefined || max === undefined) return undefined;
  const numLen = Math.max(String(min || 0).length, String(max || 0).length);
  if (!precision) return numLen;
  return numLen + precision + 1;
});

// 获取限制最大最小值之后的值
function getLimitNum(val: StrNum, ind: number, isHandle = true) {
  const { min, max } = props;
  const valNum = Number(val);
  const currValText = `最${ind === 0 ? "小" : "大"}值`;
  if (!emptyVals.includes(min) && valNum < Number(min)) {
    if (isHandle) val = min;
    else showMessage(`${currValText}不能小于${min}，当前为：${val}`, "warning");
  }
  if (!emptyVals.includes(max) && valNum > Number(max)) {
    if (isHandle) val = max;
    else showMessage(`${currValText}不能大于${max}，当前为：${val}`, "warning");
  }
  // 当失去焦点时，将012转为12，不将''转为0
  return val ? Number(val) : val;
}

// 判断最小值是否超过了最大值
function isMinOverMax(vals: ValsArr = []) {
  const [minVal = 0, maxVal = 0] = vals;
  if (emptyVals.includes(minVal) || emptyVals.includes(maxVal)) return false;
  return Number(minVal) > Number(maxVal);
}

function handleEvent(type: "input" | "change" | "clear", e?, ind?: number) {
  if (type === "clear") {
    modelVals.length = 0;
    formItem?.validate("change");
    $emit("change", modelVals);
    $emit("update:modelValue", modelVals);
    return;
  }
  if (!e || !ind) return;
  const { value } = e.target;
  let val = value.replace(/[^\d.-]/g, "");
  if (type === "change") val = getLimitNum(modelVals[ind] as StrNum, ind);
  modelVals[ind] = val;
  if (type === "change") {
    const { precision } = props;
    const isOver = isMinOverMax(modelVals);
    if (isOver) modelVals[ind === 0 ? 1 : 0] = "";
    if (!precision) return;
    modelVals.forEach((v?: StrNum, i: number) => {
      if (!emptyVals.includes(v)) modelVals[i] = Number(v).toFixed(precision);
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
