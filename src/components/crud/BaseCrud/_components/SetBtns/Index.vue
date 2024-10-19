<!-- 设置按钮 -->
<template>
  <div class="set-btns" :class="size">
    <el-tooltip :content="btn.title" :show-after="500" v-for="(btn, ind) in newToolBtns" :key="ind">
      <el-button :size="size" :disabled="disabled" @click="onToolBtn(btn.name)" v-bind="btn.attrs" />
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed, defineAsyncComponent } from "vue";
import { Setting, Printer } from "@element-plus/icons-vue";
import config from "@/config";
import { ClosePopupInject, CommonObj, CommonSize, OpenPopupInject } from "@/vite-env";
import { SpecialTableColType, TableColAttrs } from "@/components/table/_types";
import { defaultCommonSize } from "@/utils";
import { specialColKeys } from "@/components/table";
import type { SetTableChangeParams } from "./_components/SetTable.vue";

const SetPrint = defineAsyncComponent(() => import("./_components/SetPrint.vue"));
const SetTable = defineAsyncComponent(() => import("./_components/SetTable.vue"));

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

const $emit = defineEmits(["update:modelValue"]);
const openPopup = inject<OpenPopupInject>("openPopup");
const closePopup = inject<ClosePopupInject>("closePopup");
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
      toolBtns: () => ["print", "set"], // "set" "print",
    },
    config?.BaseCrud?._components?.SetBtns
  )
);

const cols = computed<TableColAttrs[]>({
  get: () => props.modelValue,
  set: (val: TableColAttrs[]) => $emit("update:modelValue", val),
});
const newToolBtns = computed(() => props.toolBtns.map(btn => toolsMap[btn]));

function onToolBtn(name: ToolBtnName) {
  const map = {
    set: () => openColSetDrawer(),
    print: () => openPopup("打印设置", SetPrint, "dialog"),
  };
  map[name]?.();
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
        onChange: handleChange,
        onSubmit: handleSubmit,
        onReset: handleReset,
      },
    ],
    "drawer"
  );
}

function handleChange({ type, isTrue, rowInd }: SetTableChangeParams) {
  const currRow = cols.value[rowInd];
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
  cols.value = JSON.parse(JSON.stringify(props.originCols));
}
</script>
<style lang="scss" scoped>
.set-btns {
  &.large {
    margin-bottom: $gap-large;
  }
  &.default {
    margin-bottom: $gap-default;
  }
  &.small {
    margin-bottom: $gap-small;
  }
}
</style>
