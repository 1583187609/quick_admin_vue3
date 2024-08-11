import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import components from "@/components";
import store from "@/store";
import router from "@/router";
import mixin from "@/services/mixin";
import { handleError } from "@/utils";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import Demo from "../inner/_components/Demo.vue";
import Root from "./Root.vue";
import { h } from "vue";

import "@/assets/styles/base.scss";
import "@/assets/styles/element.scss";
import "@/assets/styles/rewrite.scss";
import "../styles/index.scss";

export default {
  extends: DefaultTheme,
  Layout: Root,
  enhanceApp({ app }) {
    app.config.globalProperties.$version = "1.0.0"; // 设置当前版本号
    app.config.errorHandler = handleError;
    // 注册全局组件
    app.component("Demo", Demo), app.use(components); //全局注册基础组件
    app.mixin(mixin);
    app.use(ElementPlus, { locale: zhCn });
    app.use(store);
    app.use(router);
  },
  // 覆盖默认的导航栏渲染方法
  renderNavbar: () => {
    const version = "v" + app.config.globalProperties.$version;
    return [
      DefaultTheme.renderNavbar(), // 首先渲染默认的导航栏
      h("div", { class: "navbar-version" }, version), // 添加版本号徽章
    ];
  },
};
