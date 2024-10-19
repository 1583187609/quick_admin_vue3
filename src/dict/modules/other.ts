export default {
  //账号状态：0=正常;1=封禁;2=注销;3=限制互动;4=脱单;5=待注销
  AccountStatus: {
    "0": {
      text: "正常",
      attrs: {
        type: "primary",
      },
    },
    "1": {
      text: "封禁",
      attrs: {
        type: "danger",
      },
    },
    "2": {
      text: "注销",
      attrs: {
        type: "info",
      },
    },
    "3": {
      text: "限制互动",
      attrs: {
        type: "warning",
      },
    },
    "4": {
      text: "已脱单",
      attrs: {
        type: "success",
      },
    },
    "5": {
      text: "待注销",
      attrs: {
        type: "info",
      },
    },
  },
  //身份认证情况：1=未认证,2=学历;3=公司,4=双认证
  AuthCase: {
    "1": {
      text: "未认证",
      attrs: {
        type: "info",
      },
    },
    "2": {
      text: "学历认证",
      attrs: {
        color: "#06D4E0",
        style: {
          color: "#fff",
        },
      },
    },
    "3": {
      text: "公司认证",
      attrs: {
        color: "#1368F9",
        style: {
          color: "#fff",
        },
      },
    },
    "4": {
      text: "双认证",
      attrs: {
        type: "success",
      },
    },
  },
  //学历类型: 0未知 1大专 2本科 3研究生 4博士
  EducationType: {
    0: {
      text: "未知",
      attrs: {
        type: "info",
      },
    },
    1: {
      text: "专科",
      attrs: {
        type: "info",
      },
    },
    2: {
      text: "本科",
      attrs: {
        type: "primary",
      },
    },
    3: {
      text: "硕士",
      attrs: {
        type: "warning",
      },
    },
    4: {
      text: "博士",
      attrs: {
        type: "success",
      },
    },
  },
  //领取奖励方式：0手动 1自动
  GetRewardWay: {
    0: {
      text: "手动",
      attrs: {
        type: "info",
      },
    },
    1: {
      text: "自动",
      attrs: {
        type: "primary",
      },
    },
  },
  //婚姻状态：0单身 1有婚姻史 2已脱单
  MatrimonyStatus: {
    "0": {
      text: "未婚",
      attrs: {
        type: "info",
      },
    },
    "1": {
      text: "离异",
      attrs: {
        type: "warning",
      },
    },
    "2": {
      text: "已脱单",
      attrs: {
        type: "danger",
      },
    },
  },
  // 任务奖励类型: 1 金币， 2 心动嘉宾
  TaskRewards: {
    1: {
      text: "金币",
      attrs: {
        type: "warning",
      },
    },
    2: {
      text: "心动嘉宾",
      attrs: {
        type: "danger",
      },
    },
  },
};
