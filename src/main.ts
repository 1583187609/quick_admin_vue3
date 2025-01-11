import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import baseComponents from "@/core/components";
import router from "@/router";
import store from "@/store";
import mixin from "@/core/mixin";
import I18n from "@/langs";
import { setupProdMockServer } from "#/mock/mockProdServer";
import { handleError } from "@/utils";

import "@/assets/styles/base.scss";
import "@/assets/styles/element.scss";
import "@/assets/styles/rewrite.scss";

//为了少写字符，提升开发效率
// window.log = console.log;
// window.error = console.error;
// window.dir = console.dir;
setupProdMockServer();
const app = createApp(App);
app.config.errorHandler = handleError;
// app.provide("global", {
//   userInfo: null,
// });
app.mixin(mixin);
app.use(ElementPlus);
app.use(baseComponents); //全局注册基础组件
app.use(I18n);
app.use(store);
app.use(router);
app.mount("#app");
