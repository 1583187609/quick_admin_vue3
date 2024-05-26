<!-- 组件 - 个税表设置 -->
<template>
  <BaseCrud :cols="cols" :fetch="PostUserList" :extraBtns="[{ name: 'import', text: '导入个税' }]" @extraBtn="onExtraBtn">
    <template #jnjs> <el-input-number :min="0" placeholder="缴纳基数" /> 元 </template>
    <template #grjcbl> <el-input-number :min="0" placeholder="缴存比例" /> % </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { TableField } from "@/components/table";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import ImportTips from "./ImportTips.vue";
import { PostUserList } from "@/api-mock";
import { handleBtnNext } from "@/utils";
export type BatchEditType = "edit" | "batchEdit" | "baseNum" | "payRatio";
const openPopup = inject<any>("openPopup");
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const cols: TableField[] = [
  {
    label: "收入",
    children: [
      { prop: "xx", label: "下限（不含）", minWidth: 150 },
      { prop: "sx", label: "上限（含）", minWidth: 150 },
    ],
  },
  {
    label: "免税标准",
    children: [
      { prop: "gdz", label: "固定值", minWidth: 150 },
      { prop: "bl", label: "比例", minWidth: 150 },
    ],
  },
  {
    label: "应纳税所得额（元）",
    children: [
      { prop: "ynsxx", label: "下限（不含）", minWidth: 150 },
      { prop: "ynssx", label: "上限（含）", minWidth: 150 },
    ],
  },
  { prop: "sl", label: "税率", minWidth: 150 },
  { prop: "sskcs", label: "速算扣除数", minWidth: 150 },
  { label: "修改人", type: "update" },
];
function onExtraBtn(name: string, next: FinallyNext) {
  handleBtnNext(
    {
      import: () =>
        openPopup(
          {
            title: "导入",
            confirm() {
              handleImport(next);
            },
          },
          ImportTips,
          "dialog",
          true
        ),
    },
    name
  );
}
function handleImport(next: FinallyNext) {
  // PostImport().then((res:CommonObj)=>{
  next();
  // })
}
</script>
<style lang="scss" scoped></style>
