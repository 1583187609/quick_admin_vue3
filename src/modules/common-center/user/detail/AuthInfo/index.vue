<!-- 认证信息 -->
<template>
  <SectionForm styleType="cell" pureText :sections="sections">
    <!-- 认证信息 -->
    <template #head-right-auth_info>
      <el-tag type="success" class="tag mr-a">已完善资料</el-tag>
    </template>
    <!-- 实名认证 -->
    <template #head-right-real_name_auth>
      <el-tag class="tag" type="success">已认证</el-tag>
      <el-tag class="tag mr-a">后台认证</el-tag>
    </template>
    <!-- 学历认证 -->
    <template #head-right-education_auth>
      <el-tag type="success" class="tag">已认证</el-tag>
      <el-tag class="tag mr-a">取消认证</el-tag>
    </template>
    <!-- 学历认证记录 -->
    <template #head-right-education_auth_list>
      <el-tag type="success" class="tag mr-a">已完善资料</el-tag>
    </template>
    <template #education_auth_list>
      <BaseTable :cols="companyCols" :data="companyRows" />
    </template>
    <!-- 公司认证记录 -->
    <template #head-right-company_auth_list>
      <el-tag type="success" class="tag mr-a">已完善资料</el-tag>
    </template>
    <template #company_auth_list>
      <BaseTable :cols="educationCols" :data="educationRows" />
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { SectionFormItemAttrs } from "@/core/components/form/_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { CommonObj } from "@/core/_types";
import SectionForm from "@/core/components/form/SectionForm.vue";
const sections: SectionFormItemAttrs[] = [
  { prop: "auth_info", title: "认证信息", type: "slot" },
  {
    prop: "real_name_auth",
    title: "实名认证",
    fields: [
      { prop: "zsxm", label: "真实姓名" },
      {
        tpl: "T_Identity",
        prop: "sfzh",
        label: "身份证号/通信证号",
        quickAttrs: {},
      },
      { prop: "hjcs", label: "户籍城市", type: "cascader" },
    ],
  },
  {
    prop: "education_auth",
    title: "学历认证",
    fields: [
      { prop: "xxmc", label: "学校名称" },
      { prop: "xlzsjb", label: "学历证书级别" },
      { prop: "zdlx", label: "在读类型", type: "select" },
      { prop: "xxjb", label: "学校级别", type: "select" },
      { prop: "rlxsd", label: "人脸相似度", type: "input-number" },
    ],
  },
  {
    prop: "company_auth",
    title: "公司认证",
    fields: [
      { prop: "gsmc", label: "公司名称" },
      { prop: "jc", label: "简称" },
      { prop: "yxrz", label: "邮箱认证" },
    ],
  },
  { prop: "education_auth_list", title: "学历认证记录", type: "slot" },
  { prop: "company_auth_list", title: "公司认证记录", type: "slot" },
];
const companyCols: TableColAttrs[] = [
  { prop: "gsmc", label: "公司名称" },
  { prop: "gsjc", label: "公司简称" },
  { prop: "gslx", label: "公司类型" },
  { prop: "rzfs", label: "认证方式" },
  { prop: "yx", label: "邮箱" },
  { tpl: "T_BaseImg", prop: "rztp", label: "认证图片", minWidth: 114 },
  { prop: "tjsj", label: "提交时间" },
  { prop: "tgsj", label: "通过时间" },
  { prop: "rzzt", label: "认证状态", type: "BaseTag" },
  { prop: "czr", label: "操作人" },
];
const educationCols: TableColAttrs[] = [
  { prop: "xxmc", label: "学校名称" },
  { prop: "xxlx", label: "学校类型" },
  { prop: "xl", label: "学历" },
  { prop: "sfzd", label: "是否在读" },
  { prop: "rzlx", label: "认证类型" },
  { prop: "zsbh", label: "证书编号" },
  { prop: "tjsj", label: "提交时间" },
  { prop: "tgsj", label: "通过时间" },
  { prop: "rzzt", label: "认证状态" },
  { prop: "sbyy", label: "失败原因" },
  { prop: "czr", label: "操作人" },
];
const companyRows: CommonObj[] = reactive<CommonObj[]>([{ gsmc: "xxx科技公司", rzzt: 1 }]);
const educationRows: CommonObj[] = reactive<CommonObj[]>([]);
</script>
<style lang="scss" scoped>
.tag {
  margin-left: $gap-half;
}
</style>
