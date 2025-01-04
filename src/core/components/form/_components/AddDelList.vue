<!-- 页面-简介 -->
<template>
  <el-form-item
    style="width: 100%"
    :style="{ marginBottom: ind < modelList.length - 1 ? '18px' : 'none' }"
    v-for="(item, ind) in modelList"
    :key="ind"
  >
    <!-- <el-space> -->
    <el-row>
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
        v-for="(field, fInd) in newFields"
        :key="fInd"
      />
    </el-row>
    <IconBtns
      fontSize="26"
      @click="(type:IconBtnTpl)=>handleAddDel(type,ind)"
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
import IconBtns, { IconBtnTpl } from "@/core/components/IconBtns.vue";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";
import _ from "lodash";

const { merge, isEqual } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj[];
    prefixProp: string;
    fields: FormField[];
    hideLabel?: boolean;
    // grid?: Grid;
    // size?: CommonSize;
    // readonly?: boolean;
    // disabled?: boolean;
    // pureText?: boolean;
    // labelWidth?: string;
    formRef?: any;
  }>(),
  {
    modelValue: _props => reactive([getAddDelItem(_props.fields)]),
    hideLabel: true,
    fields: () => [],
  }
);
const $emit = defineEmits(["update:modelValue", "change"]);

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

// 处理新增/删除按钮的逻辑
function handleAddDel(type: IconBtnTpl, ind: number) {
  if (type === "add") {
    const { formRef } = props;
    function handle() {
      modelList.value.push(JSON.parse(JSON.stringify(listItem)));
      // //让第一个元素聚焦
      // setTimeout(() => {
      //   console.log(refsList.value.at(-1), "让第一个元素聚焦暂未处理-------------");
      // }, 500);
    }
    if (!formRef) return handle();
    const propsArr = Object.keys(modelList.value[0]).map((key: string) => `${props.prefixProp}[${ind}].${key}`);
    formRef.validate(propsArr, (isValid, inValidFields: CommonObj) => {
      if (isValid) return handle();
      const target = Object.values(inValidFields)[0][0];
      showMessage(target.message, "error");
    });
    return;
  }
  if (type === "delete") return modelList.value.splice(ind, 1);
  throw new Error(`暂不支持${type}类型`);
}
</script>
<style lang="scss" scoped></style>
