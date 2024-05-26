import { createPinia } from "pinia";
export default createPinia();

export { default as useBaseStore } from "./modules/base";
export { default as useDictStore } from "./modules/dict";
export { default as useKeepAliveStore } from "./modules/keep-alive";
export { default as useMenuStore } from "./modules/menu";
export { default as useRouteStore } from "./modules/route";
export { default as useUserStore } from "./modules/user";
export { default as useSetStore } from "./modules/set";
