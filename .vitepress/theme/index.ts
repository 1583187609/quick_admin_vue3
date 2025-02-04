// import { h } from "vue";
// import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import Demo from "../render/inner/_components/Demo.vue";
import InfoList from "../render/inner/_components/info/InfoList.vue";
import Root from "./Root.vue";
// import { setupProdMockServer } from "../../mock/mockProdServer";
import I18n from "@/langs";
import components from "@/core/components";
import store from "@/store";
import router from "@/router";
import mixin from "@/core/mixin";
import { handleError } from "@/utils";

import "@/assets/styles/base.scss";
import "@/assets/styles/element.scss";
import "@/assets/styles/rewrite.scss";
import "../styles/index.scss";

export default {
  // NotFound,
  // extends: DefaultTheme,
  Layout: Root,
  enhanceApp({ app }) {
    app.config.globalProperties.$version = "1.0.0"; // 设置当前版本号
    app.config.errorHandler = handleError;
    app.component("Demo", Demo); // 注册全局Demo组件
    app.component("InfoList", InfoList); // 注册全局Panels组件
    app.use(components); //全局注册基础组件
    app.use(I18n);
    app.mixin(mixin);
    app.use(ElementPlus);
    app.use(store);
    app.use(router);
    // setupProdMockServer();
  },
  // 覆盖默认的导航栏渲染方法
  // renderNavbar: app => {
  //   const version = "v" + app.config.globalProperties.$version;
  //   return [
  //     DefaultTheme.renderNavbar(), // 首先渲染默认的导航栏
  //     h("div", { class: "navbar-version" }, version), // 添加版本号徽章
  //   ];
  // },
};
