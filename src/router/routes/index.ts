import { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "layout", // 父路由不能写name，不然会触发vue警告
    component: () => import("@/layout/Index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        // component: () => import("@/views/home/workbench/index.vue"),
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
        path: "403", // 无权限访问，示例：/403
        name: "noAuth",
        meta: {
          title: "无权限",
          cache: false,
        },
        component: () => import("@/views/error.vue"),
      },
      {
        path: "404", // 未找到页面，示例：/404
        name: "notFound",
        meta: {
          title: "未找到",
          cache: false,
        },
        component: () => import("@/views/error.vue"),
      },
      {
        path: "500", // 服务器异常，示例：/500
        name: "serverError",
        meta: {
          title: "服务异常",
          cache: false,
        },
        component: () => import("@/views/error.vue"),
      },
      {
        path: "999",
        name: "notFoundFile",
        meta: {
          title: "文件未找到",
          cache: false,
        },
        component: () => import("@/views/error.vue"),
      },
      {
        path: ":pathMatch(.*)",
        redirect: "404",
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
  {
    path: "/:pathMatch(.*)",
    name: "notFoundPage",
    redirect: "/404",
    meta: {
      title: "未找到页面",
      auth: false,
    },
    component: () => import("@/views/error.vue"),
  },
] as Array<RouteRecordRaw>;
