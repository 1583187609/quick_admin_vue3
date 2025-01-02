<!-- summary 插槽规则
  section部分有prop属性时，以插槽名称，反之以section的index作为插槽名称
 -->
<template>
  <SectionForm v-model="modelData" :sections="sections" @submit="PostMockCommon">
    <template #zdy1>这是自定义1插槽的内容</template>
    <template #education_info-zdy2>这是自定义2插槽的内容</template>
    <template #other_info>
      <el-form-item label="附件信息">
        <BaseUpload v-model="modelData.annex" />
      </el-form-item>
    </template>
  </SectionForm>
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
      { prop: "zdy1", label: "自定义1", type: "slot" },
    ],
  },
  {
    prop: "education_info",
    title: "教育信息",
    disabled: true,
    fields: [
      { prop: "degree", label: "学历", type: "select" },
      { prop: "school", label: "学校", type: "select", attrs: { options: [] } },
      { prop: "zdy2", label: "自定义2", type: "slot" },
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
  {
    prop: "other_info",
    title: "其他信息",
    type: "slot",
  },
];
</script>
<style lang="scss" scoped></style>
