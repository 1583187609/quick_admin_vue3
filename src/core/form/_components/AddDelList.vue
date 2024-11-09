<!-- 页面-简介 -->
<template>
  <el-form-item style="width: 100%" :style="{ marginBottom: ind < newList.length - 1 ? '18px' : 'none' }" v-for="(item, ind) in newList" :key="ind">
    <!-- <el-space> -->
    <el-row>
      <!-- :grid="field?.quickAttrs?.grid ?? grid"
      :readonly="field?.quickAttrs?.readonly ?? readonly"
      :pureText="field?.quickAttrs?.pureText ?? pureText"
      :disabled="field?.quickAttrs?.disabled ?? disabled"
      :size="field?.attrs?.size ?? field.size ?? size"
      :labelWidth="field?.labelWidth ?? labelWidth" -->
      <FieldItemCol
        :prefixProp="`${parentProp}[${ind}]`"
        :field="field"
        :showChildrenLabel="showChildrenLabel"
        v-model="newList[ind][field.prop as string]"
        isChild
        :ref="el => initRefsList(el, ind)"
        v-for="(field, fInd) in newFields"
        :key="fInd"
      />
    </el-row>
    <AddDelBtn @click="(type:AddDelBtnType)=>handleAddDel(type,ind)" :type="ind < newList.length - 1 ? 'del' : 'add'" />
    <!-- </el-space> -->
  </el-form-item>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs, Grid } from "@/core/form/_types";
import AddDelBtn, { AddDelBtnType } from "@/core/form/_components/AddDelBtn.vue";
import { handleFields, getAddDelItem } from "@/core/form/_utils";
import { CommonObj, CommonSize } from "@/vite-env";
import { showMessage } from "@/core/_utils";
import FieldItemCol from "@/core/form/_components/FieldItemCol/Index.vue";
import _ from "lodash";

const { merge } = _;
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    parentProp: string;
    fields: FormField[];
    // grid?: Grid;
    // size?: CommonSize;
    // readonly?: boolean;
    // disabled?: boolean;
    // pureText?: boolean;
    // labelWidth?: string;
    showChildrenLabel?: boolean; //是否显示子级的label
    formRef?: any;
  }>(),
  {
    parentProp: "",
    fields: () => [],
  }
);
const $emit = defineEmits(["update:modelValue", "change"]);

const refsList = ref<HTMLElement[]>([]);
const initRefsList = (el, ind) => {
  if (el) refsList.value[ind] = el;
};
const listItem = getAddDelItem(props.fields);
const newList = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const newFields = ref<FormFieldAttrs[]>([]);
const formData = reactive<CommonObj>({});
watch(
  () => props.fields,
  newVal => {
    const { modelValue } = props;
    const result = handleFields(newVal, $emit, modelValue);
    const { data, fields } = result;
    merge(formData, data);
    newFields.value = fields;
  },
  {
    immediate: true,
  }
);
watch(
  () => props.modelValue,
  newVal => {
    // 用 isDel 标记是为了处理点击删除时，删除不掉的bug
    const isDel = newVal.length < Object.keys(formData).length;
    if (isDel) {
      Object.keys(formData).forEach(key => delete formData[key]); //是为了清空对象属性，然后重新赋值
      merge(formData, newVal);
    } else {
      merge(formData, newVal);
    }
  },
  { immediate: false, deep: true }
);
watch(
  formData,
  newVal => {
    merge(props.modelValue, newVal);
  },
  { immediate: false, deep: true }
);

//处理新增/删除按钮的逻辑
function handleAddDel(type: AddDelBtnType, ind: number) {
  if (type === "add") {
    const { formRef } = props;
    function handle() {
      newList.value.push(JSON.parse(JSON.stringify(listItem)));
      // //让第一个元素聚焦
      // setTimeout(() => {
      //   console.log(refsList.value.at(-1), "让第一个元素聚焦暂未处理-------------");
      // }, 500);
    }
    if (!formRef) return handle();
    const propsArr = Object.keys(newList.value[0]).map((key: string) => `${props.parentProp}[${ind}].${key}`);
    formRef.validateField(propsArr, (isValid, inValidFields: CommonObj) => {
      if (isValid) return handle();
      const target = Object.values(inValidFields)[0][0];
      showMessage(target.message, "error");
    });
    return;
  }
  if (type === "del") return newList.value.splice(ind, 1);
  throw new Error(`暂不支持${type}类型`);
}
</script>
<style lang="scss" scoped></style>
