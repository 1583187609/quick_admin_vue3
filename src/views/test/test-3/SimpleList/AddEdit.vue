<!--新增编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :afterSuccess="refreshList"
    :extraParams="{ id: data?.id }"
    @change="(prop:string,val:any)=>modelData[prop] = val"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/core/components/form/_types";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/core/_types";

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
const defData: CommonObj = { cflx: 1, sfqy: 0 }; //默认值
const modelData = reactive<CommonObj>(Object.assign(defData, props.data));
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
      attrs: {
        options: "D_Gender",
      },
    },
    { prop: "nl", label: "年龄", tpl: "T_Age" },
    { prop: "dhhm", label: "电话号码", tpl: "T_Phone" },
    {
      prop: "sfqy",
      label: "是否启用",
      type: "switch",
      quickAttrs: {
        popover: "这是popover示例",
      },
    },
    {
      prop: "cflx",
      label: "处罚类型",
      type: "radio-group",
      attrs: {
        options: cflxOpts,
      },
    },
    modelData.cflx === 1 && {
      prop: "jgnr",
      label: "警告内容",
      tips: "这是tips示例",
      attrs: {
        type: "textarea",
        maxlength: 100,
      },
    },
    ...(modelData.cflx === 2
      ? [
          {
            prop: "ts",
            label: "天数",
            type: "input-number",
            attrs: { min: 0 },
            quickAttrs: {
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
    modelData.cflx === 3 && {
      prop: "fjgz",
      label: "封禁告知",
      tips: "这是tips示例",
      attrs: {
        type: "textarea",
        maxlength: 100,
      },
    },
  ];
});
</script>
<style lang="scss" scoped></style>
