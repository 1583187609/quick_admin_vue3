<!-- 通用导入组件 -->
<template>
  <div class="template-hint">
    <div class="desc mb-o" v-if="description">{{ description }}</div>
    <div class="f-fs-c mb-h">
      如果没有模板，请<el-button @click="handleDownloadTpl" type="primary" link>点击此处下载模板</el-button>。
    </div>
    <!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->
    <el-upload
      class="upload-demo"
      :on-change="handleFileChange"
      :auto-upload="false"
      :show-file-list="false"
      :accept="accept"
      multiple
      drag
    >
      <el-icon size="3em">
        <UploadFilled />
      </el-icon>
      <div class="el-upload__text">点击或拖拽文件到此处上传</div>
      <div class="el-upload__text">支持{{ accept }}</div>
      <template #tip>
        <div class="el-upload__tip" v-if="tips">{{ tips }}</div>
        <!-- <div class="el-upload__tip">单次导入上限：{{ limit }}条</div> -->
      </template>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
import { CommonObj } from "@/core/_types";
import { importExcel, exportExcel, showMessage } from "@/core/utils";
import { ClosePopupInject } from "@/core/components/BasicPopup/_types";
import { UploadFilled } from "@element-plus/icons-vue";
import { useNextCallback } from "@/hooks";

export interface ImportTplColsItem {
  prop: string;
  label: string;
}
export interface ImportCfgAttrs {
  name?: string; // excel文件名称，例："XXX模板示例"
  cols?: ImportTplColsItem[]; // 导入列，例：[{ prop: "userName", label: "用户姓名" },{ prop: "phone", label: "电话号码" },{ prop: "labelName", label: "标签名称" }]
  accept?: string;
  description?: string; // 描述类摘要文字
  tips?: string; // 提示类文字
  // limit?: number; // 最大导入数
}

const closePopup = inject<ClosePopupInject>("closePopup");
const props = withDefaults(
  defineProps<{
    name?: string; // excel文件名称，例："XXX模板示例"
    cols?: ImportTplColsItem[]; // 导入列，例：[{ prop: "userName", label: "用户姓名" },{ prop: "phone", label: "电话号码" },{ prop: "labelName", label: "标签名称" }]
    accept?: string;
    description?: string; // 描述类摘要文字
    tips?: string; // 提示类文字
    // limit?: number; // 最大导入数
  }>(),
  {
    name: "XXX模板示例",
    cols: () => [],
    accept: ".xls,.xlsx",
    description: "请上传文件，支持拖动上传",
    // limit: 10000,
  }
);
const $emit = defineEmits(["change"]);
// 下载模板
function handleDownloadTpl() {
  const { name, cols } = props;
  exportExcel([cols.map((it: ImportTplColsItem) => it.label)], name, undefined, () => {
    showMessage("已下载，请查看！");
    closePopup();
  });
}
function handleFileChange(file: any, files: any[]) {
  const { cols } = props;
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
    $emit("change", arr, useNextCallback("导入", closePopup), e);
  };
}
</script>
<style lang="scss" scoped>
.template-hint {
  width: 400px;
  .desc {
    // text-indent: 2em;
  }
}
</style>
