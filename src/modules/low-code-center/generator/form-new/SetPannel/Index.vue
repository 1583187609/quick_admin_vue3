<!-- 设置面板 -->
<template>
  <!-- <SectionBox title="设置面板" class="set-pannel"> -->
  <SectionForm v-model="modelData" :sections="sections" :style="{ width }" @submit="handleSubmit"></SectionForm>
  <!-- </SectionBox> -->
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { SectionFormItemAttrs } from "@/core/components/form/_types";
// import SectionBox from "./_components/SectionBox.vue";
import { CommonObj, OptionItem } from "@/core/_types";
import { exampleMap } from "../_config";
import { getWidgetAttrsFields } from "./_config";
import { usePopup } from "@/hooks";
// import Config from "./_components/Config.vue";

const { openPopup, closePopup } = usePopup();

const yesNoOpts: OptionItem[] = [
  { label: "是", value: true },
  { label: "否", value: false },
];
const validOpts: OptionItem[] = [
  { label: "电话号码", value: "phone" },
  { label: "身份证号", value: "identity" },
  { label: "密码", value: "password" },
  { label: "邮箱", value: "email" },
  { label: "年龄", value: "age" },
];
const widgetTypeOpts: OptionItem[] = [
  { label: "输入框", value: "input" },
  { label: "数字输入框", value: "input-number" },
  { label: "选择框", value: "select" },
  { label: "级联", value: "cascader" },
  { label: "多选框", value: "checkbox" },
  { label: "自定义", value: "custom" },
];
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    width?: string;
  }>(),
  {}
);
const $emit = defineEmits(["confirm"]);
const modelData = reactive<CommonObj>({ ...props.data });
const sections = computed<SectionFormItemAttrs[]>(() => {
  const { type } = modelData;
  const showOpts = ["select", "cascader", "checkbox-group"].includes(type);
  return [
    {
      title: "基础配置",
      fields: [
        {
          prop: "tpl",
          label: "模板类型",
          type: "select",
          attrs: {
            options: validOpts,
          },
          quickAttrs: {
            grid: 6,
            popover: "内置的几种常用规则类型，含表单校验规则、属性等",
          },
        },
        {
          prop: "type",
          label: "控件类型",
          type: "select",
          attrs: {
            options: widgetTypeOpts,
          },
          quickAttrs: {
            grid: 6,
            popover: "表单控件类型",
          },
        },
        {
          prop: "label",
          label: "标签名",
          required: false,
          quickAttrs: {
            grid: 6,
          },
        },
        {
          prop: "prop",
          label: "属性名",
          required: false,
          quickAttrs: {
            grid: 6,
          },
        },
        {
          prop: "defaultValue",
          label: "默认值",
          quickAttrs: {
            grid: 6,
            popover: "默认值",
          },
        },
      ],
    },
    {
      title: "字段属性",
      fields: [
        {
          prop: "required",
          label: "是否必填",
          type: "select",
          attrs: {
            options: yesNoOpts,
          },
          quickAttrs: {
            grid: 6,
          },
        },
        {
          prop: "popover",
          label: "气泡文案",
          quickAttrs: {
            grid: 12,
            popover: "鼠标放到标签文字右侧问号图标上时，出现的提示性文字",
          },
        },
        {
          prop: "span",
          label: "列宽占位",
          type: "input-number",
          attrs: {
            style: "width:100%;",
            min: 1,
            max: 24,
          },
          quickAttrs: {
            grid: 6,
            popover: "每个表单项占位宽度，最小为1，最大,为24",
          },
        },
        {
          prop: "labelWidth",
          label: "标签宽度",
          quickAttrs: {
            grid: 6,
            popover: "手动指定标签宽度",
            example: exampleMap.labelWidth,
          },
        },
        // {
        //   prop: "children",
        //   label: "自定义控件", // 子级元素
        //   attrs: {
        //     type: "textarea",
        //     readonly: true,
        //     onClick: () => openConfigPopup("children"),
        //   },
        //   quickAttrs: {
        //     popover: "表单项后面的子元素",
        //   },
        // },
      ],
    },
    {
      title: "控件属性",
      fields: getWidgetAttrsFields(type),
      // fields: [
      //   showOpts && {
      //     prop: "options",
      //     label: "下拉项",
      //     attrs: {
      //       type: "textarea",
      //       readonly: true,
      //       onClick: () => openConfigPopup("options"),
      //     },
      //     example: exampleMap.options,
      //   },
      //   {
      //     prop: "example",
      //     label: "示例文案",
      //     quickAttrs: {
      //       grid: 6,
      //       popover: "placeholder中的文字，会直接拼在placeholder文字后面",
      //     },
      //   },
      //   {
      //     prop: "pureText",
      //     label: "是否纯文本",
      //     type: "radio-group",
      //     attrs: {
      //       options: yesNoOpts,
      //     },
      //     quickAttrs: {
      //       grid: 6,
      //       popover: "展示时，将不会看到输入框等边框，而是以纯文本展示",
      //     },
      //   },
      // ],
    },
    {
      title: "其他杂项",
      fields: [
        {
          prop: "tips",
          label: "提示文案",
          quickAttrs: {
            grid: 12,
            popover: "控件下方的提示性文字",
          },
        },
        {
          prop: "before",
          label: "前置元素",
          attrs: {
            type: "textarea",
            readonly: true,
            rows: 1,
            onClick: () => openConfigPopup("before"),
          },
          quickAttrs: {
            grid: 12,
            popover: "每个表单项前面的元素，可以是文本或自定义组件",
          },
        },
        {
          prop: "after",
          label: "后置元素",
          attrs: {
            type: "textarea",
            readonly: true,
            rows: 1,
            onClick: () => openConfigPopup("after"),
          },
          quickAttrs: {
            grid: 12,
            popover: "每个表单项后面的元素，可以是文本或自定义组件",
          },
        },
      ],
    },
  ];
});
// 打开配置弹窗
function openConfigPopup(type: string = "") {
  // const label = getFields().find(it => it.prop === type)?.label ?? "";
  const label = "label";
  // openPopup(`编辑${label}(${type})`, [Config, { type }]);
}
function handleSubmit(data: CommonObj) {
  closePopup();
  $emit("confirm", data);
}
</script>
<style lang="scss" scoped></style>
