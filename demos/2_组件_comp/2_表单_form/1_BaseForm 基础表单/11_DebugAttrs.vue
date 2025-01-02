<!-- summary 调试属性
  log为true，会打印请求信息，为字符串时，会作为标头文本。
  debug为true会在发起提交请求前打断点
-->
<template>
  <div class="f-sb-fs-w" style="width: 100%">
    <BaseForm v-model="modelData" :fields="fields" @submit="PostMockCommon" :debug="false" :log="false" />
    <BaseForm v-model="modelData" :fields="fields" @submit="PostMockCommon" debug log />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { PostMockCommon } from "@/api-mock";
import { CommonObj, OptionItem } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";

const modelData = reactive<CommonObj>({
  name: "李四",
  age: 12,
});
const regionOpts = ref<OptionItem[]>([]);
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", quickAttrs: { grid: 12 } },
  { prop: "age", label: "年龄", type: "input-number", attrs: { min: 0, max: 150 }, quickAttrs: { grid: 12 } },
];
</script>
<style lang="scss" scoped>
.base-form {
  flex-grow: 0;
  flex-basis: calc(50% - 32px);
}
</style>
