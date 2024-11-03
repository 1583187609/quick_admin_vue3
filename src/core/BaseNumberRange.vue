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
import { emptyVals, defaultCommonSize, rangeJoinChar, showMessage } from "@/core/_utils";
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
    rangeSeparator?: string; // 分隔符
    maxlength?: number;
  }>(),
  {
    modelValue: () => [],
    // min: -100,
    // max: 100,
    fixedNum: 0,
    minPlaceholder: "最小值",
    maxPlaceholder: "最大值",
    size: defaultCommonSize,
    rangeSeparator: rangeJoinChar,
  }
);
const $emit = defineEmits(["update:modelValue", "change", "input", "clear", "blur"]);
const modelVals = reactive<ValsArr>(props.modelValue?.map((it, i) => getLimitNum(it, i, false)));
const maxLength = computed(() => {
  const { min, max, maxlength, fixedNum } = props;
  if (maxlength !== undefined) return maxlength;
  if (min === undefined || max === undefined) return undefined;
  const numLen = Math.max(String(min || 0).length, String(max || 0).length);
  if (!fixedNum) return numLen;
  return numLen + fixedNum + 1;
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
  if (type === "change") val = getLimitNum(modelVals[ind]);
  modelVals[ind] = val;
  if (type === "change") {
    const { fixedNum } = props;
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
