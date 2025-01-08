<!-- 设置按钮 -->
<template>
  <div class="set-btns">
    <el-tooltip :content="btn.title" v-bind="defaultTooltipAttrs" v-for="(btn, ind) in newToolBtns" :key="ind">
      <el-button :disabled="disabled" @click="onToolBtn(btn.name)" v-bind="btn.attrs" />
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed, defineAsyncComponent } from "vue";
import { Setting, Printer } from "@element-plus/icons-vue";
import config from "@/config";
import { ClosePopupInject, CommonObj, OpenPopupInject } from "@/core/_types";
import { SpecialTableColType, TableColAttrs } from "@/core/components/table/_types";
import { defaultTooltipAttrs } from "@/utils";
import { specialColKeys } from "@/core/components/table";
import type { SetTableChangeParams } from "./_components/SetTable.vue";
import { useUserStore } from "@/store";

export type ToolBtnName = "set" | "print";

const SetPrint = defineAsyncComponent(() => import("./_components/SetPrint.vue"));
const SetTable = defineAsyncComponent(() => import("./_components/SetTable.vue"));

const userStore = useUserStore();

const toolsMap: CommonObj = {
  print: {
    name: "print",
    title: "打印",
    show: !!userStore.vipLevel,
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
    show: true,
    attrs: {
      type: "primary",
      icon: Setting,
      plain: true,
      circle: true,
    },
  },
};

const $emit = defineEmits(["update:cols"]);
const openPopup = inject<OpenPopupInject>("openPopup");
const closePopup = inject<ClosePopupInject>("closePopup");
const props = withDefaults(
  defineProps<{
    cols: TableColAttrs[];
    originCols: TableColAttrs[];
    toolBtns?: string[];
    disabled?: boolean;
  }>(),
  {
    cols: () => [],
    originCols: () => [],
    toolBtns: () => ["print", "set"], // "set" "print",
    ...config?.BaseCrud?._components?.SetBtns,
  }
);

const newCols = computed<TableColAttrs[]>({
  get: () => props.cols,
  set: (val: TableColAttrs[]) => $emit("update:cols", val),
});
const newToolBtns = computed(() => props.toolBtns.map(btn => toolsMap[btn]).filter(it => it.show));

function onToolBtn(name: ToolBtnName) {
  const map = {
    set: () => openColSetDrawer(),
    print: () => openPopup("打印设置", SetPrint),
  };
  map[name]?.();
}
// 打开列设置弹窗
function openColSetDrawer() {
  const rows = newCols.value.map(item => {
    const { prop, label, type, sortable = false, visible, exportable } = item;
    return {
      hidden: specialColKeys.includes(type as SpecialTableColType),
      colProp: prop,
      label,
      visible,
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
        onChange: handleChange,
        onSubmit: handleSubmit,
        onReset: handleReset,
      },
    ],
    "drawer"
  );
}

function handleChange({ type, isTrue, rowInd }: SetTableChangeParams) {
  const currRow = newCols.value[rowInd];
  currRow[type] = isTrue;
  if (type === "sortable") {
    const { width } = currRow;
    currRow.width = Number(width) + 16 * (isTrue ? 1 : -1);
  }
}
// 点击保存按钮
function handleSubmit() {
  closePopup();
}
//点击重置按钮
function handleReset() {
  newCols.value = JSON.parse(JSON.stringify(props.originCols));
}
</script>
<style lang="scss" scoped>
.set-btns {
  margin-bottom: var(--gap-half);
}
</style>
