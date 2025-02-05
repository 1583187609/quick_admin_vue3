<!-- 组件 - 系统设置 -->
<template>
  <SectionForm
    style="width: 370px"
    v-model="modelData"
    :sections="sections"
    :submitBtn="hasUpdated ? $t('sysSet.reset') : ''"
    resetBtn=""
    @change="handleChange"
    @submit="handleReset"
    :key="formKey"
  >
    <template #layout_type>
      <LayoutStyle v-model="modelData.layout_type" />
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, inject } from "vue";
import { useI18n } from "vue-i18n";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { CommonObj, OptionItem } from "@/core/_types";
import { SectionFormItemAttrs } from "@/core/components/form/_types";
import LayoutStyle from "./_components/LayoutStyle.vue";
import { getIsUpdated } from "@/utils";
import { cssVars } from "@/utils";
import { defaultSet } from "@/store/modules/set";
import { useSetStore } from "@/store";

const setSkin = inject<any>("setSkin");
const i18n = useI18n();
const { tm: $t } = i18n;
const showHideSwitchAttrs = {
  activeValue: 1,
  inactiveValue: 0,
  activeText: "显示",
  inactiveText: "隐藏",
};
// 预定义主题颜色
const colorList = [cssVars.colorPrimary, "#daa96e", "#0c819f", "#409eff", "#27ae60", "#ff5c93", "#e74c3c", "#fd726d", "#f39c12", "#9b59b6"];
const sizeOpts: OptionItem[] = [
  { label: "大型", value: "large" },
  { label: "默认", value: "default" },
  { label: "小型", value: "small" },
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
        { prop: "layout_type", label: $t("sysSet.appearance.layoutStyle.label"), type: "slot" },
        {
          prop: "widget_size",
          label: $t("sysSet.appearance.widgetSize.label"),
          type: "radio-group",
          attrs: {
            options: sizeOpts,
            // disabled: true,
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
        {
          prop: "custom_theme",
          label: "自定义主题",
          type: "switch",
          attrs: {
            activeValue: 1,
            inactiveValue: 0,
            activeText: "是",
            inactiveText: "否",
          },
        },
        ...(modelData.custom_theme
          ? [
              {
                prop: "theme_color",
                label: $t("sysSet.theme.themeColor.label"),
                type: "color-picker",
                attrs: {
                  predefine: colorList,
                  disabled: true,
                },
              },
            ]
          : [
              {
                prop: "theme_name",
                label: $t("sysSet.theme.themeName.label"),
                type: "select",
                attrs: {
                  options: "D_ThemeName",
                },
              },
            ]),
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
  console.log(set, "set------------");
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
    theme_name: set.theme.name,
    dark_mode: set.theme.darkMode,
    unique_opened: set.menu.uniqueOpened,
  };
}
function handleChange(val: any, prop: string) {
  if (prop === "widget_size") {
    setStore.updateSet("layout", { size: val });
    setSkin("orange", val);
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
  } else if (prop === "theme_color") {
    setStore.updateSet("theme", { color: val });
  } else if (prop === "theme_name") {
    setStore.updateSet("theme", { name: val });
    setSkin(val);
  } else if (prop === "dark_mode") {
    setStore.updateSet("theme", { darkMode: val });
  } else if (prop === "unique_opened") {
    setStore.updateSet("menu", { uniqueOpened: val });
  }
}
function handleReset() {
  Object.assign(modelData, defaultModel);
  setStore.resetDefault();
}
</script>
<style lang="scss" scoped></style>
