<!-- summary
  支持的控件类型包括以下三部分：
  ElementPlus：input, select, …
  内置：BaseImg, BaseUpload, BaseNumberRange, …
  自定义扩展：UserInfo, …
 -->
<template>
  <BaseForm v-mode="model" :fields="fields" :fetch="PostMockCommon">
    <template #zdy>
      <input placeholder="请输入（这是自定义的输入框）" style="width: 400px; border: 1px solid purple; border-radius: 6px" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormFieldAttrs } from "@/components/form/_components/FieldItem";
import { PostMockCommon, GetCascaderRegion } from "@/api-mock";
import { CommonObj,OptionItem } from "@/vite-env";

const model = reactive<CommonObj>({
  age: 12,
  gender: 0,
});
const genderOpts = [
  {label: '未知',value: 0},
  {label: '男',value: 1},
  {label:'女',value: 2}
]
const regionOpts = ref<OptionItem[]>([]);
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true },
  { prop: "gender", label: "性别", type: "select",required: true, options: genderOpts },
  { prop: "age", label: "年龄", type: "input-number",attrs:{ min: 0, max: 100 } },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 100, max: 250 } },
  { prop: "weight", label: "体重", type: "slider", attrs: { min: 100, max: 250 } },
  { prop: "avatar", label: "头像", type: "BaseUpload" },
  { prop: "region", label: "省市区", type: "cascader", options: regionOpts.value },
  { prop: "remark", label: "备注", attrs: { type: 'textarea'}},
  {
    prop: "err",
    label: "分类",
    type: "cascader1",
    extraAttrs: {
      tips: "当类型错误时，会提示【不存在】文案，并标红",
    },
  },
  { prop: "zdy", label: "自定义", type: "custom", extraAttrs: { popover: `设置type: "custom"，即可自定义控件` } },
];

const getRegionOpts = ()=>{
  GetCascaderRegion().then((res)=>(regionOpts.value=res))
}
getRegionOpts();
</script>
<style lang="scss" scoped></style>
