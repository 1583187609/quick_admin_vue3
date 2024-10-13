<!-- 组件 - 导入弹出层 -->
<template>
  <div class="template-hint">
    <div class="desc mb-o" v-if="desc">{{ desc }}</div>
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
      <BaseIcon name="UploadFilled" size="3em" />
      <div class="el-upload__text">点击或拖拽文件到此处上传</div>
      <div class="el-upload__text">支持{{ accept }}</div>
      <template #tip>
        <div class="el-upload__tip">单次导入上限：10000条</div>
      </template>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import { inject } from "vue";
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
    desc?: string; // 描述类摘要文字
    tplCfg?: TplCfgAttrs;
    accept?: string;
  }>(),
  {
    desc: "这是描述类摘要文字",
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
  width: 400px;
  .desc {
    // text-indent: 2em;
  }
}
</style>
