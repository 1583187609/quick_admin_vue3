<!--新增编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="model"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :onSuccess="refreshList"
    :extraParams="{ id: data?.id }"
    @change="(prop:string,val:any)=>model[prop] = val"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/form/_types";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/vite-env";

const cflxOpts: OptionItem[] = [
  { label: "警告", value: 1 },
  { label: "禁言", value: 2 },
  { label: "封禁", value: 3 },
];
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const model = reactive<CommonObj>(Object.assign({ cflx: 1, sfqy: 0 }, props.data));
const fields = computed<FormField[]>(() => {
  return [
    {
      prop: "xm",
      label: "姓名",
      required: true,
      attrs: { maxlength: 6 },
    },
    {
      prop: "xb",
      label: "性别",
      required: true,
      type: "select",
      options: "Gender",
      extraAttrs: {
        grid: 12,
      },
    },
    {
      prop: "nl",
      label: "年龄",
      type: "input-number",
      extraAttrs: {
        grid: 12,
        validType: "age",
      },
    },
    {
      prop: "dhhm",
      label: "电话号码",
      extraAttrs: {
        validType: "phone",
      },
    },
    {
      prop: "sfqy",
      label: "是否启用",
      type: "switch",
      extraAttrs: {
        popover: "这是popover示例",
      },
    },
    { prop: "cflx", label: "处罚类型", type: "radio-group", options: cflxOpts },
    model.cflx === 1 && {
      prop: "jgnr",
      label: "警告内容",
      attrs: {
        type: "textarea",
        maxlength: 100,
      },
      extraAttrs: {
        tips: "这是tips示例",
      },
    },
    ...(model.cflx === 2
      ? [
          {
            prop: "ts",
            label: "天数",
            type: "input-number",
            attrs: { min: 0 },
            extraAttrs: {
              after: "天",
            },
          },
          {
            prop: "jygz",
            label: "禁言告知",
            attrs: {
              type: "textarea",
              maxlength: 100,
            },
          },
        ]
      : []),
    model.cflx === 3 && {
      prop: "fjgz",
      label: "封禁告知",
      attrs: {
        type: "textarea",
        maxlength: 100,
      },
      extraAttrs: {
        tips: "这是tips示例",
      },
    },
  ];
});
</script>
<style lang="scss" scoped></style>
