<!-- 页面-简介 -->
<template>
  <BaseCrud
    style="max-width: 1400px"
    :fetch="GetMockCommon"
    :fields="fields"
    :cols="cols"
    :extraBtns="[
      {
        name: 'open',
        text: '打开弹窗',
        attrs: { type: 'primary', icon: 'Notification' },
      },
    ]"
    @extraBtns="onExtraBtns"
    :grid="{ xs: 12, sm: 12, md: 8, lg: 4, xl: 3 }"
    size="small"
  ></BaseCrud>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CommonObj, FinallyNext } from "@/core/_types";
import { FormField } from "@/core/components/form/_types";
import { GetMockCommon } from "@/api-mock";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { handleBtnNext } from "@/utils";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const fields = reactive<FormField[]>([
  { prop: "xm", label: "姓名" },
  { prop: "jg", label: "籍贯", type: "cascader" },
  { prop: "nl", label: "年龄", type: "BaseNumberRange" },
  { prop: "zt", label: "账号状态", type: "select" },
  { prop: "zcsj", label: "注册时间", type: "date-picker" },
]);
const cols = [
  { type: "UserInfo", label: "举报人" },
  {
    type: "UserInfo",
    label: "被举报人",
    quickAttrs: { explain: "这里使用simple属性，所以显示信息少了" },
    attrs: { simple: true },
  },
  { prop: "xm", label: "姓名" },
  { prop: "status", label: "账号状态", type: "BaseTag" },
  { prop: "cjsj", label: "创建时间" },
  { prop: "xgsj", label: "修改时间" },
];
function onExtraBtns(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      open: () => openPopup("纯文本弹窗", "Hello！这是一个纯文本内容的弹窗示例"),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
