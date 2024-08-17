import { CommonObj } from "@/vite-env";
import { WarningFilled } from "@element-plus/icons-vue";
import cssVars from "@/assets/styles/_var.module.scss";

const { colorDanger, colorSuccess, colorWarning } = cssVars;

export default {
  add: {
    name: "add",
    btnText: "新增",
    // auth: [0,1,2],
    // to: undefined,
    order: 0,
    attrs: {
      type: "success",
      icon: "CirclePlus",
    },
  },
  edit: {
    name: "edit",
    btnText: "编辑",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 1,
    attrs: {
      type: "success",
      icon: "Edit",
    },
  },
  delete: {
    name: "delete",
    btnText: "删除",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 2,
    attrs: {
      type: "danger",
      icon: "Delete",
    },
    popconfirm: {
      icon: WarningFilled,
      iconColor: colorDanger,
      confirmButtonType: "danger",
    },
  },
  pass: {
    name: "pass",
    btnText: "通过",
    // auth: [0,1,2],
    // to: undefined,
    order: 3,
    validate: true,
    attrs: {
      type: "success",
      icon: "Checked",
    },
    popconfirm: {
      icon: "CircleCheck",
      iconColor: colorSuccess,
      confirmButtonType: "success",
    },
  },
  reject: {
    name: "reject",
    btnText: "驳回",
    // auth: [0,1,2],
    // to: undefined,
    order: 4,
    validate: true,
    attrs: {
      type: "danger",
      icon: "Failed",
    },
    popconfirm: {
      icon: "CircleClose",
      iconColor: colorDanger,
      confirmButtonType: "danger",
    },
  },
  repeal: {
    name: "repeal",
    btnText: "撤销",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 5,
    attrs: {
      type: "warning",
      icon: "TopLeft",
    },
  },
  import: {
    name: "import",
    btnText: "导入",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 6,
    attrs: {
      type: "primary",
      icon: "Top",
    },
  },
  export: {
    name: "export",
    btnText: "导出",
    // auth: [],
    // to: undefined,
    order: 7,
    customRules: false,
    attrs: {
      type: "primary",
      icon: "Bottom",
    },
    popconfirm: true,
  },
  upload: {
    name: "upload",
    btnText: "上传",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 8,
    attrs: {
      type: "primary",
      icon: "Upload",
    },
  },
  download: {
    name: "download",
    btnText: "下载",
    // auth: [],
    // to: undefined,
    order: 9,
    attrs: {
      type: "primary",
      icon: "Download",
    },
  },
  enable: {
    name: "enable",
    btnText: "启用",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 10,
    attrs: {
      type: "success",
      icon: "CircleCheck",
    },
    popconfirm: {
      iconColor: colorSuccess,
      confirmButtonType: "success",
    },
  },
  forbid: {
    name: "forbid",
    btnText: "禁用",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 11,
    attrs: {
      type: "warning",
      icon: "Remove",
    },
    popconfirm: {
      iconColor: colorWarning,
      confirmButtonType: "warning",
    },
  },
  audit: {
    name: "audit",
    btnText: "审核",
    // auth: [0, 1, 2],
    // to: undefined,
    order: 20,
    attrs: {
      type: "success",
      icon: "Edit",
    },
  },
  view: {
    name: "view",
    btnText: "详情", //查看
    // auth: [],
    // to: undefined,
    order: 21,
    attrs: {
      type: "info",
      icon: "View",
    },
  },
  submit: {
    name: "submit",
    btnText: "提交",
    // auth: [],
    // to: undefined,
    order: 40,
    attrs: {
      type: "primary",
      icon: "DocumentChecked",
    },
  },
  reset: {
    name: "reset",
    btnText: "重置",
    // auth: [0],
    // to: undefined,
    order: 41,
    attrs: {
      type: "primary",
      icon: "RefreshLeft",
    },
  },
  log: {
    name: "log",
    btnText: "日志",
    // auth: [],
    // to: undefined,
    order: 42,
    attrs: {
      type: "primary",
      icon: "Tickets",
    },
  },
  //当按钮的name不对时，默认展示这个空按钮，用于给开发者提示
  empty: {
    name: "empty",
    btnText: "~empty~",
    // auth: [],
    // to: undefined,
    order: 100,
    attrs: {
      type: "danger",
    },
  },
} as CommonObj;
