<!-- 表单配置生成文件 -->
<template>
  <div class="f-sb-s page-view">
    <FilePannel v-model="currMenuInfo" defaultValue="199-1-1-2-1-1" class="pannel f-0" style="width: 300px" />
    <PreviewPannel
      class="pannel f-1"
      :activeIndex="currFieldInd"
      :formFields="formFields"
      :defaultValues="previewDefaultValues"
      :menuInfo="currMenuInfo"
      @add="handleAdd"
      @delete="handleDel"
      @edit="handleEdit"
      @clear="handleClear"
    />
    <SetPannel class="pannel f-1" :fieldInfo="currFieldInfo" @save="handleSave" :type="setType" ref="setPannelRef" />
  </div>
</template>
<script lang="ts" setup>
import FilePannel from "./FilePannel/Index.vue";
import PreviewPannel from "./PreviewPannel/Index.vue";
import { ref, watch } from "vue";
import { CommonObj } from "@/core/_types";
import SetPannel, { SetPannelType } from "./SetPannel/Index.vue";
import { getTreeNodeByValue, showMessage } from "@/utils";
import _ from "lodash";

const { merge } = _;
const currMenuInfo = ref<CommonObj>();
const setType = ref<SetPannelType>("add");
const previewDefaultValues = reactive<CommonObj>({});
const currFieldInd = ref<number>(0);
const setPannelRef = ref<any>(null);
const formFields = ref<CommonObj[]>([]);
const currFieldInfo = computed<CommonObj | undefined>(() => {
  const field = formFields.value[currFieldInd.value];
  if (!field) return;
  return JSON.parse(JSON.stringify(field));
});

watch(
  () => currMenuInfo.value,
  newVal => {
    if (!newVal) return;
    formFields.value = newVal.fileInfo.compInfo.fields;
  }
);
function handleSave(data: CommonObj, type: SetPannelType) {
  const isExist = formFields.value.find(it => it.prop === data.prop);
  if (type === "add") {
    // if (isExist) return showMessage(`已添加过该属性：${data.prop}`, "error");
    if (isExist) return console.warn(`已添加过该属性：${data.prop}`);
    formFields.value.push(data);
  } else if (type === "edit") {
    merge(formFields.value[currFieldInd.value], data);
  } else {
    throw new Error(`暂未处理此类型：${type}`);
  }
  getDefaultVals(data);
  setPannelRef.value?.reset?.();
}
function handleAdd(data) {
  formFields.value.push(data);
  setPannelRef.value?.reset?.();
  setType.value = "add";
  currFieldInd.value = formFields.value.length - 1;
}
function handleDel(ind: number) {
  formFields.value.splice(ind, 1);
  setPannelRef.value?.reset?.();
  showMessage("删除成功");
}
function handleEdit(ind: number) {
  setType.value = "edit";
  currFieldInd.value = ind;
}
function handleClear() {
  formFields.value = [];
  setPannelRef.value?.reset?.();
}
// 获取默认值
function getDefaultVals(field?: CommonObj) {
  if (!field) return;
  const { defaultValue, prop } = field;
  if (defaultValue === undefined) return;
  previewDefaultValues[prop] = defaultValue;
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
