export default {
  title: "系统设置",
  appearance: {
    title: "外观设置",
    layoutStyle: {
      label: "布局风格",
      options: {
        columns: "分栏",
        classics: "经典",
        vertical: "纵向",
        horizontal: "横向",
      },
    },
    widgetSize: {
      label: "控件大小",
      options: {
        large: "大型",
        medium: "中等",
        small: "小型",
        mini: "迷你",
      },
    },
    langType: {
      label: "语言类型",
      options: {
        zh: "简体中文",
        en: "英文",
      },
    },
    breadcrumb: {
      label: "面包屑",
      icon: "图标",
    },
    pageTag: {
      label: "页签栏",
      icon: "图标",
    },
    footer: {
      label: "页脚",
      popover: "页面底部的专利许可",
    },
  },
  theme: {
    title: "主题设置",
    themeColor: {
      label: "主题颜色",
    },
    darkMode: {
      label: "暗黑模式",
    },
  },
  menu: {
    title: "菜单设置",
    accordion: {
      label: "手风琴",
      popover: "启用后，只保持一个子菜单的展开",
    },
  },
  reset: "恢复默认设置",
};
