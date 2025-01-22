import { QuickGlobalConfig } from "./_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { getUserInfo, storage } from "@/utils";
import { defaultCommonSize } from "@/core/config";

// const isProd = process.env.NODE_ENV === "production";
// const isLog = !isProd;

// 首页地址（默认）
const config = {
  mockServer: true, // 是否启用mock服务
  // regexp: {}, // 正则表单式
  // 路径配置
  // paths: {
  //   home: "/", // 首页路径
  //   noAuth: ["/login"], // 不需要授权就能进入的路径
  // },
  // 日期（el-date-picker的一些预配置项）
  // date: {
  //   // 格式化
  //   format: {
  //     tableCol: "YYYY-MM-DD HH:mm:ss",
  //   },
  //   // 有效期
  //   valid: {
  //     login: 24 * 60 * 60 * 1000,
  //     dict: 24 * 60 * 60 * 1000,
  //   },
  // },
  // // 系统设置
  system: {
    size: "small",
    // emptyStr: "-",
    // rangeJoinChar: "~",
    // // 布局
    // layout: {},
    // // 主题
    // theme: {
    //   name: "orange",
    // },
  },
  // // 性能
  // performance: {
  //   enableTpl: true,
  //   enableOptimize: false,
  // },
  // ElementPlus（覆盖element-plus组件的默认属性）
  // element: {
  //   // el-dialog 的属性
  //   dialog: {},
  //   // el-drawer 的属性
  //   drawer: {},
  //   // el-tooltip 的属性
  //   tooltip: {},
  //   // el-popover 弹出层
  //   popover: {},
  //   // el-popconfirm 弹出层
  //   popconfirm: {},
  //   // el-form 的属性
  //   form: {},
  //   // el-table的属性
  //   table: {},
  //   // el-table-column 的属性
  //   tableColumn: {},
  //   // el-pagination 的属性
  //   pagination: {},
  //   // el-date-picker 的属性
  //   datePicker: {
  //     // 快捷选项
  //     // defaultTime: [],
  //     // shortcuts: {
  //     //   date: [],
  //     //   dateRange: [],
  //     // },
  //   },
  // },
  // // 弹窗
  // popup: {
  //   defaultType: "dialog", // 默认弹窗类型
  // },
  // 模板
  tpls: {
    // formItem: () => ({}),
    tableCol: {
      //创建列
      // T_Create: {
      //   prop: "create_time",
      //   label: "创建时间",
      //   minWidth: 170,
      //   type: 'UserTime',
      //   attrs:{
      //     userProp: 'create_user',
      //     timeProp: 'create_time'
      //   }
      // },
      // //修改列
      // T_Update: {
      //   prop: "update_time",
      //   label: "修改时间",
      //   minWidth: 170,
      //   type: 'UserTime',
      //   attrs:{
      //     userProp: 'update_user',
      //     timeProp: 'update_time'
      //   }
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
          const simple = col?.attrs?.simple;
          const widthMap = {
            large: simple ? 280 : 520,
            default: simple ? 230 : 450,
            small: simple ? 170 : 410,
          };
          return { width: widthMap[defaultCommonSize] };
        },
      },
    },
    baseBtns: {
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
    },
  },
  // 表单项组件
  // FormItem: {},
  // 表格列组件
  // Column: {},
  // 分页组件
  // Pagination: {},
  // OperateBtns: {
  //   max: 3,
  // },
  // 基础增删改查组件
  // BaseCrud: {
  //   Index: {
  //     // immediate: true,
  //     // changeFetch: true,
  //     log: isLog,
  //     // omits: true,
  //     // inputDebounce: true,
  //     // exportLimit: 10000,
  //     // pagination: () => ({ currPage: 1, pageSize: 20 }),
  //     // reqResMap: {
  //     //   curr_page: "page",
  //     //   page_size: "pageSize",
  //     // },
  //     // handleAuth: (auth: number[]) => auth.includes(getUserInfo()?.role),
  //     // handleAuth: (auth: number[]) => true,
  //     //跟下面的size  small 搭配使用
  //     // grid: () => ({
  //     //   xs: 12,
  //     //   sm: 12,
  //     //   md: 8,
  //     //   lg: 4,
  //     //   xl: 3,
  //     // }),
  //     // size: isSmall ? "small" : undefined,
  //   },
  //   // ExtraBtns: undefined,
  //   // BatchBtns: undefined,
  //   // OperateBtns: undefined,
  //   // Pagination: undefined,
  //   // QueryForm: {
  //   //   gridAttrsMap: {},
  //   // },
  //   // QueryTable: undefined,
  //   // SetPrint: undefined,
  //   // SetTable: undefined,
  // },
  // 基础表单组件
  // BaseForm: {
  //   Index: {
  //     log: isLog,
  //   },
  // },
  // 分块表单组件
  // SectionForm: {
  //   Index: {
  //     log: isLog,
  //   },
  // },
  // 基础图标组件
  // BaseIcon: {
  //   name: "ElemeFilled",
  // },
  // 基础按钮组件
  // BaseBtn: {},
  // 基础上传组件
  // BaseUpload: {
  //   // size: 100,
  //   // fit: "cover",
  //   // showFileList: false,
  //   // showTips: true,
  //   // accept: "image/png,image/jpg,image/jpeg",
  //   // limitSize: 1024 * 1024 * 10, //10M
  //   // headers: () => ({ "X-Token": storage.getItem("token") }),
  //   // action: `${isProd ? "" : "/proxy"}/api/admin/upload/image`,
  //   // handleSuccessResponse: (res: CommonObj, upFile: CommonObj) => {
  //   //   return new Promise((resolve, reject) => {
  //   //     const { code, message, data } = res;
  //   //     if (code === 2000) {
  //   //       resolve(data.fullUrl);
  //   //     } else {
  //   //       reject(message);
  //   //     }
  //   //   });
  //   // },
  // },
} as QuickGlobalConfig;
export default config;
