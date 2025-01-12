<template>
  <el-form
    class="query-form"
    :model="formData"
    v-bind="defaultFormAttrs"
    @keyup.enter="handleSubmit"
    ref="formRef"
    v-if="newFields.length || newSections.length || showWhenNoFields"
  >
    <div class="wrap-box all-hide-scroll" :style="{ maxHeight: getMaxHeight() }" :class="{ 'f-fs-fs-w': !newSections.length }">
      <template v-if="newSections.length">
        <div class="f-fs-fs" v-for="(sItem, sInd) in newSections.slice(0, isFold ? rowNum : undefined)" :key="sInd">
          <el-button
            class="f-0"
            @click="sectionFolds[sInd] = !sectionFolds[sInd]"
            text
            type="info"
            :disabled="!sectionFoldable || sectionFolds[sInd] === undefined"
          >
            <template #icon v-if="sectionFoldable">
              <el-icon class="icon-fold" :class="{ 'rotate-180': !sectionFolds[sInd] && !sectionFolds[sInd] }">
                <Minus v-if="sectionFolds[sInd] === undefined" />
                <ArrowDown v-else />
              </el-icon>
            </template>
            {{ sItem.title }}
          </el-button>
          <div class="sec-fields f-fs-fs-w f-1">
            <QueryFields
              v-model="formData"
              v-bind="getQueryFieldsAttrs(field)"
              @change="(val: any, prop: string) => $emit('change', {[prop]: val})"
              v-for="(field, ind) in sItem.fields!.slice(0, sectionFolds[sInd] ? getSectionFoldSliceInd(sInd) : getSliceInd(sInd))"
              :key="ind"
            >
              <template #custom="{ field: currField }">
                <slot name="custom" :field="currField" />
              </template>
            </QueryFields>
            <QueryBtns
              :loading="loading"
              :isFold="isFold"
              :showFoldBtn="showFoldBtn"
              @fold="isFold = !isFold"
              @submit="handleSubmit"
              @reset="handleReset"
              v-bind="getGridAttrs(grid)"
              v-if="newSections.length <= rowNum ? sInd === newSections.length - 1 : isFold ? sInd === rowNum - 1 : sInd === newSections.length - 1"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <QueryFields
          v-model="formData"
          v-bind="getQueryFieldsAttrs(field)"
          @change="(val: any, prop: string) => $emit('change', {[prop]: val})"
          v-for="(field, ind) in newFields.slice(0, getSliceInd())"
          :key="ind"
        >
          <template #custom="{ field: currField }">
            <slot name="custom" :field="currField" />
          </template>
        </QueryFields>
        <QueryBtns
          :loading="loading"
          :isFold="isFold"
          :showFoldBtn="showFoldBtn"
          @fold="isFold = !isFold"
          @submit="handleSubmit"
          @reset="handleReset"
          v-bind="getGridAttrs(grid)"
        />
      </template>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { ArrowDown, Minus } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";
import { getScreenSizeType, showMessage } from "@/core/utils";
import { FormField, FormFieldAttrs, Grid } from "@/core/components/form/_types";
import { CommonObj, CommonSize } from "@/core/_types";
import QueryFields from "./_components/QueryFields.vue";
import QueryBtns from "./_components/QueryBtns.vue";
import config from "@/config";
import { useEvent, useFormAttrs } from "@/hooks";
import { getGridAttrs, getHandleFields } from "@/core/components/form/_utils";
import { SectionFormItemAttrs } from "@/core/components/form/_types";
import { defaultFormAttrs } from "@/core/components/form";
import { AfterReset } from "@/core/components/form/_components/FooterBtns.vue";
import _ from "lodash";

export type QueryFormItemLayoutType = "flex" | "grid"; // 表单项的布局方式：弹性布局、grid布局

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: FormField[]; //表单字段项
    sections?: SectionFormItemAttrs[];
    loading?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    rowNum?: number;
    extraParams?: CommonObj; //额外的参数
    inputDebounce?: boolean;
    grid: Grid;
    showWhenNoFields?: boolean; //没有字段时是否不显示表单内容
    sectionFoldable?: boolean;
    layoutType?: QueryFormItemLayoutType; // 表单项的布局方式：弹性布局、grid布局
    afterReset?: AfterReset;
  }>(),
  {
    layoutType: "grid",
    rowNum: 2,
    fields: () => [],
    modelValue: () => reactive({}),
    sectionFoldable: true,
    // ...config?.BaseCrud?._components?.QueryForm,
  }
);
const $emit = defineEmits(["update:modelValue", "submit", "change", "ready"]);
const formRef = ref<FormInstance>();
const colNum = ref(getColNum());
const isFold = ref(true);
const sectionFolds = reactive<boolean[]>(
  props?.sections?.map(it => {
    if (it?.fields?.length ?? 0 <= colNum.value) return false;
    return false;
  }) ?? []
);
const newFields = ref<FormFieldAttrs[]>([]);
// 暂时按 SectionFormItemAttrs 类型来定义，后续迭代可能会跟 SectionForm 的字段会保持一致
const newSections = ref<SectionFormItemAttrs[]>([]);
// 折叠或展开时，要截取的fields的长度的第二个参数的下标
function getSliceInd(sInd?: number): any {
  if (!isFold.value) return;
  const { sections, rowNum } = props;
  if (!sections) return colNum.value > 1 ? colNum.value * rowNum - 1 : 1 * rowNum;
  const newSecLen = newSections.value.length;
  if (newSecLen > rowNum) return colNum.value - (sInd === rowNum - 1 ? 1 : 0);
  const isLast = sInd === newSecLen - 1;
  return colNum.value > 1 ? colNum.value - (isLast ? 1 : 0) : 1;
}
function getSectionFoldSliceInd(sInd: number) {
  const isLast = sInd === newSections.value.length - 1;
  if (isLast) return colNum.value - 1;
  return colNum.value;
}
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
  get: () => props.modelValue,
  set: (val: CommonObj) => $emit("update:modelValue", val),
});
let isFirst = true;
// watch fields 和 watch sections 只能两者选其一执行
watch(
  () => props.fields,
  (newVal: FormField[], oldVal: FormField[]) => {
    if (props.sections?.length) return;
    const { modelValue, grid } = props;
    const result = getHandleFields(newVal, modelValue, { quickAttrs: { grid: getGridAttrs(grid) } }, "query");
    const { data, fields } = result;
    newFields.value = fields;
    merge(formData.value, data);
    if (isFirst) {
      $emit("ready");
      isFirst = false;
    }
  },
  { immediate: true, deep: true, once: !!props?.sections?.length }
);
watch(
  () => props.sections,
  (newVal: SectionFormItemAttrs[]) => {
    if (!newVal?.length) return (newSections.value = []);
    const { modelValue } = props;
    newSections.value =
      newVal.map((item: SectionFormItemAttrs) => {
        const { fields: secFields } = item;
        const result = getHandleFields(secFields, modelValue, undefined, "query");
        const { data, fields } = result;
        item.fields = fields;
        merge(formData.value, data);
        return item;
      }) ?? [];
    if (isFirst) {
      $emit("ready");
      isFirst = false;
    }
  },
  { immediate: true, deep: true, once: !props.sections }
);
useEvent("resize", () => (colNum.value = getColNum()), true);
const { size } = useFormAttrs();
function getMaxHeight() {
  const { rowNum } = props;
  const sizeMap = { small: 28, default: 40, large: 50 };
  const h = sizeMap[size];
  if (!isFold.value) return "35vh";
  const rows = colNum.value > 1 ? rowNum : rowNum + 1;
  return rows * h + "px";
}
// 获取QueryFields组件的属性
function getQueryFieldsAttrs(field) {
  const { disabled, readonly, inputDebounce, layoutType, grid } = props;
  const obj: CommonObj = { field, disabled, readonly, layoutType, inputDebounce };
  if (layoutType === "grid") {
    obj.grid = getGridAttrs(field?.quickAttrs?.grid ?? grid);
  } else if (layoutType === "flex") {
    Object.assign(obj, { class: "f-1", style: { maxWidth: "350px", min: "300px" } }); // `${100 / 5}%`
  } else {
    throw new Error(`暂不支持此类型：${layoutType}`);
  }
  return obj;
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
    if (!valid) {
      const target = Object.values(fieldsObj)[0][0];
      return showMessage(target?.message, "error");
    }
    const { extraParams } = props;
    $emit("submit", merge({}, extraParams, formData.value));
  });
}
// 重置表单
function handleReset() {
  formRef.value?.resetFields();
  props.afterReset?.();
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
  padding: var(--gap-half) var(--gap-half) 0 0;
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
  // }
}
.wrap-box {
  overflow: auto;
  transition: max-height $transition-time-main;
  overscroll-behavior: auto;
}
.icon-fold {
  transition: transform $transition-time-main;
}
</style>
