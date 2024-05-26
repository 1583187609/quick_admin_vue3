import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { useBaseStore, useKeepAliveStore, useMenuStore, useRouteStore, useUserStore } from "@/store";
import { defaultHomePath, showMessage, storage } from "@/utils";
import routes from "./routes";
import { useNProgress } from "@/hooks";

const NProgress = useNProgress();
const { VITE_APP_NAME } = import.meta.env;

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});
// 全局前置守卫
router.beforeEach((to: any, from: any, next) => {
  const menuStore = useMenuStore();
  const userStore = useUserStore();
  const routeStore = useRouteStore();
  const baseStore = useBaseStore();
  const { path, query, name, meta } = to;
  const { title, auth = true, linkType } = meta;
  document.title = title ?? VITE_APP_NAME;
  NProgress.start();
  if (!auth) return next();
  if (storage.getItem("token")) {
    // if (userStore.isLogin) {
    if (path === defaultHomePath) menuStore.changeActiveIndex(-1);
    //如果创建好了路由，则直接跳转
    if (routeStore.isCreatedRoute) {
      // 如果已登录状态下，进入登录页会强制跳转到主页
      name === "login" ? next({ name: "home", replace: true }) : next();
    } else {
      routeStore.createRoutes();
      next({ path, query, replace: true });
    }
  } else {
    userStore.handleLoginOut(false);
    showMessage(`未登录，请先登录！`, "warning");
    // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
    next({
      path: "/login?redirect=" + path,
      replace: true,
    });
  }
});

router.afterEach((to, from) => {
  const keepAliveStore = useKeepAliveStore();
  NProgress.done();
  // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
  if (to?.meta?.cache ?? true) {
    const compName = to.matched.at(-1)?.components?.default.name;
    if (compName) return keepAliveStore.add(compName);
    console.warn("该页面组件未设置组件名，会导致缓存失效，请检查");
  }
  // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
  if (from?.meta?.cache ?? true) {
    const compName = from.matched.at(-1)?.components?.default.name;
    if (compName) keepAliveStore.remove(compName);
  }
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  console.error("路由错误", error.message);
  NProgress.done();
});

export default router;
