<!-- 组件 - 系统设置 -->
<template>
  <SectionForm
    style="width: 370px"
    v-model="model"
    :sections="sections"
    :submitText="hasUpdated ? '恢复默认设置' : ''"
    resetText=""
    @change="handleChange"
    @submit="handleReset"
    :key="formKey"
  >
    <template #layout_type>
      <LayoutStyle v-model="model.layout_type" />
    </template>
    <template #theme_color>
      <el-color-picker :predefine="colorList" @change="handleColorChange" v-model="model.theme_color" disabled />
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import SectionForm from "@/components/form/SectionForm.vue";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/vite-env";
import { SectionFormItemAttrs } from "@/components/form";
import LayoutStyle from "./_components/LayoutStyle.vue";
import { getIsUpdated } from "@/utils";
import cssVars from "@/assets/styles/_var.module.scss";
import { defaultSet } from "@/store/modules/set";
import { useSetStore } from "@/store";

const showHideSwitchAttrs = {
  activeText: "显示",
  inactiveText: "隐藏",
};
// 预定义主题颜色
const colorList = [
  cssVars.colorPrimary,
  "#daa96e",
  "#0c819f",
  "#409eff",
  "#27ae60",
  "#ff5c93",
  "#e74c3c",
  "#fd726d",
  "#f39c12",
  "#9b59b6",
];
const sizeOpts: OptionItem[] = [
  { label: "大型", value: "large" },
  { label: "中等", value: "medium" },
  { label: "小型", value: "small" },
  { label: "迷你", value: "mini" },
];
const languageOpts: OptionItem[] = [
  { label: "中文", value: "chinese" },
  { label: "英文", value: "english" },
];
const setStore = useSetStore();
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const defaultModel = getDefaultModel(defaultSet);
let model = reactive<CommonObj>(getDefaultModel(setStore));
const hasUpdated = computed(() => getIsUpdated(model, defaultModel)); //是否修改过
const formKey = ref(Date.now());
const sections = computed<SectionFormItemAttrs[]>(() => {
  return [
    {
      title: "显示设置",
      fields: [
        { prop: "layout_type", label: "布局风格", type: "custom" },
        {
          prop: "widget_size",
          label: "控件大小",
          type: "radio-group",
          options: sizeOpts,
          attrs: {
            disabled: true,
          },
        },
        {
          prop: "language",
          label: "语言类型",
          type: "radio-group",
          options: languageOpts,
          attrs: {
            disabled: true,
          },
        },
        {
          prop: "bread",
          label: "面包屑",
          type: "switch",
          span: model.bread === 1 ? 8 : undefined,
          attrs: showHideSwitchAttrs,
        },
        model.bread === 1 && {
          prop: "bread_icon",
          label: "图标",
          type: "switch",
          span: 12,
          attrs: showHideSwitchAttrs,
        },
        {
          prop: "page_tag",
          label: "页签栏",
          type: "switch",
          span: model.page_tag === 1 ? 8 : undefined,
          attrs: showHideSwitchAttrs,
        },
        model.page_tag === 1 && {
          prop: "page_tag_icon",
          label: "图标",
          type: "switch",
          span: 12,
          attrs: showHideSwitchAttrs,
        },
        {
          prop: "footer",
          label: "页脚",
          type: "switch",
          popover: "页面底部的专利许可",
          attrs: { ...showHideSwitchAttrs, disabled: true },
        },
      ],
    },
    {
      title: "主题设置",
      fields: [
        { prop: "theme_color", label: "主题颜色", type: "custom" },
        {
          prop: "dark_mode",
          label: "暗黑模式",
          type: "switch",
          attrs: {
            disabled: true,
          },
        },
      ],
    },
    {
      title: "菜单设置",
      fields: [
        {
          prop: "unique_opened",
          label: "手风琴",
          type: "switch",
          popover: "启用后，只保持一个子菜单的展开",
        },
      ],
    },
  ];
});
function getDefaultModel(set: CommonObj) {
  return {
    layout_type: set.layout.type,
    widget_size: set.layout.size,
    language: set.language.type,
    bread: set.breadcrumb.show,
    bread_icon: set.breadcrumb.showIcon,
    page_tag: set.pageTags.show,
    page_tag_icon: set.pageTags.showIcon,
    footer: set.footer.show,
    theme_color: set.theme.color,
    dark_mode: set.theme.darkMode,
    unique_opened: set.menu.uniqueOpened,
  };
}
function handleChange(prop: string, val: any) {
  if (prop === "widget_size") {
    setStore.updateSet("layout", { size: val });
  } else if (prop === "language") {
    setStore.updateSet("language", { type: val });
  } else if (prop === "bread") {
    setStore.updateSet("breadcrumb", { show: val });
  } else if (prop === "bread_icon") {
    setStore.updateSet("breadcrumb", { showIcon: val });
  } else if (prop === "page_tag") {
    setStore.updateSet("pageTags", { show: val });
  } else if (prop === "page_tag_icon") {
    setStore.updateSet("pageTags", { showIcon: val });
  } else if (prop === "footer") {
    setStore.updateSet("footer", { show: val });
  } else if (prop === "dark_mode") {
    setStore.updateSet("theme", { darkMode: val });
  } else if (prop === "unique_opened") {
    setStore.updateSet("menu", { uniqueOpened: val });
  }
}
function handleColorChange(val: string) {
  setStore.updateSet("theme", { color: val });
}
function handleReset() {
  Object.assign(model, defaultModel);
  setStore.resetDefault();
}
</script>
<style lang="scss" scoped></style>
