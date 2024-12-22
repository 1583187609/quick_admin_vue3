<!-- 设置面板 -->
<template>
  <SectionBox
    :title="modelData._label && modelData._prop ? `${modelData._label}（${modelData._prop}）` : '未选择'"
    class="set-pannel"
    bodyClass="p-h"
    emptyTips="请在左侧选择字段"
  >
    <template #right v-if="modelData.label && modelData.prop">
      {{ `${modelData.label}（${modelData.prop}）` }}
    </template>
    <SectionForm
      v-model="modelData"
      @change="handleChange"
      :sections="sections"
      :style="{ width }"
      grid="12"
      :footer="false"
      :submitBtn="type === 'add' ? '创建' : '修改'"
      @submit="handleSubmit"
      ref="formRef"
      v-if="props.fieldInfo"
    >
      <!-- <template #before>
      <EleDom />
    </template> -->
    </SectionForm>
  </SectionBox>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { FormFieldAttrs, SectionFormItemAttrs } from "@/core/components/form/_types";
import SectionBox from "../_components/SectionBox.vue";
import { CommonObj, OptionItem } from "@/core/_types";
import { exampleMap } from "../_config";
import { getWidgetAttrsFields } from "./_config";
import { defaultFormItemType, deleteAttrs } from "@/utils";
import BaseOption from "@/core/components/BaseOption.vue";
import CssUnit from "./_components/CssUnit.vue";
import EleDom from "./_components/EleDom.vue";
import _ from "lodash";
import { defaultFormItemTplsMap, getStandAttrsFromTpl } from "@/core/components/form/_components/FieldItem";

export type SetPannelType = "add" | "edit";

const { merge, snakeCase } = _;
const propPrefix = "_";
const switchYewNoAttrs = {
  activeValue: true,
  inactiveValue: false,
  activeText: "是",
  inactiveText: "否",
};
const validOpts: OptionItem[] = [
  { label: "电话号码", value: "phone", slots: BaseOption },
  { label: "身份证号", value: "identity", slots: BaseOption },
  { label: "密码", value: "password", slots: BaseOption },
  { label: "邮箱", value: "email", slots: BaseOption },
  { label: "年龄", value: "age", slots: BaseOption },
];
const widgetTypeOpts: OptionItem[] = [
  { label: "输入框", value: "input", slots: BaseOption },
  { label: "数字输入框", value: "input-number", slots: BaseOption },
  { label: "选择框", value: "select", slots: BaseOption },
  { label: "级联", value: "cascader", slots: BaseOption },
  { label: "多选框", value: "checkbox", slots: BaseOption },
  { label: "自定义", value: "custom", slots: BaseOption },
];
const props = withDefaults(
  defineProps<{
    fieldInfo?: FormFieldAttrs;
    width?: string;
    type?: SetPannelType;
  }>(),
  {
    type: "add",
  }
);
const $emit = defineEmits(["save"]);
const formRef = ref<any>(null);
const defaultValue = { type: defaultFormItemType, grid: 24, pureText: 0 };
const modelData = ref<CommonObj>({ ...defaultValue, ...props.fieldInfo });
const defaultValueWidgetAttrs = ref<FormFieldAttrs>({});
watch(
  () => props.fieldInfo,
  newVal => {
    if (!newVal) {
      modelData.value = getFieldWithPrefix(defaultValue);
      return;
    }
    const { tpl, ...restInfo } = newVal;
    if (!tpl) {
      modelData.value = getFieldWithPrefix({ ...defaultValue, ...props.fieldInfo });
      return;
    }
    const tplInfo = getStandAttrsFromTpl(tpl, defaultFormItemTplsMap.common);
    const originData = { ...defaultValue, ...tplInfo, ...restInfo };
    modelData.value = getFieldWithPrefix({ ...defaultValue, ...tplInfo, ...restInfo });
    const { type, attrs } = originData;
    defaultValueWidgetAttrs.value = { type, attrs };
  },
  {
    immediate: true,
  }
);
const sections = computed<SectionFormItemAttrs[]>(() => {
  if (!props.fieldInfo) return [];
  const { type } = modelData.value;
  const showOpts = ["select", "cascader", "checkbox-group"].includes(type);
  return [
    {
      title: "基础配置",
      fields: [
        {
          prop: `${propPrefix}tpl`,
          label: "模板类型",
          type: "select",
          attrs: {
            options: validOpts,
          },
          quickAttrs: {
            popover: "内置的几种常用规则类型，含表单校验规则、属性等",
          },
        },
        {
          prop: `${propPrefix}type`,
          label: "控件类型",
          type: "select",
          required: true,
          attrs: {
            options: widgetTypeOpts,
          },
          quickAttrs: {
            popover: "表单控件类型",
          },
        },
        {
          prop: `${propPrefix}defaultValue`,
          label: "默认值",
          type: defaultValueWidgetAttrs.value.type,
          attrs: defaultValueWidgetAttrs.value.attrs,
          quickAttrs: {
            popover: "默认值",
            grid: 24,
          },
        },
      ],
    },
    {
      title: "字段属性",
      fields: [
        {
          prop: `${propPrefix}prop`,
          label: "属性名",
          required: true,
          attrs: { maxlength: 10 },
          quickAttrs: {},
        },
        {
          prop: `${propPrefix}label`,
          label: "标签文本",
          required: true,
          attrs: {
            maxlength: 10,
          },
          quickAttrs: {},
        },
        {
          prop: `${propPrefix}required`,
          label: "是否必填",
          type: "switch",
          attrs: {
            ...switchYewNoAttrs,
          },
          quickAttrs: {},
        },
        {
          prop: `${propPrefix}labelWidth`,
          label: "标签宽度",
          attrs: {
            slots: {
              // append: [CssUnit],
            },
          },
          quickAttrs: {
            popover: "手动指定标签宽度",
            example: exampleMap.labelWidth,
          },
        },
        // {
        //   prop: `${propPrefix}children`,
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
      fields: [
        ...getWidgetAttrsFields(type),
        // showOpts && {
        //   prop: `${propPrefix}options`,
        //   label: "下拉项",
        //   attrs: {
        //     type: "textarea",
        //     readonly: true,
        //     onClick: () => openConfigPopup("options"),
        //   },
        //   example: exampleMap.options,
        // },
        // {
        //   prop: `${propPrefix}example`,
        //   label: "示例文案",
        //   quickAttrs: {
        //     popover: "placeholder中的文字，会直接拼在placeholder文字后面",
        //   },
        // },
      ],
    },
    {
      title: "快捷属性",
      fields: [
        {
          prop: `${propPrefix}popover`,
          label: "气泡文案",
          quickAttrs: {
            popover: "鼠标放到标签文字右侧问号图标上时，出现的提示性文字",
          },
        },
        {
          prop: `${propPrefix}tips`,
          label: "提示文案",
          quickAttrs: {
            popover: "控件下方的提示性文字",
          },
        },
        {
          prop: `${propPrefix}grid`,
          label: "列宽占位",
          type: "input-number",
          attrs: {
            style: "width:100%",
            min: 1,
            max: 24,
          },
          quickAttrs: {
            popover: "每个表单项占位宽度，最小为1，最大,为24",
          },
        },
        {
          prop: `${propPrefix}pureText`,
          label: "是否纯文本",
          type: "switch",
          attrs: {
            ...switchYewNoAttrs,
          },
          quickAttrs: {
            popover: "展示时，将不会看到输入框等边框，而是以纯文本展示",
          },
        },
        {
          prop: `${propPrefix}before`,
          label: "前置元素",
          attrs: {},
          quickAttrs: {
            popover: "每个表单项前面的元素，可以是文本或自定义组件",
          },
        },
        {
          prop: `${propPrefix}after`,
          label: "后置元素",
          attrs: {},
          quickAttrs: {
            popover: "每个表单项后面的元素，可以是文本或自定义组件",
          },
        },
      ],
    },
  ];
});
function getFieldWithPrefix(info?: FormFieldAttrs) {
  if (!info) return;
  const data: CommonObj = {};
  for (const key in info) {
    data[`${propPrefix}${key}`] = info[key];
  }
  return data;
}
function getFieldWithoutPrefix(info?: FormFieldAttrs) {
  if (!info) throw new Error(`请传入参数：${info}`);
  const data: CommonObj = {};
  for (const key in info) {
    const prop = key.slice(1);
    if (prop === "tpl") continue;
    data[prop] = info[key];
  }
  return data;
}
function handleChange(val: string | number, prop: string, args: CommonObj) {
  const standProp = prop.slice(1); // 标准prop属性名称

  const noRender = ["tpl"].some(it => it === standProp);
  if (noRender) {
    if (standProp === "tpl") {
      console.log("dddddfsjdf--------");
    }
    return;
  }
  handleSubmit(modelData.value);
}
function handleSubmit(params: CommonObj) {
  $emit("save", getFieldWithoutPrefix(params), props.type);
}
defineExpose({
  reset() {
    formRef.value?.reset();
  },
});
</script>
<style lang="scss" scoped></style>
