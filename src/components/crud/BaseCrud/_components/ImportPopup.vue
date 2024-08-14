<!-- 组件 - 导入弹出层 -->
<template>
  <div class="template-hint">
    <div class="tips">{{ tips }}</div>
    <!-- <div class="f-sa-c">
      <el-button @click="handleDownloadTpl" type="primary" plain>下载模板</el-button>
      <el-upload :on-change="handleFileChange" :auto-upload="false" :show-file-list="false" :accept="accept">
        <el-button type="primary">直接导入</el-button>
      </el-upload>
    </div> -->

    <!-- 注：这里要支持拖动上传等 -->
    <el-upload :on-change="handleFileChange" :auto-upload="false" :show-file-list="false" :accept="accept">
      <el-button type="primary">点击上传</el-button>
    </el-upload>
    <div class="f-sb-c">
      <div class="color-info f-1 mr-o">注：仅支持xxx文件</div>
      <el-button class="ml-a f-0" @click="handleDownloadTpl" link>下载模板</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {  inject } from "vue";
import { CommonObj } from "@/vite-env";
import { importExcel, exportExcel, showMessage } from "@/components/_utils";
import { ClosePopupInject } from "@/components/BasicPopup/_types";
export interface ImportTplColsItem {
  prop: string;
  label: string;
}
export interface TplCfgAttrs {
  name?: string; //"XXX模板示例"
  cols?: ImportTplColsItem[]; // [{ prop: "userName", label: "用户姓名" },{ prop: "phone", label: "电话号码" },{ prop: "labelName", label: "标签名称" }]
}
const defaultTplCfg: TplCfgAttrs = {
  name: "XXX模板示例", //用户权限导入模板
  cols: [], // [{ prop: "userName", label: "用户姓名" },{ prop: "phone", label: "电话号码" },{ prop: "labelName", label: "标签名称" }]
};
const closePopup = inject<ClosePopupInject>("closePopup");
const props = withDefaults(
  defineProps<{
    tips?: string;
    tplCfg?: TplCfgAttrs;
    accept?: string;
  }>(),
  {
    tips: "如果没有模板，请先下载模板",
    accept: ".xls,.xlsx",
  }
);
const emits = defineEmits(["change"]);
//下载模板
function handleDownloadTpl() {
  const { name, cols = [] } = Object.assign({}, defaultTplCfg, props.tplCfg);
  exportExcel([cols.map((it: ImportTplColsItem) => it.label)], name, undefined, () => {
    showMessage("已下载，请查看！");
    closePopup();
  });
}
function handleFileChange(file: any, files: any[]) {
  const { cols } = Object.assign({}, defaultTplCfg, props.tplCfg);
  const reader = new FileReader();
  reader.readAsArrayBuffer(file.raw);
  reader.onloadend = function (e) {
    const buffer = e.target?.result; //此时是arraybuffer类型
    const excelArr: CommonObj[] = importExcel(buffer);
    const arr = excelArr.map((obj: CommonObj) => {
      const newObj: CommonObj = {};
      for (const key in obj) {
        const k = cols?.find((it: ImportTplColsItem) => it.label === key)?.prop as string;
        newObj[k] = obj[key];
      }
      return newObj;
    });
    emits("change", arr);
  };
}
</script>
<style lang="scss" scoped>
.template-hint {
  width: 250px;
  text-align: center;
  .tips {
    margin-bottom: $gap;
  }
}
</style>
