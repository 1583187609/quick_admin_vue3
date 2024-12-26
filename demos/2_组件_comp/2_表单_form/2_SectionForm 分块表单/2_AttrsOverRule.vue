<!-- summary 属性覆盖原则
  属性覆盖原则：顶层元素SectionForm的属性可依次被SectionItem、FormFieldItem覆盖
  labelWidth grid size readonly disabled pureText styleType
 -->
<template>
  <SectionForm v-model="modelData" :sections="sections" :fetch="PostMockCommon" :grid="12"></SectionForm>
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
    grid: 8,
    fields: [
      { prop: "avatar", label: "头像", type: "BaseUpload" },
      { prop: "name", label: "姓名" },
      { prop: "gender", label: "性别" },
      { prop: "age", label: "年龄", type: "input-number", attrs: { min: 0, max: 150 } },
      { prop: "height", label: "身高" },
      { prop: "weight", label: "体重" },
      { prop: "status", label: "情感状态", type: "select" },
      { prop: "phone", label: "电话", attrs: { maxlength: 11 } },
      { prop: "identity", label: "身份证号", attrs: { maxlength: 18 } },
      { prop: "address", label: "住址", type: "cascader" },
    ],
  },
  {
    title: "教育信息",
    disabled: true,
    fields: [
      { prop: "degree", label: "学历", type: "select" },
      { prop: "school", label: "学校", type: "select", attrs: { options: [] } },
    ],
  },
  {
    title: "职业信息",
    pureText: true,
    fields: [
      { prop: "job", label: "职业", type: "select" },
      { prop: "annual_salary", label: "年薪", type: "select" },
    ],
  },
  {
    title: "附加信息",
    labelWidth: "10em",
    fields: [
      { prop: "hobby", label: "兴趣爱好", type: "select" },
      { prop: "produce", label: "个人简介", type: "BaseEditor" },
      { prop: "remark", label: "备注", labelWidth: "3em", attrs: { type: "textarea" } },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
