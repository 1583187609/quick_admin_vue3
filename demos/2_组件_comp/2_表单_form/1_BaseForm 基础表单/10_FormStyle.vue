<!-- summary 表单样式
styleType
pureText
-->
<template>
  <div class="f-sb-fs-w" style="width: 100%">
    <BaseForm class="f-1" v-model="modelData1" :fields="fields" :fetch="PostMockCommon" />
    <BaseForm class="f-2" :grid="12" v-model="modelData2" :fields="fields" :fetch="PostMockCommon" styleType="cell" />
    <BaseForm class="f-1" v-model="modelData3" :fields="fields" :fetch="PostMockCommon" pureText />
  </div>
</template>
<script lang="ts" setup>
import { PostMockCommon } from "@/api-mock";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { reactive } from "vue";

const modelData1 = reactive({
  name: "张三",
  gender: 1,
  age: 18,
  is_private: 0,
  height: 178,
});
const modelData2 = reactive({
  name: "张三",
  gender: 1,
  age: 18,
  is_private: 0,
  height: 178,
});
const modelData3 = reactive({
  name: "张三",
  gender: 1,
  age: 18,
  is_private: 0,
  height: 178,
});
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true },
  { prop: "gender", label: "性别", type: "select", attrs: { options: "D_Gender" } },
  { prop: "age", label: "年龄", type: "input-number", attrs: { min: 0, max: 150 } },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 0, max: 250 } },
  { prop: "is_private", label: "是否保密", type: "switch", attrs: { activeText: "是", inactiveText: "否" } },
];
</script>
<style lang="scss" scoped>
.base-form {
  flex-basis: 1px;
  &:not(:last-child) {
    margin-right: $gap-two;
  }
}
</style>
