<template>
  <el-form
    class="query-form"
    :class="{ compact, small: isSmall }"
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
            :className="isSmall ? 'mb-qtr' : 'mb-half'"
            :inputDebounce="inputDebounce"
            :size="$attrs.size"
            @change="(key:string, val:any)=>emits('change', {[key]: val})"
            v-bind="getColAttrs(field)"
            v-for="(field, ind) in sItem.fields.slice(0, sliceInd?.(sInd))"
            :key="ind"
          >
            <template #custom="{ field: currField }">
              <slot name="custom" :field="currField" :form="formData"></slot>
            </template>
          </QueryFields>
          <QueryBtns
            :class="[isSmall ? 'mb-qtr' : 'mb-half']"
            :small="isSmall"
            :compact="compact"
            :loading="loading"
            :isFold="isFold"
            :showFoldBtn="showFoldBtn"
            @submit="handleSubmit"
            @fold="isFold = !isFold"
            @reset="resetForm"
            v-bind="colSpanAttrs"
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
        :className="isSmall ? 'mb-qtr' : 'mb-half'"
        :inputDebounce="inputDebounce"
        :size="$attrs.size"
        @change="(key:string, val:any)=>emits('change', {[key]: val})"
        v-bind="getColAttrs(field)"
        v-for="(field, ind) in newFields.slice(0, sliceInd)"
        :key="ind"
      >
        <template #custom="{ field: currField }">
          <slot name="custom" :field="currField" :form="formData"></slot>
        </template>
      </QueryFields>
      <QueryBtns
        :class="[isSmall ? 'mb-qtr' : 'mb-half']"
        :small="isSmall"
        :compact="compact"
        :loading="loading"
        :isFold="isFold"
        :showFoldBtn="showFoldBtn"
        @submit="handleSubmit"
        @fold="isFold = !isFold"
        @reset="resetForm"
        v-bind="colSpanAttrs"
      />
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, inject, computed, watch, useAttrs } from "vue";
import { FormInstance } from "element-plus";
import { getScreenSizeType, showMessage } from "@/components/_utils";
import { FormField, FormFieldAttrs } from "@/components/form";
import { merge } from "lodash";
import { CommonObj } from "@/vite-env";
import QueryFields from "./_components/QueryFields.vue";
import QueryBtns from "./_components/QueryBtns.vue";
import config from "@/config";
import { useEvent } from "@/hooks";
import { handleFields } from "@/components/form/_utils";
import { ColSpanAttrs, SectionFieldsItemAttrs, defaultFormAttrs } from "@/components/form";

const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: FormField[]; //表单字段项
    sections?: SectionFieldsItemAttrs[];
    loading?: boolean;
    rowNum?: number;
    extraParams?: CommonObj; //额外的参数
    inputDebounce?: boolean;
    colSpanAttrs?: ColSpanAttrs;
    compact?: boolean; //是否是紧凑的
    noFieldsHide?: boolean; //没有字段时是否不显示表单内容
  }>(),
  Object.assign(
    {
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
const $attrs = useAttrs();
const formRef = ref<FormInstance>();
const colNum = ref(2);
const isFold = ref(true);
const newFields = ref<FormFieldAttrs[]>([]);
const newSections = ref<SectionFieldsItemAttrs[]>([]);
const isSmall = $attrs.size === "small";
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
    const numArr = newSections.value.map((item: SectionFieldsItemAttrs, ind: number) => {
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
    const { modelValue } = props;
    const result = handleFields(newVal, undefined, modelValue);
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
  (newVal: SectionFieldsItemAttrs[]) => {
    if (!newVal) return;
    const { modelValue } = props;
    newSections.value =
      newVal?.map((item: SectionFieldsItemAttrs) => {
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
  if (!isFold.value) return "35vh";
  const rows = colNum.value > 1 ? props.rowNum : props.rowNum + 1;
  return rows * (isSmall ? 28 : 40) + "px";
}
//设置屏幕宽度类型
function getColNum() {
  const { colSpanAttrs } = props;
  const colNumMap: CommonObj = {};
  const size = getScreenSizeType();
  for (const key in colSpanAttrs) {
    colNumMap[key] = 24 / colSpanAttrs[key];
  }
  return colNumMap[size];
}
//获取列属性
function getColAttrs(field: FormFieldAttrs) {
  const { colSpanAttrs } = props;
  const { span, type } = field;
  if (span) return { span };
  return colSpanAttrs;
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
    return newSections.value.map((item: SectionFieldsItemAttrs) => item.fields).flat(1);
  },
});
</script>
<style lang="scss" scoped>
.query-form {
  padding: $gap-half $gap-half 0 0;
  border-radius: $radius-main;
  background: #fff;
  @include shadow-main();
  //是否是紧凑型
  &.compact {
    :deep(.el-form-item__label) {
      padding: 0 $gap-qtr 0 0;
    }
  }
  //是否是小型
  &.small {
    padding: $gap-qtr $gap-qtr 0 0;
    :deep(.el-form-item__label) {
      padding: 0 2px 0 0;
    }
    //去掉日期组件前面的图标
    :deep(.el-date-editor .el-range__icon) {
      display: none;
    }
    //elementPlus中没有提供对应的scss变量，故在此处写死
    :deep(.el-range-editor.el-input__wrapper) {
      padding: 0 $gap-qtr;
    }
    .sec-label {
      padding: $gap-qtr;
    }
  }
}
.mb-half {
  margin-bottom: $gap-half;
}
.mb-qtr {
  margin-bottom: $gap-qtr;
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
