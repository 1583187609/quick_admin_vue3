<!-- 新增编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="model"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :fetchSuccess="refreshList"
    :extraParams="{ id: data?.id }"
    @change="(prop:string,val:any)=>model[prop] = val"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/vite-env";
import { useDictMap } from "@/hooks";
const { getOpts, getText } = useDictMap();
const genderOpts = getOpts("Gender");
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
const model = reactive<CommonObj>(Object.assign(defData, props.data));
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
      options: genderOpts,
    },
    { prop: "nl", label: "年龄", valid: "age" },
    { prop: "dhhm", label: "电话号码", valid: "phone" },
    {
      prop: "sfqy",
      label: "是否启用",
      type: "switch",
      extra: {
        popover: "这是popover示例",
      },
    },
    { prop: "cflx", label: "处罚类型", type: "radio-group", options: cflxOpts },
    model.cflx === 1 && {
      prop: "jgnr",
      label: "警告内容",
      tips: "这是tips示例",
      attrs: {
        type: "textarea",
        maxlength: 100,
      },
    },
    ...(model.cflx === 2
      ? [
          {
            prop: "ts",
            label: "天数",
            type: "input-number",
            attrs: { min: 0 },
            extra: {
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
