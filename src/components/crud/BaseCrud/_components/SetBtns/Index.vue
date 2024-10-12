<!-- 页面-简介 -->
<template>
  <div class="set-btns">
    <el-tooltip :content="btn.title" :show-after="500" v-for="(btn, ind) in newToolBtns" :key="ind">
      <el-button :size="size" :disabled="disabled" @click="onToolBtn(btn.name)" v-bind="btn.attrs" />
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed } from "vue";
import SetTable from "./_components/SetTable.vue";
import SetPrint from "./_components/SetPrint.vue";
import { Setting, Printer } from "@element-plus/icons-vue";
import config from "@/config";
import { CommonObj, CommonSize, OpenPopupInject } from "@/vite-env";
import { SpecialTableColType, TableColAttrs } from "@/components/table/_types";
import { defaultCommonSize } from "@/utils";
import { specialColKeys } from "@/components/table";

export type ToolBtnName = "set" | "print";

const toolsMap: CommonObj = {
  print: {
    name: "print",
    title: "打印",
    attrs: {
      type: "primary",
      icon: Printer,
      plain: true,
      circle: true,
    },
  },
  set: {
    name: "set",
    title: "设置",
    attrs: {
      type: "primary",
      icon: Setting,
      plain: true,
      circle: true,
    },
  },
};

const emits = defineEmits(["update:modelValue"]);
const openPopup = inject<OpenPopupInject>("openPopup");
const props = withDefaults(
  defineProps<{
    size?: CommonSize;
    modelValue?: TableColAttrs[];
    originCols?: TableColAttrs[];
    toolBtns?: string[];
    disabled?: boolean;
  }>(),
  Object.assign(
    {
      modelValue: () => [],
      originCols: () => [],
      size: defaultCommonSize,
      toolBtns: () => ["set"], // "set" "print",
    },
    config?.BaseCrud?._components?.SetBtns
  )
);

const cols = computed<TableColAttrs[]>({
  get: () => props.modelValue,
  set: (val: TableColAttrs[]) => emits("update:modelValue", val),
});
const newToolBtns = computed(() => props.toolBtns.map(btn => toolsMap[btn]));

function onToolBtn(name: ToolBtnName) {
  const map = {
    set: () => openColSetDrawer(),
    print: () => openPopup("打印设置", SetPrint, "dialog"),
  };
  map[name]?.();
}
function handleShowChange(name: string, isShow: boolean, allInd: number) {
  if (isShow) {
    let findInd = -1;
    cols.value.findIndex((item, index) => {
      const itemAtAllInd = cols.value.findIndex(it => it.prop === item.prop);
      if (itemAtAllInd > allInd) {
        findInd = index;
        return true;
      } else if (itemAtAllInd < allInd) {
        if (index === cols.value.length - 1) {
          findInd = cols.value.length;
          return true;
        } else {
          return false;
        }
      }
    });
    cols.value.splice(findInd, 0, cols.value[allInd]);
  } else {
    const nowInd = cols.value.findIndex(it => it.prop === name);
    cols.value.splice(nowInd, 1);
  }
  emits("update:modelValue", cols.value.slice()); // slice()只会深拷贝一层
}
function handleExportChange(name: string, isShow: boolean, allInd: number) {
  console.log(name, isShow, allInd, "ddddd--------------------");
}
function handleOrderChange(name: string, isShow: boolean, allInd: number) {
  console.log(name, isShow, allInd, "ddddd--------------------");
}
// 打开列设置弹窗
function openColSetDrawer() {
  const { size } = props;
  const rows = cols.value.map(item => {
    const { prop, label, type, sortable = false, visible, exportable } = item;
    return {
      hidden: specialColKeys.includes(type as SpecialTableColType),
      colProp: prop,
      label,
      visible, // !!cols.value.find(it => it.prop === prop)
      exportable,
      sortable: !!sortable,
    };
  });
  openPopup(
    { title: "列设置", closeOnClickModal: true },
    [
      SetTable,
      {
        rows,
        size,
        handleShowChange,
        handleExportChange,
        handleOrderChange,
        handleResetColSet,
      },
    ],
    "drawer"
  );
}
//点击重置按钮
function handleResetColSet() {
  emits("update:modelValue", JSON.parse(JSON.stringify(props.originCols))); // slice()只会深拷贝一层
  setTimeout(() => openColSetDrawer());
}
</script>
<style lang="scss" scoped></style>
