/**
 * @link 持久化存储参照：https://blog.csdn.net/m0_53808238/article/details/129751966
 */

import { createPinia } from "pinia";
export default createPinia();

export { default as useBaseStore } from "./modules/base";
export { default as useKeepAliveStore } from "./modules/keep-alive";
export { default as useMenuStore } from "./modules/menu";
export { default as useRouteStore } from "./modules/route";
export { default as useUserStore } from "./modules/user";
export { default as useSetStore } from "./modules/set";
