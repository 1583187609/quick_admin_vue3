import { BaseComponentsConfig } from "./_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { getUserInfo, storage } from "@/utils";

// const isSmall = true;
// 应该从@/utils取isProd的值，但是会报错
const isProd = import.meta.env.MODE === "prod";
const isLog = !isProd;
// 首页地址（默认）

const config = {
  // homePath: "/home",
  mergeStrategy: "assign",
  popup: {
    defaultType: "dialog",
  },
  form: {
    emptyTime: "1000-01-01 00:00:00",
    defaultFormItemType: "input",
    // defaultDateShortcuts: [],
    // defaultDateRangeShortcuts: [],
    // defaultFieldAttrs: {},
    // defaultPopoverAttrs: {},
    // defaultFormItemTplsMap: {},
  },
  table: {
    // defaultGroupBtnsMaxNum: 3,
    customSpecialCol: {
      //创建列
      // T_Create: {
      //   prop: ["create_user", "create_time"],
      //   label: "创建时间",
      //   minWidth: 170,
      // },
      // //修改列
      // T_Update: {
      //   prop: ["update_user", "update_time"],
      //   label: "修改时间",
      //   minWidth: 170,
      // },
      // //switch开关
      // T_Switch: {
      //   prop: "status",
      //   label: "启用状态",
      //   minWidth: 90,
      //   attrs: {
      //     activeValue: 0,
      //     inactiveValue: 1,
      //     activeText: "启用",
      //     inactiveText: "禁用",
      //     inlinePrompt: true,
      //     // onChange() {
      //     //   ElMessage.warning("暂未处理【启用/禁用】事件");
      //     // },
      //   },
      // },
      // //是否启用 状态
      // T_BaseTag: {
      //   prop: "status",
      //   label: "状态",
      //   minWidth: 100,
      //   attrs: { name: "D_EnableStatus" },
      // },
      // //图片
      // T_BaseImg: {
      //   prop: "imgUrl",
      //   label: "图片",
      //   minWidth: 146,
      //   attrs: { size: "120" },
      // },
      //文本复制
      // T_BaseCopy: {},
      //用户信息
      T_UserInfo: {
        prop: "user_data",
        label: "用户信息",
        type: "UserInfo",
        // minWidth: 280, // 450/280
        fixed: "left",
        getInferredAttrs(col: TableColAttrs) {
          return {
            width: col?.attrs?.simple ? 232 : 450,
          };
        },
      },
    },
  },
  BaseCrud: {
    Index: {
      // immediate: true,
      // changeFetch: true,
      log: isLog,
      // omit: true,
      // inputDebounce: true,
      // exportLimit: 10000,
      // pagination: () => ({ currPage: 1, pageSize: 20 }),
      // reqMap: () => ({
      //   curr_page: "page",
      //   page_size: "pageSize",
      // }),
      // resMap: () => ({
      //   curr_page: "currentPage",
      //   page_size: "pageSize",
      //   total_num: "total",
      //   has_more: "hasMore",
      //   records: "list",
      // }),
      filterByAuth: (auth: number[]) => auth.includes(getUserInfo()?.role),
      // filterByAuth: (auth: number[]) => true,
      //跟下面的size  small 搭配使用
      // grid: () => ({
      //   xs: 12,
      //   sm: 12,
      //   md: 8,
      //   lg: 4,
      //   xl: 3,
      // }),
      // size: isSmall ? "small" : undefined,
      // compact: (_props: CommonObj) => _props.grid.xl < 6,
    },
    // _components: {
    //   ExtraBtns: undefined,
    //   BatchBtns: undefined,
    //   GroupBtns: undefined,
    //   Pagination: undefined,
    //   QueryForm: undefined,
    //   Column: undefined,
    //   QueryTable: undefined,
    //   SetPrint: undefined,
    //   SetTable: undefined,
    // },
  },
  BaseForm: {
    Index: {
      log: isLog,
    },
  },
  SectionForm: {
    Index: {
      log: isLog,
    },
  },
  BaseBtn: {
    btnsMap: {
      //auth 权限说明 0开发者 1超级管理员 2普通管理员 3超级VIP 4普通VIP 5特殊用户 6普通用户
      add: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      edit: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      delete: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      pass: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      reject: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      repeal: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      import: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      export: { auth: [] },
      upload: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      download: { auth: [] },
      enable: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      forbid: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      audit: { auth: [0, 1, 2, { code: 4, disabled: true }, 5] },
      view: { auth: undefined },
      submit: { auth: null },
      reset: { auth: [0, 5] },
      log: { auth: null },
      // empty: { auth: null },
    },
  },
  BaseUpload: {
    // size: 100,
    // fit: "cover",
    // showFileList: false,
    // showTips: true,
    // accept: "image/png,image/jpg,image/jpeg",
    // limitSize: 1024 * 1024 * 10, //10M
    // headers: () => ({ "X-Token": storage.getItem("token") }),
    // action: `${isProd ? "" : "/proxy"}/api/admin/upload/image`,
    // handleSuccessResponse: (res: CommonObj, upFile: CommonObj) => {
    //   return new Promise((resolve, reject) => {
    //     const { code, message, data } = res;
    //     if (code === 2000) {
    //       resolve(data.fullUrl);
    //     } else {
    //       reject(message);
    //     }
    //   });
    // },
  },
  // regexp: {},
} as BaseComponentsConfig;
export default config;
