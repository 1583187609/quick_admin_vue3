<!-- 页面-简介 -->
<template>
  <el-form-item style="margin-bottom: 18px" v-for="(item, ind) in newList" :key="ind">
    <!-- <el-space> -->
    <BaseFormItem
      :prefixProp="`${parentProp}[${ind}]`"
      :field="field"
      :pureText="field.extra?.pureText || pureText"
      v-model="newList[ind][field.prop as string]"
      className="mr-o"
      v-bind="field"
      v-for="(field, fInd) in newFields"
      :key="fInd"
    />
    <AddDelBtn @click="(type:AddDelBtnType)=>handleAddDel(type,ind)" :type="ind < newList.length - 1 ? 'del' : 'add'" />
    <!-- </el-space> -->
  </el-form-item>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import AddDelBtn, { AddDelBtnType } from "@/components/AddDelBtn.vue";
import { merge } from "lodash";
import { handleFields, getAddDelItem } from "@/components/form/_utils";
import { CommonObj } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    parentProp: string;
    fields: FormField[];
    pureText?: boolean;
    validate?: () => Promise<any>;
  }>(),
  {
    parentProp: "",
    fields: () => [],
  }
);
const emits = defineEmits(["update:modelValue", "change"]);
const listItem = getAddDelItem(props.fields);
const newList = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
const formData = reactive<CommonObj>({});
const newFields = ref<FormFieldAttrs[]>([]);
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
    merge(formData, newVal);
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
    const { validate } = props;
    if (validate) {
      validate().then((params: CommonObj) => {
        newList.value.push(JSON.parse(JSON.stringify(listItem)));
      });
    } else {
      newList.value.push(JSON.parse(JSON.stringify(listItem)));
    }
  } else if (type === "del") {
    newList.value.splice(ind, 1);
  } else {
    throw new Error(`暂不支持${type}类型`);
  }
}
</script>
<style lang="scss" scoped></style>
