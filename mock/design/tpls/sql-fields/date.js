// 日期相关
export default {
  /*** 通用类型 ***/
  // 默认时间
  T_CommonTime: {
    type: "timestamp",
    // remark: "", // 通用时间类型
  },
  /*** 常用类型 ***/
  // 创建时间
  T_CreateTime: {
    type: "timestamp",
    defaultValue: "CURRENT_TIMESTAMP",
    remark: "创建时间",
  },
  // 修改时间
  T_UpdateTime: {
    type: "timestamp",
    // defaultValue: "CURRENT_TIMESTAMP",
    remark: "修改时间",
  },
};
