<!-- 表单配置生成文件 -->
<template>
  <div class="f-sb-s page-view">
    <FilePannel v-model="currFile" class="pannel f-0" style="width: 300px" />
    <PreviewPannel
      class="pannel f-1"
      :activeIndex="editInd"
      :data="formFields"
      :defaultValues="defaultValues"
      :fileInfo="currFile"
      @add="handleAdd"
      @del="handleDel"
      @edit="handleEdit"
      @clear="handleClear"
    />
    <SetPannel class="pannel f-1" :data="currData" @save="handleSave" :type="setType" ref="setPannelRef" />
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
const currFile = ref<CommonObj>();
const setType = ref<SetPannelType>("add");
const defaultValues = reactive<CommonObj>({});
const editInd = ref<number>(-1);
const currData = ref<CommonObj>();
const setPannelRef = ref<any>(null);
const formFields = ref<CommonObj[]>([]);

watch(
  () => currFile.value,
  newVal => {
    if (!newVal) return;
    formFields.value = newVal.data.fields;
  }
);
function handleSave(data, type: SetPannelType, ind: number) {
  const isExist = formFields.value.find(it => it.prop === data.prop);
  if (type === "add") {
    if (isExist) return showMessage(`已添加过该属性：${data.prop}`, "error");
    formFields.value.push(data);
  } else if (type === "edit") {
    merge(formFields.value[editInd.value], data);
  } else {
    throw new Error(`暂未处理此类型：${type}`);
  }
  getDefaultVals(data);
  setPannelRef.value.reset();
}
function handleAdd(data) {
  formFields.value.push(data);
  setPannelRef.value.reset();
  setType.value = "add";
  editInd.value = formFields.value.length - 1;
  currData.value = formFields.value.at(-1);
}
function handleDel(ind: number) {
  formFields.value.splice(ind, 1);
  setPannelRef.value.reset();
  showMessage("删除成功");
}
function handleEdit(ind: number) {
  currData.value = JSON.parse(JSON.stringify(formFields.value[ind]));
  setType.value = "edit";
  editInd.value = ind;
}
function handleClear() {
  formFields.value = [];
  setPannelRef.value.reset();
}
// 获取默认值
function getDefaultVals(field?: CommonObj) {
  if (!field) return;
  const { defaultValue, prop } = field;
  if (defaultValue === undefined) return;
  defaultValues[prop] = defaultValue;
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
