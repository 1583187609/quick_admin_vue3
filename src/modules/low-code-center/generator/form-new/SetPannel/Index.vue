<!-- 设置面板 -->
<template>
  <SectionBox title="配置" class="set-pannel">
    <template #right v-if="modelData.label && modelData.prop">
      {{ `${modelData.label}（${modelData.prop}）` }}
    </template>
    <SectionForm
      v-model="modelData"
      :sections="sections"
      :style="{ width }"
      :submitText="type === 'add' ? '创建' : '修改'"
      @submit="handleSubmit"
      ref="formRef"
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
import { SectionFormItemAttrs } from "@/core/components/form/_types";
import SectionBox from "../_components/SectionBox.vue";
import { CommonObj, OptionItem } from "@/core/_types";
import { exampleMap } from "../_config";
import { getWidgetAttrsFields } from "./_config";
import { usePopup } from "@/hooks";
import { defaultFormItemType } from "@/utils";
import BaseOption from "@/core/components/BaseOption.vue";
import CssUnit from "./_components/CssUnit.vue";
import EleDom from "./_components/EleDom.vue";
import _ from "lodash";

export type SetPannelType = "add" | "edit";

const { merge } = _;
const { openPopup, closePopup } = usePopup();

const switchYewNoAttrs = {
  activeText: "是",
  inactiveText: "否",
};
// const yesNoOpts: OptionItem[] = [
//   { label: "是", value: 1 },
//   { label: "否", value: 0 },
// ];
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
    data?: CommonObj;
    width?: string;
    type?: SetPannelType;
  }>(),
  {
    type: "add",
  }
);
const $emit = defineEmits(["save"]);
watch(
  () => props.data,
  newVal => {
    if (!newVal) return;
    merge(modelData, props.data);
  }
);
const formRef = ref<any>(null);
const defaultValue = { type: defaultFormItemType, grid: 24, pureText: 0 };
const modelData = reactive<CommonObj>({ ...defaultValue, ...props.data });
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
            popover: "内置的几种常用规则类型，含表单校验规则、属性等",
          },
        },
        {
          prop: "prop",
          label: "属性名",
          required: true,
          attrs: { maxlength: 10 },
          quickAttrs: {
            grid: 12,
          },
        },
        {
          prop: "label",
          label: "标签文本",
          required: true,
          attrs: {
            maxlength: 10,
          },
          quickAttrs: {
            grid: 12,
          },
        },
        {
          prop: "type",
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
          prop: "defaultValue",
          label: "默认值",
          quickAttrs: {
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
          type: "switch",
          attrs: {
            ...switchYewNoAttrs,
          },
          quickAttrs: {},
        },
        {
          prop: "grid",
          label: "列宽占位",
          type: "input-number",
          attrs: {
            style: "width:100%",
            min: 1,
            max: 24,
          },
          quickAttrs: {
            grid: 12,
            popover: "每个表单项占位宽度，最小为1，最大,为24",
          },
        },
        {
          prop: "labelWidth",
          label: "标签宽度",
          attrs: {
            slots: {
              // append: [CssUnit],
            },
          },
          quickAttrs: {
            grid: 12,
            popover: "手动指定标签宽度",
            example: exampleMap.labelWidth,
          },
        },
        {
          prop: "popover",
          label: "气泡文案",
          quickAttrs: {
            popover: "鼠标放到标签文字右侧问号图标上时，出现的提示性文字",
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
      fields: [
        ...getWidgetAttrsFields(type),
        // showOpts && {
        //   prop: "options",
        //   label: "下拉项",
        //   attrs: {
        //     type: "textarea",
        //     readonly: true,
        //     onClick: () => openConfigPopup("options"),
        //   },
        //   example: exampleMap.options,
        // },
        // {
        //   prop: "example",
        //   label: "示例文案",
        //   quickAttrs: {
        //     popover: "placeholder中的文字，会直接拼在placeholder文字后面",
        //   },
        // },
        {
          prop: "pureText",
          label: "是否纯文本",
          type: "switch",
          attrs: {
            ...switchYewNoAttrs,
          },
          quickAttrs: {
            popover: "展示时，将不会看到输入框等边框，而是以纯文本展示",
          },
        },
      ],
    },
    {
      title: "其他杂项",
      fields: [
        {
          prop: "tips",
          label: "提示文案",
          quickAttrs: {
            popover: "控件下方的提示性文字",
          },
        },
        {
          prop: "before",
          label: "前置元素",
          attrs: {},
          quickAttrs: {
            popover: "每个表单项前面的元素，可以是文本或自定义组件",
            grid: 12,
          },
        },
        {
          prop: "after",
          label: "后置元素",
          attrs: {},
          quickAttrs: {
            popover: "每个表单项后面的元素，可以是文本或自定义组件",
            grid: 12,
          },
        },
      ],
    },
  ];
});
function handleSubmit(data: CommonObj) {
  $emit("save", data, props.type);
}
defineExpose({
  reset() {
    formRef.value.reset();
  },
});
</script>
<style lang="scss" scoped></style>
