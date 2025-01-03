<!-- summary
目标：数字区间组件。
-->
<template>
  <div
    class="base-number-range el-date-editor el-date-editor--daterange el-input__wrapper el-range-editor"
    :class="`el-range-editor--${size}`"
  >
    <input
      v-model="modelVals[0]"
      class="el-range-input"
      :maxlength="maxLength"
      :placeholder="startPlaceholder"
      @blur="handleEvent('blur', $event, 0)"
      @focus="handleEvent('focus', $event, 0)"
      @input="handleEvent('input', $event, 0)"
      @change="handleEvent('change', $event, 0)"
    />
    <span class="el-range-separator">{{ rangeSeparator }}</span>
    <input
      v-model="modelVals[1]"
      class="el-range-input"
      :maxlength="maxLength"
      :placeholder="endPlaceholder"
      @blur="handleEvent('blur', $event, 1)"
      @focus="handleEvent('focus', $event, 1)"
      @input="handleEvent('input', $event, 1)"
      @change="handleEvent('change', $event, 1)"
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
import { defaultCommonSize, rangeJoinChar, showMessage } from "@/core/utils";
import { CommonSize } from "@/core/_types";

type ValsArr = [number?, number?]; //[StrNumUnd, StrNumUnd]

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
const $emit = defineEmits(["update:modelValue", "change", "input", "clear", "blur", "focus"]);
const modelVals = reactive<ValsArr>(props.modelValue?.map((it, i) => getLimitNum(Number(it), i, false)));
const maxLength = computed(() => {
  const { min, max, maxlength, precision } = props;
  if (maxlength !== undefined) return maxlength;
  if (min === undefined || max === undefined) return undefined;
  const numLen = Math.max(String(min || 0).length, String(max || 0).length);
  if (!precision) return numLen;
  return numLen + precision + 1;
});

// 获取限制最大最小值之后的值
function getLimitNum(val: number, ind: number, isHandle = true): number {
  const { min, max } = props;
  const currValText = `最${ind === 0 ? "小" : "大"}值`;
  if (min !== undefined && val < min) {
    if (isHandle) val = min;
    else showMessage(`${currValText}不能小于${min}，当前为：${val}`, "warning");
  }
  if (max !== undefined && val > max) {
    if (isHandle) val = max;
    else showMessage(`${currValText}不能大于${max}，当前为：${val}`, "warning");
  }
  return val;
}

// 判断最小值是否超过了最大值
function isMinOverMax(vals: ValsArr = []) {
  const [minVal, maxVal] = vals;
  if (minVal === undefined || maxVal === undefined) return false;
  return minVal > maxVal;
}
// 事件处理
function handleEvent(type: "input" | "change" | "clear" | "blur" | "focus", e?, ind?: number) {
  if (type === "clear") {
    modelVals.length = 0;
  } else if (type === "change") {
    const val = e!.target.value.replace(/[^\d.-]/g, "");
    if (val) modelVals[ind!] = getLimitNum(Number(val), ind!);
    const isOver = isMinOverMax(modelVals);
    if (isOver) modelVals[ind === 0 ? 1 : 0] = "" as unknown as number;
    if (props.precision) {
      modelVals.forEach((v, i: number) => {
        if (v === undefined) return;
        modelVals[i] = Number(v.toFixed(props.precision));
      });
    }
  }
  formItem?.validate(type === "clear" ? "change" : type);
  $emit(type, modelVals, e);
  if (type === "change") $emit("update:modelValue", modelVals, e);
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
