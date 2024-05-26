<template>
  <div class="extra-btns f-fs-c-w">
    <BatchBtns
      class="mr-12"
      :allSelection="allSelection"
      :clearSelection="clearSelection"
      :invertSelection="invertSelection"
      :size="size"
      :disabled="!total"
      v-if="batchBtn"
    />
    <BaseBtn
      @click="handleClick(btn)"
      :class="size === 'small' ? 'mb-q' : 'mb-h'"
      :name="btn"
      :size="size"
      v-for="(btn, ind) in newBtns"
      :key="ind"
    />
    <el-tooltip :content="btn.title" :show-after="500" v-for="(btn, ind) in newToolBtns" :key="ind">
      <el-button
        :style="{ marginLeft: ind === 0 ? 'auto' : undefined }"
        :size="size"
        @click="onToolBtn(btn.name)"
        v-bind="btn.attrs"
      />
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, ref } from "vue";
import { Setting, Printer, CircleCheck } from "@element-plus/icons-vue";
import { sortObjArrByKey } from "@/utils";
import { BaseBtnType, BtnItem, BtnName, getBtnObj } from "@/components/BaseBtn";
import { TableField } from "@/components/table";
import SetTable from "../SetTable.vue";
import SetPrint from "../SetPrint.vue";
import BatchBtns from "./_components/BatchBtns.vue";
import config from "@/config";
import { CommonObj, FinallyNext, CommonSize } from "@/vite-env";
export type ToolBtnName = "colSet" | "print";
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
    name: "colSet",
    title: "设置",
    attrs: {
      type: "primary",
      icon: Setting,
      plain: true,
      circle: true,
    },
  },
};
const props = withDefaults(
  defineProps<{
    columns?: TableField[];
    allColumns?: TableField[];
    btns?: BaseBtnType[];
    toolBtns?: string[];
    // checked?: boolean; //是否有选中的行
    total?: number; //记录总条数
    isEmpty?: boolean;
    batchBtn?: boolean;
    size?: CommonSize;
    allSelection?: () => void;
    clearSelection?: () => void;
    invertSelection?: () => void;
  }>(),
  Object.assign(
    {
      columns: () => [],
      allColumns: () => [],
      btns: () => [],
      toolBtns: () => ["set"], //"print",
      // checked: false,
    },
    config?.BaseCrud?._components?.ExtraBtns
  )
);
const emits = defineEmits(["click", "toolBtn", "update:cols"]);
const openPopup: any = inject("openPopup");
const newBtns = computed(() => {
  const _newBtns = props.btns.map(btn => getBtnObj(btn));
  sortObjArrByKey(_newBtns);
  return _newBtns;
});
const newToolBtns = computed(() => {
  return props.toolBtns.map(btn => toolsMap[btn]);
});
function handleClick(btnObj: BtnItem) {
  emits("click", btnObj);
}
function onToolBtn(name: ToolBtnName) {
  if (name === "colSet") {
    openColSetDrawer();
  } else if (name === "print") {
    openPopup("打印设置", SetPrint, "dialog");
  }
}
function handleShowChange(name: string, isShow: boolean, allInd: number) {
  const { columns, allColumns } = props;
  if (isShow) {
    let findInd = -1;
    columns.findIndex((item, index) => {
      const itemAtAllInd = allColumns.findIndex(it => it.prop === item.prop);
      if (itemAtAllInd > allInd) {
        findInd = index;
        return true;
      } else if (itemAtAllInd < allInd) {
        if (index === columns.length - 1) {
          findInd = columns.length;
          return true;
        } else {
          return false;
        }
      }
    });
    columns.splice(findInd, 0, allColumns[allInd]);
  } else {
    const nowInd = columns.findIndex(it => it.prop === name);
    columns.splice(nowInd, 1);
  }
  emits("update:cols", columns.slice()); //slice()只会深拷贝一层
}
function handleExportChange(name: string, isShow: boolean, allInd: number) {
  console.log(name, isShow, allInd, "ddddd--------------------");
}
function handleOrderChange(name: string, isShow: boolean, allInd: number) {
  console.log(name, isShow, allInd, "ddddd--------------------");
}
//打开列设置弹窗
function openColSetDrawer() {
  const { columns, allColumns } = props;
  const rows = allColumns
    .filter(it => {
      return !it.prop?.startsWith("$");
    })
    .map(item => {
      const { prop, label, sortable = false } = item;
      return {
        colName: label,
        colProp: prop,
        isShow: !!columns.find(it => it.prop === prop),
        isExport: true,
        isOrder: sortable,
      };
    });
  openPopup(
    { title: "列设置", closeOnClickModal: true },
    {
      component: SetTable,
      attrs: {
        rows,
        size: props.size,
        handleShowChange,
        handleExportChange,
        handleOrderChange,
        handleResetColSet,
      },
    },
    "drawer"
  );
}
//点击重置按钮
function handleResetColSet() {
  emits("update:cols", props.allColumns.slice()); //slice()只会深拷贝一层
  setTimeout(() => {
    openColSetDrawer();
  });
}
</script>
<style lang="scss" scoped></style>
