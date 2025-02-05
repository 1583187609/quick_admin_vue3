<!-- 表单项新增/编辑 -->
<template>
  <SectionForm
    style="width: 1000px"
    v-model="modelData"
    :sections="sections"
    :fetch="data ? PatchMockCommon : PostMockCommon"
    :afterSuccess="() => refreshList?.()"
    :extraParams="data ? { id: data.id } : undefined"
    :grid="12"
  >
  </SectionForm>
</template>
<script lang="ts" setup>
import { FormField, FormFieldAttrs, SectionFormItem } from "@/core/components/form/_types";
import { PostMockCommon, PatchMockCommon } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
import SectionForm from "@/core/components/form/SectionForm.vue";
const yesNoSwitchAttrs = {
  activeText: "是",
  inactiveText: "否",
};
const validRulesChildren: FormFieldAttrs[] = [
  {
    prop: "type",
    label: "类型",
    labelWidth: "0",
    type: "select",
    attrs: {
      options: [
        { label: "必填", value: 1 },
        { label: "最小值", value: 2 },
        { label: "最大值", value: 3 },
      ],
    },
  },
  { prop: "message", labelWidth: "0", label: "提示文案" },
];
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>({ status: 1, ...props.data });
const sections = computed<SectionFormItem[]>(() => {
  return [
    {
      title: "模板信息",
      popover: "通过选取模板，可以快速填写下列信息",
      fields: [
        {
          prop: "tpl",
          label: "模板类型",
          type: "select",
          attrs: {
            filterable: true,
          },
          quickAttrs: {
            grid: 6,
          },
        },
        // {
        //   prop: "classify",
        //   label: "所属分类",
        //   required: true,
        //   type: "select",
        //   attrs: {
        //     filterable: true,
        //   },
        // },
        {
          prop: "status",
          label: "启用状态",
          type: "switch",
          quickAttrs: {
            grid: 4,
          },
        },
        {
          prop: "remark",
          label: "备注",
          required: true,
          attrs: {
            maxlength: 50,
          },
          quickAttrs: {
            grid: 14,
          },
        },
      ],
    },
    {
      title: "容器信息",
      popover: "会绑定在表单项容器上的属性，例：在ElementPlus中，是el-form-item",
      fields: [
        {
          prop: "prop",
          label: "属性名称",
          required: true,
        },
        {
          prop: "required",
          label: "是否必填",
          type: "switch",
          attrs: yesNoSwitchAttrs,
        },
        {
          prop: "rules",
          label: "校验规则",
          type: "BaseAddDelList",
          attrs: {
            fields: validRulesChildren,
          },
          quickAttrs: {
            grid: 24,
          },
        },
        {
          prop: "slot",
          label: "插槽",
        },
      ],
    },
    {
      title: "基础属性",
      popover: "会绑定在表单控件上的属性",
      grid: 8,
      fields: [
        {
          prop: "type",
          label: "类型",
          type: "select",
          required: true,
          attrs: {
            filterable: true,
          },
        },
        { prop: "lengths", label: "长度", type: "BaseNumberRange", attrs: { min: 0, max: 10 } },
        { prop: "values", label: "值范围", type: "BaseNumberRange", attrs: { min: 0, max: 100 } },
        { prop: "other_attrs", label: "其他属性", attrs: { type: "textarea" } },
      ],
    },
    {
      title: "快捷属性",
      // grid: 8,
      popover: "基于Quick Admin实现的快捷属性",
      fields: [
        {
          prop: "grid",
          label: "栅格",
          type: "input-number",
          attrs: {
            min: 0,
            max: 24,
          },
          quickAttrs: {
            popover: "每一列所占的宽度，取值范围为0~24",
          },
        },
        { prop: "tips", label: "提示文字", quickAttrs: { popover: "在表单项下方的注意事项提示信息" } },
        {
          prop: "example",
          label: "示例文字",
          quickAttrs: { popover: "会拼接在placeholder后面，作为填写示例文案", example: "这是拼接在后面的示例文案" },
        },
        {
          prop: "popover",
          label: "气泡文案",
          attrs: yesNoSwitchAttrs,
          quickAttrs: {
            popover: "鼠标放在问号上时，出现的文案提示",
          },
        },
        {
          prop: "disabled",
          label: "是否禁用",
          attrs: yesNoSwitchAttrs,
          quickAttrs: {
            popover: "启用后，该表单项将被禁用",
          },
        },
        {
          prop: "pureText",
          label: "是否纯文本",
          attrs: yesNoSwitchAttrs,
          quickAttrs: {
            popover: "该表单项将以纯文本样式展现",
          },
        },
        { prop: "other_attrs", label: "其他属性", attrs: { type: "textarea" } },
      ],
    },
  ];
});
</script>
<style lang="scss" scoped></style>
