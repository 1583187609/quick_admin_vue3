<!-- 页面-简介 -->
<template>
  <!-- <div class="group-list"> -->
  <div class="group-item f-fs-fs-w" v-for="(item, ind) in newList" :key="ind">
    <BaseFormItem
      :prefixProp="`${parentProp}[${ind}].`"
      :field="field"
      :pureText="field.pureText || pureText"
      v-model="newList[ind][field.prop as string]"
      v-bind="field"
      v-for="(field, fInd) in newFields"
      :key="fInd"
    />
    <AddDelBtn @click="(type:AddDelBtnType)=>handleAddDel(type,ind)" :type="ind < newList.length - 1 ? 'del' : 'add'" />
  </div>
  <!-- </div> -->
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, nextTick } from "vue";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import AddDelBtn, { AddDelBtnType } from "@/components/AddDelBtn.vue";
import { merge } from "lodash";
import { emptyVals, showMessage } from "@/utils";
import { handleFields, getAddDelItem } from "@/components/form/_utils";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    parentProp: string;
    fields: FormField[];
    pureText?: boolean;
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

//监测是否存在空值
function validExistEmpty() {
  const vals = Object.values(newList.value.slice(-1)[0]);
  const existEmpty = vals.length ? vals.some(it => emptyVals.includes(it)) : true;
  return existEmpty;
}
//处理新增/删除按钮的逻辑
function handleAddDel(type: AddDelBtnType, ind: number) {
  if (type === "add") {
    if (validExistEmpty()) {
      showMessage("请将最后一项填写完毕后，再新增！", "error");
      return;
    }
    newList.value.push(JSON.parse(JSON.stringify(listItem)));
  } else if (type === "del") {
    newList.value.splice(ind, 1);
  } else {
    throw new Error(`暂不支持${type}类型`);
  }
}
</script>
<style lang="scss" scoped>
// .group-list {
.group-item {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
  .add-del-btn {
    margin-left: $gap-half;
  }
}
// }
</style>
