<!-- 公司申报/添加/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="model"
    :fields="fields"
    :fetch="isAdd ? GetAuthRoleList : GetAuthRoleList"
    :fetchSuccess="refreshList"
    :extraParams="{ id: data?.id, doRelationFeedbackCompany: isApply ? data!.id : undefined }"
  >
    <!-- 状态,0=启用,1=禁用 -->
    <template #logoUrl="{ form }">
      <BaseUpload v-model="form.logoUrl" />
    </template>
    <template #emailSuffix="{ form }">
      <AddDelTag v-model="form.emailSuffix" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/form/_components/FieldItem";
import { GetAuthRoleList } from "@/api-mock";
import AddDelTag from "@/components/AddDelTag.vue";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/vite-env";

//是否支持： 0否;1=是
const supportSwitchAttrs: CommonObj = {
  activeValue: 1,
  inactiveValue: 0,
  activeText: "支持",
  inactiveText: "不支持",
  inlinePrompt: true,
  style: "width: 5em",
};
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
    isApply?: boolean; //是否是公司申报
  }>(),
  {}
);
console.log(props.data, "data----------------");
const isAdd = props.data && !props.isApply; //是否是新增
const model = reactive<CommonObj>(getModel());
const fields: FormField[] = [
  {
    prop: "typeId",
    label: "公司类型",
    type: "select",
    options: [],
    attrs: {},
  },
  {
    prop: "fullName",
    label: "公司全称",
    required: true,
    attrs: { maxlength: 30 },
  },
  {
    prop: "shortName",
    label: "公司简称",
    required: true,
    attrs: { maxlength: 10 },
  },
  { prop: "logoUrl", label: "公司logo", required: true, type: "custom" },
  { prop: "emailSuffix", label: "邮箱后缀", type: "custom" },
  {
    label: "认证方式",
    children: [
      {
        prop: "isSupportEmail",
        label: "邮箱认证",
        type: "switch",
        labelWidth: "6em",
        attrs: supportSwitchAttrs,
      },
      {
        prop: "isSupportPerson",
        label: "人工认证",
        type: "switch",
        labelWidth: "6em",
        attrs: supportSwitchAttrs,
      },
      {
        prop: "isSupportDingTalk",
        label: "钉钉认证",
        type: "switch",
        labelWidth: "6em",
        attrs: supportSwitchAttrs,
      },
      {
        prop: "isSupportFeiShu",
        label: "飞书认证",
        type: "switch",
        labelWidth: "6em",
        attrs: supportSwitchAttrs,
      },
      {
        prop: "isSupportCpyWeChat",
        label: "企业微信认证",
        type: "switch",
        attrs: supportSwitchAttrs,
      },
    ],
  },
  !props.isApply && {
    prop: "status",
    label: "是否启用",
    type: "switch",
  },
];
function getModel() {
  const { isApply, data } = props;
  //为0时不要回显数字0
  if (data?.typeId === 0) {
    data.typeId = "";
  }
  if (isApply) {
    const { companyName } = data || {};
    //公司申报时不回显邮箱
    return { status: 0, emailSuffix: [], fullName: companyName };
  } else {
    //新增/编辑时
    return Object.assign({ status: 0, emailSuffix: [] }, data);
  }
}
</script>
<style lang="scss" scoped></style>
