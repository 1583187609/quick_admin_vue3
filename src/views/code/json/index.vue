<!-- 通过json生成 -->
<template>
  <div class="f-sb-s">
    <div class="f-0 mr-t" style="width: 420px">
      <BaseForm
        v-model="modelData"
        :fields="fields"
        submitText="生成"
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
      :fetch="GetMockCommonList"
      v-if="modelData.type === 0"
    />
    <BaseForm class="f-1" :fields="createData.fields" :fetch="PostMockCommon" v-else-if="modelData.type === 1" />
    <BaseTable class="f-1" :cols="createData.columns" v-else-if="modelData.type === 6" />
  </div>
</template>
<script lang="ts" setup>
import { GetMockCommonList, PostMockCommon } from "@/api-mock";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { showMessage, typeOf } from "@/utils";
import DownloadSet from "./DownloadSet.vue";
import { usePopup } from "@/hooks";
import { CommonObj, OptionItem } from "@/core/_types";
import BaseOption from "@/core/components/BaseOption.vue";
import { reactive } from "vue";

const btnsOpts: OptionItem[] = [
  { label: "新增", value: "add", slots: [BaseOption, { left: "新增", right: "add" }] },
  { label: "删除", value: "delete", slots: [BaseOption, { left: "删除", right: "delete" }] },
  { label: "编辑", value: "edit", slots: [BaseOption, { left: "编辑", right: "edit" }] },
];
const { openPopup, closePopup } = usePopup();
const modelData = reactive<CommonObj>({
  type: 1,
  formItems: '[{"prop":"xm","label":"姓名"}]',
  tableCols: '[{"prop":"xm","label":"姓名"}]',
});
const createData = reactive<CommonObj>({});
const fields: FormFieldAttrs[] = computed(() => {
  const { type } = modelData;
  return [
    {
      prop: "type",
      label: "类型",
      type: "radio-group",
      attrs: {
        options: [
          { label: "查询列表", value: 0 },
          { label: "基础表单", value: 1 },
          { label: "分块表单", value: 2 },
          { label: "基础表格", value: 6 },
        ],
      },
    },
    [0, 1].includes(type) && {
      prop: "formItems",
      label: "表单项",
      required: true,
      rules: [{ validator: checkJsonValid, trigger: "blur" }],
      attrs: {
        type: "textarea",
        rows: 5,
      },
      quickAttrs: {
        example: `[{"prop":"gender","label":"性别"}]或[{tpl:"T_Gender"}]`,
      },
    },
    [0, 6].includes(type) && {
      prop: "tableCols",
      label: "表格列",
      required: true,
      rules: [{ validator: checkJsonValid, trigger: "blur" }],
      attrs: {
        type: "textarea",
        rows: 5,
      },
      quickAttrs: {
        example: `[{"prop":"status","label":"启用状态",type:"BaseTag",attrs:{name:"EnableStatus"}}]或[{tpl:"T_EnableStatus"}]`,
      },
    },
    ...(type === 0
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
    if (t === "String") {
      throw new Error(`暂未处理此类型：${t}`);
      // return {};
    } else if (t === "Object") {
      return it;
    } else {
      throw new Error(`暂未处理此类型：${t}`);
    }
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
