import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import components from "@/components";
import store from "@/store";
import router from "@/router";
import mixin from "@/services/mixin";
import { handleError } from "@/utils";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import Demo from "../inner/_components/Demo.vue";

import "@/assets/styles/base.scss";
import "@/assets/styles/element.scss";
import "@/assets/styles/rewrite.scss";
// import "@/assets/styles/vitepress.scss";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.config.errorHandler = handleError;
    // 注册全局组件
    app.component("Demo", Demo), app.use(components); //全局注册基础组件
    app.mixin(mixin);
    app.use(ElementPlus, { locale: zhCn });
    app.use(store);
    app.use(router);
  },
};
