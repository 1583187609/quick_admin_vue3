import htbTags, { HtbTagsType } from "@/views/salary/tags";

export { default as colors } from "./colors";
export * from "./cascader";
export * from "./_types";

/**
 * type 为 '' 即是primary的效果，如果写成 primary ，会触发ElementPlus 警告
 */
export default {
  ...htbTags,
  //学历类型: 0未知 1大专 2本科 3研究生 4博士
  EducationType: {
    "0": {
      text: "未知",
      attrs: {
        type: "info",
      },
    },
    "1": {
      text: "专科",
      attrs: {
        type: "info",
      },
    },
    "2": {
      text: "本科",
      attrs: {
        type: "primary",
      },
    },
    "3": {
      text: "硕士",
      attrs: {
        type: "warning",
      },
    },
    "4": {
      text: "博士",
      attrs: {
        type: "success",
      },
    },
  },
  //启用状态
  EnableStatus: {
    "0": {
      text: "禁用",
      attrs: {
        type: "primary",
      },
    },
    "1": {
      text: "启用",
      attrs: {
        type: "primary",
      },
    },
  },
  //领取奖励方式：0手动 1自动
  GetRewardWay: {
    "0": {
      text: "手动",
      attrs: {
        type: "info",
      },
    },
    "1": {
      text: "自动",
      attrs: {
        type: "primary",
      },
    },
  },
  //菜单类型
  MenuType: {
    "0": {
      text: "目录",
      attrs: {
        type: "primary",
      },
    },
    "1": {
      text: "菜单",
      attrs: {
        type: "primary",
      },
    },
    "2": {
      text: "按钮",
      attrs: {
        type: "primary",
      },
    },
    // "3": {
    //   text: "外链",
    //   attrs: {
    //     type: "primary",
    //   },
    // },
  },
  //性别：0未知 1男 2女
  Gender: {
    "0": {
      text: "未知",
      attrs: {
        type: "primary",
      },
    },
    "1": {
      text: "男",
      attrs: {
        type: "primary",
      },
    },
    "2": {
      text: "女",
      attrs: {
        type: "primary",
      },
    },
  },
  //奖励类型: coin 金币， task-heart-package：心动
  TaskRewards: {
    coin: {
      text: "金币",
      attrs: {
        type: "warning",
      },
    },
    "task-heart-package": {
      text: "心动嘉宾",
      attrs: {
        type: "danger",
      },
    },
  },
  //用户类型
  RoleType: {
    "0": {
      text: "超级管理员",
      attrs: {
        type: "primary",
      },
    },
    "1": {
      text: "普通管理员",
      attrs: {
        type: "primary",
      },
    },
    "2": {
      text: "特殊用户",
      attrs: {
        type: "primary",
      },
    },
    "3": {
      text: "普通用户",
      attrs: {
        type: "primary",
      },
    },
    "4": {
      text: "游客用户",
      attrs: {
        type: "primary",
      },
    },
    "5": {
      text: "开发人员",
      attrs: {
        type: "primary",
      },
    },
  },
  YesNoStatus: {
    "0": {
      text: "否",
      attrs: {
        type: "primary",
      },
    },
    "1": {
      text: "是",
      attrs: {
        type: "primary",
      },
    },
  },
  //用户类型：defect: "缺陷用户"new_user: "新人曝光"priority: "优质嘉宾"
  User: {
    new_user: {
      text: "新人曝光期",
      attrs: {
        type: "primary",
      },
    },
    "2": {
      text: "超级曝光期",
      disabled: true,
      attrs: {
        type: "danger",
      },
    },
    priority: {
      text: "优质嘉宾",
      attrs: {
        color: "#F3DBFB",
        style: "color: #d359f5; border: 1px solid #f4cffd",
      },
    },
    defect: {
      text: "缺陷用户",
      attrs: {
        type: "info",
      },
    },
  },
};
