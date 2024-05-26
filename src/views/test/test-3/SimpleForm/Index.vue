<!-- 页面-简介 -->
<template>
  <BaseForm
    style="width: 500px"
    :fetch="PostUserList"
    :fields="fields"
    :moreBtns="[
      { name: 'pass', popconfirm: false },
      { name: 'view', text: '查看' },
    ]"
    @moreBtns="onMoreBtns"
    :handleRequest="handleRequest"
  ></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { PostUserList } from "@/api-mock";
import { FormField } from "@/components/BaseFormItem";
import { BtnName } from "@/components/BaseBtn";
import { handleBtnNext } from "@/utils";
const openPopup = inject<any>("openPopup");
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  { _example_prop: () => ({}) }
);
const fields: FormField[] = [
  { prop: "tx", label: "头像", type: "BaseUpload" },
  { prop: "dhhm", label: "电话号码", valid: "phone", required: true },
  {
    prop: "xm",
    label: "姓名",
    popover: "请注意输入真实姓名",
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
      pass: () => PostUserList().then(() => next()),
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
