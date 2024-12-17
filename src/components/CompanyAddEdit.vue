<!-- 公司申报/添加/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="isAdd ? GetAuthRoleList : GetAuthRoleList"
    :afterSuccess="() => refreshList?.()"
    :extraParams="{ id: data?.id, doRelationFeedbackCompany: isApply ? data!.id : undefined }"
  >
    <!-- 状态,0=启用,1=禁用 -->
    <template #logoUrl>
      <BaseUpload v-model="modelData.logoUrl" />
    </template>
    <template #emailSuffix>
      <AddDelTag v-model="modelData.emailSuffix" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/core/components/form/_types";
import { GetAuthRoleList } from "@/api-mock";
import AddDelTag from "@/core/components/form/_components/AddDelTag.vue";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/core/_types";

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
const modelData = reactive<CommonObj>(getModel());
const fields: FormField[] = [
  {
    prop: "typeId",
    label: "公司类型",
    type: "select",
    attrs: {
      options: [],
    },
  },
  {
    prop: "full_name",
    label: "公司全称",
    required: true,
    attrs: { maxlength: 30 },
  },
  {
    prop: "short_name",
    label: "公司简称",
    required: true,
    attrs: { maxlength: 10 },
  },
  { prop: "logoUrl", label: "公司logo", required: true, type: "slot" },
  { prop: "emailSuffix", label: "邮箱后缀", type: "slot" },
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
    const { company_name } = data || {};
    //公司申报时不回显邮箱
    return { status: 0, emailSuffix: [], full_name: company_name };
  } else {
    //新增/编辑时
    return Object.assign({ status: 0, emailSuffix: [] }, data);
  }
}
</script>
<style lang="scss" scoped></style>
