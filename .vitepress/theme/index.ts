import DefaultTheme from "vitepress/theme";
import components from "@/components";
import "@/assets/styles/base.scss";
// import "@/assets/styles/element.scss";
import "@/assets/styles/rewrite.scss";
// import "@/assets/styles/vitepress.scss";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.use(components); //全局注册基础组件
  },
};
