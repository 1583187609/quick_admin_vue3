<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PatchMockCommon : PostMockCommon"
    :afterSuccess="() => refreshList?.()"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostMockCommon, PatchMockCommon } from "@/api-mock";
import { CommonObj, FinallyNext } from "@/core/_types";
import { cssVars } from "@/utils";

const authTreeData = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
];
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
    btnTypeOpts?: OptionItem[];
  }>(),
  {}
);
const modelData = reactive<CommonObj>(Object.assign({ color: cssVars.colorPrimary }, props.data));
const fields: FormField[] = [
  {
    prop: "name",
    label: "按钮名称",
    required: true,
    attrs: { maxlength: 10 },
    quickAttrs: { grid: 12 },
  },
  {
    prop: "text",
    label: "按钮文字",
    required: true,
    attrs: { maxlength: 4 },
    quickAttrs: { grid: 12 },
  },
  {
    prop: "color",
    label: "按钮颜色",
    required: true,
    type: "color-picker",
    quickAttrs: { grid: 12 },
  },
  {
    prop: "icon",
    label: "图标",
    required: true,
    type: "select",
    quickAttrs: { grid: 12 },
  },
  {
    tpl: "T_YesNoStatus",
    label: "是否提示确认",
    quickAttrs: { grid: 12 },
  },
  {
    prop: "order",
    label: "排序",
    type: "input-number",
    quickAttrs: { grid: 12 },
  },
  {
    prop: "auth",
    label: "权限",
    type: "tree",
    attrs: {
      data: authTreeData,
    },
  },
  {
    prop: "to",
    label: "路径跳转",
  },
  {
    tpl: "T_Remark",
  },
];
</script>
<style lang="scss" scoped></style>
