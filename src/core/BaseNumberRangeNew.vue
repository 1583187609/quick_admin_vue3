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
    />
    <span class="el-range-separator">{{ separator }}</span>
    <input
      v-model="modelVals[1]"
      class="el-range-input"
      :maxlength="maxLength"
      :placeholder="maxPlaceholder"
      @input="handleEvent('input', $event, 1)"
      @change="handleEvent('change', $event, 1)"
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
    separator?: string;
  }>(),
  {
    modelValue: () => [],
    min: 0,
    max: 100,
    fixedNum: 2,
    minPlaceholder: "最小值",
    maxPlaceholder: "最大值",
    size: defaultCommonSize,
    separator: rangeJoinChar,
  }
);
const $emit = defineEmits(["update:modelValue", "change", "input", "clear"]);
const maxLength = computed(() => {
  // const { max, fixedNum } = props;
  // if (max) {
  //   let len = String(max).length;
  //   if (fixedNum) len += fixedNum + 1;
  //   return len;
  // }
  // return;
  return 5;
});
const modelVals = reactive<ValsArr>(props.modelValue);

function getMinOverMax(vals: ValsArr = []) {
  const [minVal, maxVal] = vals;
  if (emptyVals.includes(minVal) || emptyVals.includes(maxVal)) return false;
  if (minVal > maxVal) return true;
}

function handleEvent(type: "input" | "change" | "clear", e, ind: number) {
  if (type === "clear") {
    modelVals.length = 0; // 说明是清除
    $emit("change", modelVals);
    formItem?.validate("change");
  } else {
    const { value } = e.target;
    let valNum = Number(value.replace(/[^\d.-]/g, ""));
    const { min, max, fixedNum } = props;
    const minNum = Number(min);
    const maxNum = Number(max);
    if (!emptyVals.includes(min) && valNum < minNum) valNum = minNum;
    if (!emptyVals.includes(max) && valNum > maxNum) valNum = maxNum;
    modelVals[ind] = valNum;
    if (type === "change") {
      const isOver = getMinOverMax(modelVals);
      if (isOver) modelVals[ind === 0 ? 1 : 0] = undefined;
      modelVals.forEach((item, ind) => {
        const currVal = modelVals[ind];
        if (!emptyVals.includes(currVal)) modelVals[ind] = Number(currVal).toFixed(fixedNum);
      });
    }
  }
  formItem?.validate(type);
  $emit(type, modelVals);
  $emit("update:modelValue", modelVals);
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
