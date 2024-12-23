<!-- 通过json生成 -->
<template>
  <div class="f-sb-s">
    <div class="f-0 mr-t" style="width: 420px">
      <BaseForm
        v-model="modelData"
        :fields="fields"
        submitBtn="生成"
        :moreBtns="['download']"
        @change="handleChange"
        @submit="handleSubmit"
        :afterReset="handleSubmit"
        @moreBtns="onMoreBtns"
      />
    </div>
    <BaseCrud
      class="f-1"
      :fields="createData.fields"
      :cols="createData.columns"
      :extraBtns="createData.extraBtns"
      :operateBtns="createData.operateBtns"
      :fetch="GetMockCommon"
      v-if="modelData.type === 0"
    />
    <BaseForm class="f-1" :fields="createData.fields" :fetch="PostMockCommon" v-else-if="modelData.type === 1" />
    <BaseTable class="f-1" :cols="createData.columns" v-else-if="modelData.type === 6" />
  </div>
</template>
<script lang="ts" setup>
import { GetMockCommon, PostMockCommon } from "@/api-mock";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { showMessage, typeOf } from "@/utils";
import DownloadSet from "./DownloadSet.vue";
import { usePopup } from "@/hooks";
import { CommonObj, OptionItem } from "@/core/_types";
import BaseOption from "@/core/components/BaseOption.vue";
import { reactive } from "vue";
import { compTypeOptions } from "../form-new/FilePannel/_config";
import { btnsMap } from "@/core/components/BaseBtn";
import { defaultFormItemsTpls, defaultTableColsTpls } from "./_config";

const btnsOpts: OptionItem[] = [
  {
    label: "基础按钮",
    value: 1,
    children: Object.keys(btnsMap).map((name: BtnName) => {
      const { text } = btnsMap[name];
      return { label: text, value: name, slots: BaseOption };
    }),
  },
  { label: "扩展按钮", value: 2, children: [] },
];
const { openPopup, closePopup } = usePopup();
const modelData = reactive<CommonObj>({
  type: 1,
  formItems: defaultFormItemsTpls[1],
  tableCols: defaultTableColsTpls[1],
});
const createData = reactive<CommonObj>({});
const fields: FormFieldAttrs[] = computed(() => {
  const { type } = modelData;
  const isForm = [0, 1].includes(type);
  const isTable = [0, 6].includes(type);
  const isList = type === 0;
  return [
    {
      prop: "type",
      label: "类型",
      type: "radio-group",
      attrs: {
        options: compTypeOptions,
      },
    },
    isForm && {
      prop: "formItems",
      label: "表单项",
      required: true,
      rules: [{ validator: checkJsonValid, trigger: "blur" }],
      attrs: {
        type: "textarea",
        rows: 5,
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
        rows: 5,
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
        ]
      : []),
  ];
});
/**
 * 解析字符串
 * @param str 要处理的字符串
 * @notice 因为采用JSON.parse解析，对字符串的要求很高，[{"prop":"xm"}]能解析，但[{prop:"xm"}]不能解析，所以采用eval来处理
 */
function resolveStr(str: string = "") {
  const data = eval(str);
  return data.map(it => {
    const t = typeOf(it);
    if (t === "String") throw new Error(`暂未处理此类型：${t}`);
    if (t === "Object") return it;
    throw new Error(`暂未处理此类型：${t}`);
  });
}
function checkJsonValid(rule: any, value: any, callback: any) {
  try {
    resolveStr(value);
    callback();
  } catch (err) {
    console.error(err);
    callback(new Error(`JSON格式有误：${err}`));
  }
}

function handleChange() {
  handleSubmit();
}

// 处理提交
function handleSubmit() {
  const { formItems, tableCols, extraBtns, operateBtns } = modelData;
  createData.fields = resolveStr(formItems);
  createData.columns = resolveStr(tableCols);
  createData.extraBtns = extraBtns;
  createData.operateBtns = operateBtns;
}

// 点击更多按钮时候的逻辑处理
function onMoreBtns(name: BtnName) {
  const btnMap = {
    download: handleDownload,
  };
  btnMap[name]?.();
}

// 下载代码
function handleDownload() {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) return showMessage("浏览器端不支持下载，请在Node环境中进行操作", "warning");
  openPopup("下载设置", [
    DownloadSet,
    {
      onConfirm() {
        const downloadMap = {
          0: () => {},
          1: () => {},
          2: () => {},
        };
        downloadMap[modelData.type]?.();
        showMessage("已下载");
        closePopup();
      },
    },
  ]);
}
</script>
<style lang="scss" scoped></style>
