<!-- 页面-简介 -->
<template>
  <BaseForm
    style="width: 500px"
    :fetch="PostMockCommon"
    :fields="fields"
    :moreBtns="[
      { name: 'pass', popconfirm: false },
      { name: 'view', btnText: '查看' },
    ]"
    @moreBtns="onMoreBtns"
    :handleRequest="handleRequest"
  ></BaseForm>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { CommonObj, FinallyNext } from "@/vite-env";
import { PostMockCommon } from "@/api-mock";
import { FormField } from "@/components/form/_types";
import { BtnName } from "@/components/BaseBtn/_types";
import { handleBtnNext } from "@/utils";
import { OpenPopupInject } from "@/components/BasicPopup/_types";
const openPopup = inject<OpenPopupInject>("openPopup");
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  { exampleProp: () => ({}) }
);
const fields: FormField[] = [
  { prop: "tx", label: "头像", type: "BaseUpload" },
  {
    prop: "dhhm",
    label: "电话号码",
    required: true,
    quickAttrs: {
      rulesType: "phone",
    },
  },
  {
    prop: "xm",
    label: "姓名",
    quickAttrs: {
      popover: "请注意输入真实姓名",
    },
    attrs: {
      maxlength: 6,
    },
  },
  {
    prop: "zwjs",
    label: "自我介绍",
    attrs: {
      type: "textarea",
      maxlength: 100,
      rows: 3,
    },
  },
];
function onMoreBtns(name: BtnName, data: CommonObj, next: FinallyNext) {
  handleBtnNext(
    {
      pass: () => PostMockCommon().then(() => next()),
      view: () => openPopup("第二个纯文本弹窗示例", "你好！这是第二个纯文本弹窗示例"),
    },
    name
  );
}
function handleRequest(params: CommonObj) {
  //做一些参数处理……
  return params;
}
</script>
<style lang="scss" scoped></style>
