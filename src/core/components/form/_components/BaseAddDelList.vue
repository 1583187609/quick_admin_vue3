<!-- 页面-简介 -->
<template>
  <el-form-item
    class="base-add-del-list"
    style="width: 100%"
    :style="{ marginBottom: ind < modelList.length - 1 ? '18px' : 'none' }"
    v-for="(item, ind) in modelList"
    :key="ind"
  >
    <!-- <el-space> -->
    <el-row v-bind="rowAttrs">
      <!-- :grid="field?.quickAttrs?.grid ?? grid"
      :readonly="field?.quickAttrs?.readonly ?? readonly"
      :pureText="field?.quickAttrs?.pureText ?? pureText"
      :disabled="field?.quickAttrs?.disabled ?? disabled"
      :size="field?.attrs?.size ?? field.size ?? size"
      :labelWidth="field?.labelWidth ?? labelWidth" -->
      <!-- :ref="el => initRefsList(el, ind)" -->
      <FieldItemCol
        v-model="modelList[ind][field.prop as string]"
        :prefixProp="`${prefixProp}[${ind}]`"
        :field="field"
        hideLabel
        v-bind="$attrs"
        v-for="(field, fInd) in newFields"
        :key="fInd"
      />
    </el-row>
    <IconBtns
      fontSize="26"
      @click="(type:IconBtnTpl) => handleAddDel(type, ind)"
      :tpl="ind < modelList.length - 1 ? 'delete' : modelList.length <= 1 ? 'add' : ['delete', 'add']"
    />
    <!-- </el-space> -->
  </el-form-item>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs, Grid } from "@/core/components/form/_types";
import { getAddDelItem, getHandleFields } from "@/core/components/form/_utils";
import { CommonObj, CommonSize } from "@/core/_types";
import { showMessage } from "@/core/utils";
import { useFormItem } from "element-plus";
import IconBtns, { IconBtnTpl } from "@/core/components/IconBtns.vue";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";
import _ from "lodash";

defineOptions({
  inheritAttrs: false,
});
const { merge, isEqual } = _;
const formItem = useFormItem();
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj[];
    prefixProp: string;
    fields: FormField[];
    hideLabel?: boolean;
    addAfterValid?: boolean; // 校验通过之后才能够添加
    rowAttrs?: CommonObj;
    // grid?: Grid;
    // size?: CommonSize;
    // readonly?: boolean;
    // disabled?: boolean;
    // pureText?: boolean;
    // labelWidth?: string;
  }>(),
  {
    modelValue: _props => reactive([getAddDelItem(_props.fields)]),
    hideLabel: true,
    addAfterValid: true,
    fields: () => [],
  }
);
const $emit = defineEmits(["update:modelValue"]);

// const refsList = ref<HTMLElement[]>([]);
// const initRefsList = (el, ind) => {
//   if (el) refsList.value[ind] = el;
// };
const listItem = getAddDelItem(props.fields);
const modelList = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const newFields = ref<FormFieldAttrs[]>([]);
let isFirst = true;
watch(
  () => props.fields,
  newVal => {
    const { modelValue } = props;
    const result = getHandleFields(newVal, modelValue);
    const { data, fields } = result;
    merge(modelList.value, data);
    newFields.value = fields;
    isFirst = false;
  },
  {
    immediate: true,
  }
);
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (isEqual(newVal, oldVal)) return;
    merge(modelList.value, newVal);
  },
  { immediate: false, deep: true }
);
function handleAdd() {
  modelList.value.push(JSON.parse(JSON.stringify(listItem)));
  // //让第一个元素聚焦
  // setTimeout(() => {
  //   console.log(refsList.value.at(-1), "让第一个元素聚焦暂未处理-------------");
  // }, 500);
}
function handleDelete(ind: number) {
  modelList.value.splice(ind, 1);
}
// 处理新增/删除按钮的逻辑
function handleAddDel(type: IconBtnTpl, ind: number) {
  if (type === "add") {
    if (!formItem.form.validateField || !props.addAfterValid) return handleAdd();
    const propsArr = Object.keys(modelList.value[0]).map((key: string) => `${props.prefixProp}[${ind}].${key}`);
    return formItem.form.validateField(propsArr, (isValid, inValidFields: CommonObj) => {
      if (isValid) return handleAdd();
      const target = Object.values(inValidFields)[0][0];
      showMessage(target.message, "error");
    });
  }
  if (type === "delete") return handleDelete(ind);
  throw new Error(`暂不支持此类型：${type}`);
}
</script>
<style lang="scss" scoped></style>
