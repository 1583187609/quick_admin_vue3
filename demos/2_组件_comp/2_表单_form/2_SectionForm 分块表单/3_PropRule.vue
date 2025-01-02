<!-- summary 区块上的prop规则
  section部分有prop属性时，参数会包裹一层，反之，则直接挂在双向绑定的数据上。
 -->
<template>
  <SectionForm v-model="modelData" :sections="sections" @submit="PostMockCommon" :grid="12"></SectionForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CommonObj } from "@/core/_types";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { SectionFormItem, SectionFormItemAttrs } from "@/core/components/form/_types";
import { PostMockCommon } from "@/api-mock";

const modelData = reactive<CommonObj>({});
const sections: SectionFormItemAttrs[] = [
  {
    title: "基础信息",
    fields: [
      { prop: "avatar", label: "头像", type: "BaseUpload" },
      { prop: "name", label: "姓名", required: true },
      { prop: "gender", label: "性别", required: true },
      { prop: "age", label: "年龄", type: "input-number", attrs: { min: 0, max: 150 } },
    ],
  },
  {
    title: "详细信息",
    fields: [
      { prop: "height", label: "身高" },
      { prop: "weight", label: "体重" },
      { prop: "status", label: "情感状态", type: "select" },
      { prop: "phone", label: "电话", attrs: { maxlength: 11 }, required: true },
      { prop: "identity", label: "身份证号", attrs: { maxlength: 18 } },
      { prop: "address", label: "住址", type: "cascader" },
      { prop: "hobby", label: "兴趣爱好", type: "select" },
      { prop: "produce", label: "个人简介", type: "BaseEditor" },
      { prop: "remark", label: "备注", attrs: { type: "textarea" } },
    ],
  },
  {
    prop: "education_info",
    title: "教育信息",
    disabled: true,
    fields: [
      { prop: "degree", label: "学历", type: "select" },
      { prop: "school", label: "学校", type: "select", attrs: { options: [] } },
    ],
  },
  {
    title: "职业信息",
    prop: "vocational_info",
    fields: [
      { prop: "job", label: "职业", type: "select" },
      { prop: "annual_salary", label: "年薪", type: "select" },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
