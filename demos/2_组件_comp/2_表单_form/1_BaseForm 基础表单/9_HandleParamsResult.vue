<!-- summary 处理请求参数
omits
afterSuccess
afterFail
afterReset
extraParams（额外参数）
单双prop
一次性统一处理
-->
<template>
  <div class="f-sb-fs-w" style="width: 100%">
    <BaseForm :fields="fields" :fetch="PostMockCommon" :extraParams="extraParams" />
    <BaseForm :fields="fields" :fetch="handleFetch" />
  </div>
</template>
<script lang="ts" setup>
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";

const extraParams = { id: 1 };
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true },
  { prop: "gender", label: "性别", type: "select", attrs: { options: "D_Gender" } },
  { prop: "age", label: "年龄", type: "input-number", attrs: { min: 0, max: 150 } },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 0, max: 250 } },
  { prop: "is_private", label: "是否保密", type: "switch", attrs: { activeText: "是", inactiveText: "否" } },
];
// 一次性统一处理
function handleFetch(args: CommonObj) {
  args.id = 1;
  return PostMockCommon(args).then((res: CommonObj) => {
    res.type = "随便增加的属性";
    return res;
  });
}
</script>
<style lang="scss" scoped>
.base-form {
  flex-grow: 0;
  flex-basis: calc(33% - $gap-two);
}
</style>
