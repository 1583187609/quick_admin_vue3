<!-- 认证信息 -->
<template>
  <BaseSection title="认证信息">
    <template #right>
      <el-tag type="success" class="tag">已完善资料</el-tag>
    </template>
  </BaseSection>
  <BaseSection title="实名认证">
    <template #right>
      <el-tag class="tag" type="success">已认证</el-tag>
      <el-tag class="tag">后台认证</el-tag>
    </template>
    <CellForm :fields="realNameFormFields" :footer="false"></CellForm>
  </BaseSection>
  <BaseSection title="学历认证">
    <template #right>
      <el-tag type="success" class="tag">已认证</el-tag>
      <el-tag class="tag">取消认证</el-tag>
    </template>
    <CellForm :fields="educationFormFields" :footer="false"></CellForm>
  </BaseSection>
  <BaseSection title="公司认证">
    <template #right>
      <el-tag type="success" class="tag">已认证</el-tag>
      <el-tag class="tag">取消认证</el-tag>
    </template>
    <CellForm :fields="companyFormFields" :footer="false"></CellForm>
  </BaseSection>
  <BaseSection title="公司认证记录">
    <template #right>
      <el-tag type="success" class="tag">已完善资料</el-tag>
    </template>
    <BaseTable :cols="companyCols" :rows="companyRows"></BaseTable>
  </BaseSection>
  <BaseSection title="学历认证记录">
    <template #right>
      <el-tag type="success" class="tag">已完善资料</el-tag>
    </template>
    <BaseTable :cols="educationCols" :rows="educationRows"></BaseTable>
  </BaseSection>
</template>
<script lang="ts" setup>
import CellForm, { CellFormField } from "@/components/form/CellForm.vue";
import { TableColAttrs } from "@/components/table";
import { CommonObj } from "@/vite-env";
import { ref, reactive, watch, computed } from "vue";
const props = withDefaults(
  defineProps<{
    type?: CommonObj;
  }>(),
  {
    type: () => ({}),
  }
);
const realNameFormFields: CellFormField[] = [
  { prop: "zsxm", label: "真实姓名" },
  { prop: "sfzh", label: "身份证号/通信证号", valid: "identity" },
  { prop: "hjcs", label: "户籍城市", type: "cascader" },
];
const educationFormFields: CellFormField[] = [
  { prop: "xxmc", label: "学校名称" },
  { prop: "xlzsjb", label: "学历证书级别" },
  { prop: "zdlx", label: "在读类型", type: "select" },
  { prop: "xxjb", label: "学校级别", type: "select" },
  { prop: "rlxsd", label: "人脸相似度", type: "input-number" },
];
const companyFormFields: CellFormField[] = [
  { prop: "gsmc", label: "公司名称" },
  { prop: "jc", label: "简称" },
  { prop: "yxrz", label: "邮箱认证" },
];
const companyCols: TableColAttrs[] = [
  { prop: "gsmc", label: "公司名称" },
  { prop: "gsjc", label: "公司简称" },
  { prop: "gslx", label: "公司类型" },
  { prop: "rzfs", label: "认证方式" },
  { prop: "yx", label: "邮箱" },
  { prop: "rztp", label: "认证图片" },
  { prop: "tjsj", label: "提交时间" },
  { prop: "tgsj", label: "通过时间" },
  { prop: "rzzt", label: "认证状态" },
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
const companyRows: CommonObj[] = reactive<CommonObj[]>([]);
const educationRows: CommonObj[] = reactive<CommonObj[]>([]);
</script>
<style lang="scss" scoped>
.base-section {
  &:not(:last-child) {
    margin-bottom: $gap-half;
  }
}
.tag {
  margin-right: $gap-half;
  &:last-child {
    margin-right: auto;
  }
}
</style>
