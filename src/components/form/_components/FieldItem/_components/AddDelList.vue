<!-- 页面-简介 -->
<template>
  <el-form-item style="margin-bottom: 18px; width: 100%" v-for="(item, ind) in newList" :key="ind">
    <!-- <el-space> -->
    <FieldItem
      :prefixProp="`${parentProp}[${ind}]`"
      :field="field"
      :pureText="field.extraAttrs?.pureText || pureText"
      v-model="newList[ind][field.prop as string]"
      className="mr-o"
      v-bind="field"
      :ref="el => initRefsList(el, ind)"
      v-for="(field, fInd) in newFields"
      :key="fInd"
    />
    <AddDelBtn @click="(type:AddDelBtnType)=>handleAddDel(type,ind)" :type="ind < newList.length - 1 ? 'del' : 'add'" />
    <!-- </el-space> -->
  </el-form-item>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs } from "@/components/form";
import AddDelBtn, { AddDelBtnType } from "@/components/AddDelBtn.vue";
import { merge } from "lodash";
import { handleFields, getAddDelItem } from "@/components/form/_utils";
import { CommonObj } from "@/vite-env";
import { showMessage } from "@/components/_utils";
import FieldItem from "@/components/form/_components/FieldItem/Index.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    parentProp: string;
    fields: FormField[];
    pureText?: boolean;
    formRef?: any;
  }>(),
  {
    parentProp: "",
    fields: () => [],
  }
);
const emits = defineEmits(["update:modelValue", "change"]);

const refsList = ref<HTMLElement[]>([]);
const initRefsList = (el, ind) => {
  if (el) refsList.value[ind] = el;
};
const listItem = getAddDelItem(props.fields);
const newList = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
const newFields = ref<FormFieldAttrs[]>([]);
const formData = reactive<CommonObj>({});
watch(
  () => props.fields,
  newVal => {
    const { modelValue } = props;
    const result = handleFields(newVal, emits, modelValue);
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
    if (formRef) {
      const propsArr = Object.keys(newList.value[0]).map((key: string) => `${props.parentProp}[${ind}].${key}`);
      formRef.validateField(propsArr, (isValid, inValidFields: CommonObj) => {
        if (isValid) {
          handle();
        } else {
          const target = Object.values(inValidFields)[0][0];
          showMessage(target.message, "error");
        }
      });
    } else {
      handle();
    }
  } else if (type === "del") {
    newList.value.splice(ind, 1);
  } else {
    throw new Error(`暂不支持${type}类型`);
  }
}
</script>
<style lang="scss" scoped></style>
