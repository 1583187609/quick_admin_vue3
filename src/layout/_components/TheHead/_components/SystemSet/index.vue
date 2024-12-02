<!-- 组件 - 系统设置 -->
<template>
  <SectionForm
    style="width: 370px"
    v-model="modelData"
    :sections="sections"
    :submitText="hasUpdated ? $t('sysSet.reset') : ''"
    resetText=""
    @change="handleChange"
    @submit="handleReset"
    :key="formKey"
  >
    <template #layout_type>
      <LayoutStyle v-model="modelData.layout_type" />
    </template>
    <template #theme_color>
      <el-color-picker :predefine="colorList" @change="handleColorChange" v-model="modelData.theme_color" disabled />
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { CommonObj, OptionItem } from "@/core/_types";
import { SectionFormItemAttrs } from "@/core/components/form/_types";
import LayoutStyle from "./_components/LayoutStyle.vue";
import { getIsUpdated } from "@/utils";
import cssVars from "@/assets/styles/_var.module.scss";
import { defaultSet } from "@/store/modules/set";
import { useSetStore } from "@/store";

const i18n = useI18n();
const { tm: $t } = i18n;
const showHideSwitchAttrs = {
  activeText: "显示",
  inactiveText: "隐藏",
};
// 预定义主题颜色
const colorList = [cssVars.colorPrimary, "#daa96e", "#0c819f", "#409eff", "#27ae60", "#ff5c93", "#e74c3c", "#fd726d", "#f39c12", "#9b59b6"];
const sizeOpts: OptionItem[] = [
  { label: "大型", value: "large" },
  { label: "中等", value: "medium" },
  { label: "小型", value: "small" },
  { label: "迷你", value: "mini" },
];
const languageOpts: OptionItem[] = [
  { label: "简体中文", value: "zh" },
  { label: "英文", value: "en" },
];
const setStore = useSetStore();
const defaultModel = getDefaultModel(defaultSet);
const modelData = reactive<CommonObj>(getDefaultModel(setStore));
const hasUpdated = computed(() => getIsUpdated(modelData, defaultModel)); //是否修改过
const formKey = ref(Date.now());
const sections = computed<SectionFormItemAttrs[]>(() => {
  return [
    {
      title: $t("sysSet.appearance.title"),
      fields: [
        { prop: "layout_type", label: $t("sysSet.appearance.layoutStyle.label"), type: "custom" },
        {
          prop: "widget_size",
          label: $t("sysSet.appearance.widgetSize.label"),
          type: "radio-group",
          attrs: {
            options: sizeOpts,
            disabled: true,
          },
        },
        {
          prop: "language",
          label: $t("sysSet.appearance.langType.label"),
          type: "radio-group",
          attrs: {
            options: languageOpts,
            // disabled: true,
          },
        },
        {
          prop: "bread",
          label: $t("sysSet.appearance.breadcrumb.label"),
          type: "switch",
          quickAttrs: {
            grid: modelData.bread === 1 ? 8 : undefined,
          },
          attrs: showHideSwitchAttrs,
        },
        modelData.bread === 1 && {
          prop: "bread_icon",
          label: $t("sysSet.appearance.breadcrumb.icon"),
          type: "switch",
          quickAttrs: {
            grid: 12,
          },
          attrs: showHideSwitchAttrs,
        },
        {
          prop: "page_tag",
          label: $t("sysSet.appearance.pageTag.label"),
          type: "switch",
          quickAttrs: {
            grid: modelData.page_tag === 1 ? 8 : undefined,
          },
          attrs: showHideSwitchAttrs,
        },
        modelData.page_tag === 1 && {
          prop: "page_tag_icon",
          label: $t("sysSet.appearance.pageTag.icon"),
          type: "switch",
          quickAttrs: {
            grid: 12,
          },
          attrs: showHideSwitchAttrs,
        },
        {
          prop: "footer",
          label: $t("sysSet.appearance.footer.label"),
          type: "switch",
          quickAttrs: {
            popover: $t("sysSet.appearance.footer.popover"),
          },
          attrs: { ...showHideSwitchAttrs, disabled: true },
        },
      ],
    },
    {
      title: $t("sysSet.theme.title"),
      fields: [
        { prop: "theme_color", label: $t("sysSet.theme.themeColor.label"), type: "custom" },
        {
          prop: "dark_mode",
          label: $t("sysSet.theme.darkMode.label"),
          type: "switch",
          attrs: {
            disabled: true,
          },
        },
      ],
    },
    {
      title: $t("sysSet.menu.title"),
      fields: [
        {
          prop: "unique_opened",
          label: $t("sysSet.menu.accordion.label"),
          type: "switch",
          quickAttrs: {
            popover: $t("sysSet.menu.accordion.popover"),
          },
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
    i18n.locale.value = val;
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
  Object.assign(modelData, defaultModel);
  setStore.resetDefault();
}
</script>
<style lang="scss" scoped></style>
