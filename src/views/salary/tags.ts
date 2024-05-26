export type HtbTagsType = "$AuditStatus";
export default {
  //审核状态
  $AuditStatus: {
    "0": {
      text: "已通过",
      attrs: {
        type: "success",
      },
    },
    "1": {
      text: "审核中",
      attrs: {
        type: "warning",
      },
    },
    "2": {
      text: "未审核",
      attrs: {
        type: "info",
      },
    },
  },
};
