<template>
  <el-form
    class="query-form"
    :class="{ compact, [size]: true }"
    :model="formData"
    v-bind="defaultFormAttrs"
    @keyup.enter="handleSubmit"
    ref="formRef"
    v-if="!noFieldsHide || newFields.length || newSections.length"
  >
    <div class="all-hide-scroll wrap-box" :style="{ maxHeight: getMaxHeight() }" v-if="newSections.length">
      <div class="f-fs-fs" v-for="(sItem, sInd) in newSections.slice(0, isFold ? rowNum : undefined)" :key="sInd">
        <div class="sec-label f-0">{{ sItem.label }}</div>
        <div class="sec-fields f-fs-fs-w f-1">
          <QueryFields
            v-model="formData"
            :field="field"
            :disabled="disabled"
            :readonly="readonly"
            :size="size"
            :inputDebounce="inputDebounce"
            @change="(key:string, val:any)=>emits('change', {[key]: val})"
            v-for="(field, ind) in sItem.fields.slice(0, sliceInd?.(sInd))"
            :key="ind"
          >
            <template #custom="{ field: currField }">
              <slot name="custom" :field="currField" :form="formData" />
            </template>
          </QueryFields>
          <QueryBtns
            :size="size"
            :compact="compact"
            :loading="loading"
            :isFold="isFold"
            :showFoldBtn="showFoldBtn"
            @submit="handleSubmit"
            @fold="isFold = !isFold"
            @reset="resetForm"
            v-bind="getGridAttrs(grid)"
            v-if="
              newSections.length <= rowNum
                ? sInd === newSections.length - 1
                : isFold
                ? sInd === rowNum - 1
                : sInd === newSections.length - 1
            "
          />
        </div>
      </div>
    </div>
    <div class="f-fs-fs-w wrap-box all-hide-scroll" :style="{ maxHeight: getMaxHeight() }" v-else>
      <QueryFields
        v-model="formData"
        :field="field"
        :size="size"
        :inputDebounce="inputDebounce"
        @change="(key:string, val:any)=>emits('change', {[key]: val})"
        v-for="(field, ind) in newFields.slice(0, sliceInd)"
        :key="ind"
      >
        <template #custom="{ field: currField }">
          <slot name="custom" :field="currField" :form="formData" />
        </template>
      </QueryFields>
      <QueryBtns
        :size="size"
        :compact="compact"
        :loading="loading"
        :isFold="isFold"
        :showFoldBtn="showFoldBtn"
        @submit="handleSubmit"
        @fold="isFold = !isFold"
        @reset="resetForm"
        v-bind="getGridAttrs(grid)"
      />
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { getScreenSizeType, showMessage } from "@/components/_utils";
import { FormField, FormFieldAttrs, Grid } from "@/components/form/_types";
import _ from "lodash";
import { CommonObj, CommonSize } from "@/vite-env";
import QueryFields from "./_components/QueryFields.vue";
import QueryBtns from "./_components/QueryBtns.vue";
import config from "@/config";
import { useEvent } from "@/hooks";
import { handleFields, getGridAttrs } from "@/components/form/_utils";
import { SectionFormItemAttrs } from "@/components/form/_types";
import { defaultFormAttrs } from "@/components/form";
import { defaultCommonSize } from "@/components/_utils";

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: FormField[]; //表单字段项
    sections?: SectionFormItemAttrs[];
    loading?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    size?: CommonSize;
    rowNum?: number;
    extraParams?: CommonObj; //额外的参数
    inputDebounce?: boolean;
    grid: Grid;
    compact?: boolean; //是否是紧凑的
    noFieldsHide?: boolean; //没有字段时是否不显示表单内容
  }>(),
  Object.assign(
    {
      size: defaultCommonSize,
      rowNum: 2,
      fields: () => [],
      modelValue: () => reactive({}),
      noFieldsHide: true,
    },
    config?.BaseCrud?._components?.QueryForm
  )
);
const emits = defineEmits(["update:modelValue", "search", "change", "reset"]);
let isFirst = true;
const formRef = ref<FormInstance>();
const colNum = ref(2);
const isFold = ref(true);
const newFields = ref<FormFieldAttrs[]>([]);
const newSections = ref<SectionFormItemAttrs[]>([]);
//折叠或展开时，要截取的fields的长度的第二个参数的下标
const sliceInd = computed((): any => {
  if (!isFold.value) return;
  const { sections, rowNum } = props;
  if (sections) {
    return (rowInd: number) => {
      const newSecLen = newSections.value.length;
      const isLast = rowInd === newSecLen - 1;
      return newSecLen <= rowNum
        ? colNum.value > 1
          ? colNum.value - (isLast ? 1 : 0)
          : 1
        : colNum.value - (rowInd === rowNum - 1 ? 1 : 0);
    };
  } else {
    return colNum.value > 1 ? colNum.value * rowNum - 1 : 1 * rowNum;
  }
});
//是否展示折叠按钮
const showFoldBtn = computed(() => {
  const { sections, rowNum } = props;
  if (sections) {
    const numArr = newSections.value.map((item: SectionFormItemAttrs, ind: number) => {
      const isLast = ind === newSections.value.length - 1;
      return item.fields.length <= colNum.value - (isLast ? 1 : 0) ? 1 : 2;
    });
    let total = 0;
    for (let i = 0; i < numArr.length; i++) {
      total += numArr[i];
      if (total > rowNum) return true;
    }
    return false;
  } else {
    return newFields.value.length > colNum.value * rowNum - 1;
  }
});
const formData = computed({
  get() {
    return props.modelValue;
  },
  set(val: CommonObj) {
    emits("update:modelValue", val);
  },
});
// watch fields 和 watch sections 只能两者选其一执行
watch(
  () => props.fields,
  (newVal: FormField[]) => {
    if (props.sections?.length) return;
    const { modelValue, grid } = props;
    const result = handleFields(newVal, undefined, modelValue, { quickAttrs: { grid: getGridAttrs(grid) } });
    const { data, fields } = result;
    newFields.value = fields;
    merge(formData.value, data);
    emits("change", formData.value, isFirst ? !!modelValue : false);
    isFirst = false;
  },
  { immediate: true, deep: true, once: !!props?.sections?.length }
);
watch(
  () => props.sections,
  (newVal: SectionFormItemAttrs[]) => {
    if (!newVal) return;
    const { modelValue } = props;
    newSections.value =
      newVal?.map((item: SectionFormItemAttrs) => {
        const { label, fields: secFields } = item;
        const result = handleFields(secFields, undefined, modelValue);
        const { data, fields } = result;
        item.fields = fields;
        merge(formData.value, data);
        return item;
      }) ?? [];
    emits("change", formData.value, isFirst ? !!modelValue : false);
    isFirst = false;
  },
  { immediate: true, deep: true, once: !props.sections }
);
useEvent("resize", () => (colNum.value = getColNum()), true);
function getMaxHeight() {
  const { rowNum, size } = props;
  const sizeMap = {
    small: 28,
    default: 40,
    large: 50,
  };
  const h = sizeMap[size];
  if (!isFold.value) return "35vh";
  const rows = colNum.value > 1 ? rowNum : rowNum + 1;
  return rows * h + "px";
}
//设置屏幕宽度类型
function getColNum() {
  const { grid } = props;
  const gridAttrs = getGridAttrs(grid);
  const colNumMap: CommonObj = {};
  const sizeType = getScreenSizeType();
  for (const key in gridAttrs) {
    colNumMap[key] = 24 / gridAttrs[key];
  }
  return colNumMap[sizeType];
}
//提交表单
function handleSubmit() {
  const formInst = formRef.value;
  if (!formInst) return;
  //fieldsObj: ValidateFieldsError
  formInst.validate((valid, fieldsObj) => {
    if (valid) {
      const { extraParams } = props;
      emits("search", merge({}, extraParams, formData.value));
    } else {
      const target = Object.values(fieldsObj)[0][0];
      showMessage(target.message, "error");
    }
  });
}
//重置表单
function resetForm() {
  formRef.value?.resetFields();
  emits("reset");
}
defineExpose({
  formRef,
  getFields() {
    if (!props.sections?.length) return newFields.value;
    return newSections.value.map((item: SectionFormItemAttrs) => item.fields).flat(1);
  },
});
</script>
<style lang="scss" scoped>
.query-form {
  border-radius: $radius-main;
  background: #fff;
  @include shadow-main();
  &.large {
    padding: $gap-large $gap-large 0 0;
  }
  &.default {
    padding: $gap-default $gap-default 0 0;
  }
  &.small {
    padding: $gap-small $gap-small 0 0;
  }
  // //是否是紧凑型
  // &.compact {
  //   :deep(.el-form-item__label) {
  //     padding: 0 $gap-qtr 0 0;
  //   }
  // }
  // //是否是小型
  // &.small {
  //   padding: $gap-qtr $gap-qtr 0 0;
  //   :deep(.el-form-item__label) {
  //     padding: 0 2px 0 0;
  //   }
  //   //去掉日期组件前面的图标
  //   :deep(.el-date-editor .el-range__icon) {
  //     display: none;
  //   }
  //   //elementPlus中没有提供对应的scss变量，故在此处写死
  //   :deep(.el-range-editor.el-input__wrapper) {
  //     padding: 0 $gap-qtr;
  //   }
  //   .sec-label {
  //     padding: $gap-qtr;
  //   }
  // }
}
.wrap-box {
  overflow: auto;
  transition: max-height $transition-time-main;
  overscroll-behavior: auto;
}
.sec-label {
  padding: $gap-half;
  font-weight: 900;
  font-size: $font-size-lighter;
}
.icon-fold {
  transition: transform $transition-time-main;
}
</style>
