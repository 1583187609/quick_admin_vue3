<!-- 配置JSON -->
<template>
  <BaseForm v-model="modelData" :fields="fields" :footer="false" @change="handelChange"></BaseForm>
</template>
<script lang="ts" setup>
import { reactive, computed } from "vue";
import { CommonObj } from "@/core/_types";
import { defaultFormItemsTpls, defaultTableColsTpls } from "./_config";
import { OptionItem } from "@/core/_types";
import { defaultBtns } from "@/core/components/BaseBtn";
import { BtnName } from "@/core/components/BaseBtn/_types";
import BaseOption from "@/core/components/BaseOption.vue";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { compTypeOptions, getSubOptions } from "../../FilePannel/_config";

const btnsOpts: OptionItem[] = [
  {
    label: "基础按钮",
    value: 1,
    children: Object.keys(defaultBtns).map((name: BtnName) => {
      const { text } = defaultBtns[name];
      return { label: text, value: name, slots: BaseOption };
    }),
  },
  { label: "扩展按钮", value: 2, children: [] },
];
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const modelData = reactive<CommonObj>({
  compType: 1,
  contType: 1,
  formItems: JSON.stringify(defaultFormItemsTpls[1].children),
  tableCols: JSON.stringify(defaultTableColsTpls[1].children),
});
const fields = computed<FormFieldAttrs[]>(() => {
  const { compType, contType } = modelData;
  const isForm = [1, 3].includes(compType);
  const isTable = [2, 3].includes(compType);
  const isList = compType === 3;
  const contTypeOpts = getSubOptions(compTypeOptions, compType);
  return [
    {
      prop: "compType",
      label: "组件类型",
      type: "radio-group",
      attrs: {
        options: compTypeOptions,
      },
    },
    {
      prop: "contType",
      label: "详细类型",
      type: "select",
      attrs: {
        options: contTypeOpts,
      },
    },
    isForm && {
      prop: "formItems",
      label: "表单项",
      required: !isList,
      rules: [{ validator: checkJsonValid, trigger: "blur" }],
      attrs: {
        type: "textarea",
        rows: 10,
      },
      quickAttrs: {
        example: `["gender"] 或 [{"prop":"gender","label":"性别"}]`,
      },
    },
    isTable && {
      prop: "tableCols",
      label: "表格列",
      required: true,
      rules: [{ validator: checkJsonValid, trigger: "blur" }],
      attrs: {
        type: "textarea",
        rows: 10,
      },
      quickAttrs: {
        example: `["enableStatus"] 或 [{"prop":"status","label":"启用状态",type:"BaseTag",attrs:{name:"EnableStatus"}}]`,
      },
    },
    ...(isList
      ? [
          {
            prop: "extraBtns",
            label: "额外按钮",
            type: "select",
            attrs: {
              multiple: true,
              options: btnsOpts,
            },
          },
          {
            prop: "operateBtns",
            label: "分组按钮",
            type: "select",
            attrs: {
              multiple: true,
              options: btnsOpts,
            },
          },
          {
            prop: "extraParams",
            label: "额外参数",
            attrs: {
              type: "textarea",
            },
          },
        ]
      : []),
  ];
});
function checkJsonValid(rule: any, value: any, callback: any) {
  try {
    // resolveStr(value);
    callback();
  } catch (err) {
    console.error(err);
    callback(new Error(`JSON格式有误：${err}`));
  }
}
function handelChange(val: any, prop: string) {
  if (prop === "compType") {
    modelData.contType = compTypeOptions.find(it => it.value === val)?.children[0].value;
  } else if (prop === "tpl") {
    //
  }
}
</script>
<style lang="scss" scoped></style>
