<!-- 表单配置生成文件 -->
<template>
  <div class="f-sb-s page-view">
    <FilePannel v-model="currFile" class="pannel f-0" style="width: 150px" />
    <PreviewPannel
      :activeIndex="editInd"
      :data="fileData"
      class="pannel f-1"
      @add="handleAdd"
      @del="handleDel"
      @edit="handleEdit"
      @clear="handleClear"
    />
    <SetPannel class="pannel f-1" :data="currData" @save="handleSave" ref="setPannelRef" :type="setType" />
  </div>
</template>
<script lang="ts" setup>
import FilePannel from "./FilePannel/Index.vue";
import PreviewPannel from "./PreviewPannel/Index.vue";
import { ref, watch } from "vue";
import { CommonObj } from "@/core/_types";
import SetPannel, { SetPannelType } from "./SetPannel/Index.vue";
import { showMessage } from "@/utils";
import _ from "lodash";

const { merge } = _;
const currFile = ref("");
const setType = ref<SetPannelType>("add");
const editInd = ref<number>(-1);
const currData = ref<CommonObj>();
const setPannelRef = ref<any>(null);
const fileData = ref<CommonObj[]>([{ prop: "add", label: "", labelWidth: "0", type: "slot" }]);

watch(
  () => currFile.value,
  newVal => {
    if (!newVal) return;
    fileData.value = [];
  }
);
function handleSave(data, type: SetPannelType, ind: number) {
  const isExist = fileData.value.find(it => it.prop === data.prop);
  if (type === "add") {
    if (isExist) return showMessage(`已添加过该属性：${data.prop}`, "error");
    fileData.value.push(data);
    // showMessage("新增成功");
  } else if (type === "edit") {
    merge(fileData.value[editInd.value], data);
    // showMessage("修改成功");
  } else {
    throw new Error(`暂未处理此类型：${type}`);
  }
  setPannelRef.value.reset();
}
function handleAdd(data) {
  fileData.value.splice(-1, 0, data);
  setPannelRef.value.reset();
  setType.value = "add";
  editInd.value = fileData.value.length - 2;
  currData.value = fileData.value.at(-2);
}
function handleDel(ind: number) {
  fileData.value.splice(ind, 1);
  setPannelRef.value.reset();
  showMessage("删除成功");
}
function handleEdit(ind: number) {
  currData.value = JSON.parse(JSON.stringify(fileData.value[ind]));
  setType.value = "edit";
  editInd.value = ind;
}
function handleClear() {
  fileData.value = [fileData.value.at(-1)!];
  setPannelRef.value.reset();
}
</script>
<style lang="scss" scoped>
.pannel {
  &:not(:last-child) {
    margin-right: $gap-half;
  }
  &.file-pannel {
    min-width: 180px;
  }
}
</style>
