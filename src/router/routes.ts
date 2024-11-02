import { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "layout", //父路由不能写name，不然会触发vue警告
    component: () => import("@/layout/Index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          cache: false,
        },
      },
      {
        path: "inner_link",
        name: "innerLink",
        component: () => import("@/views/iframe/index.vue"),
        meta: {
          title: "内链页面",
          cache: false,
          linkType: 1,
        },
      },
      {
        path: "error", // 示例：/error?type=999
        name: "errorPage",
        meta: {
          title: "Error",
          cache: false,
        },
        component: () => import("@/views/error.vue"),
      },
      {
        path: ":pathMatch(.*)",
        name: "viewNotFound",
        meta: {
          title: "404",
          cache: false,
        },
        component: () => import("@/views/error.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      auth: false,
    },
    component: () => import("@/views/login/index.vue"),
    // component: () => import("@/views/login/index-new.vue"),  //新版登录页面
    // component: () => import("@/views/login/index-canvas.vue"),  //canvas背景登录页面
  },
  // {
  //   path: "/file_not_found",
  //   name: "fileNotFound",
  //   meta: {
  //     title: "文件未找到",
  //     cache: false,
  //   },
  //   component: () => import("@/views/error.vue"),
  // },
  {
    path: "/:pathMatch(.*)",
    name: "pageNotFound",
    meta: {
      title: "404",
      auth: false,
    },
    component: () => import("@/views/error.vue"),
  },
] as Array<RouteRecordRaw>;
