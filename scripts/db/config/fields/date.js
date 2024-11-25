// 日期常用字段
export default {
  /*** 通用类型 ***/
  // 默认时间
  commonTime: {
    type: "timestamp",
    // remark: "", // 通用时间类型
  },
  /*** 常用类型 ***/
  // 创建时间
  createTime: {
    type: "timestamp",
    defaultValue: "CURRENT_TIMESTAMP",
    remark: "创建时间",
  },
  // 修改时间
  updateTime: {
    type: "timestamp",
    // defaultValue: "CURRENT_TIMESTAMP",
    remark: "修改时间",
  },
};
