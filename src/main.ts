import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import components from "@/components/index";
import pinia from "./store";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import mixin from "@/services/mixin";
import { setupProdMockServer } from "./mockProdServer";
import "@/assets/styles/font.scss";
import "@/assets/styles/base.scss";
import "@/assets/styles/element.scss";
import "@/assets/styles/rewrite.scss";

//为了少写字符，提升开发效率
// window.log = console.log;
// window.error = console.error;
// window.dir = console.dir;
setupProdMockServer();
const app = createApp(App);
// app.provide("global", {
//   userInfo: null,
// });
app.mixin(mixin);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(components);
app.use(pinia);
app.use(router);
app.mount("#app");
