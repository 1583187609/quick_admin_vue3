import dictMap from "../../../dict";
const { D_BooleanStatus, D_EnableStatus, D_AuditStatus } = dictMap;
export default {
  /***** id相关 *****/
  // 自增id，主建
  T_Id: {
    type: "int",
    notNull: true,
    isPrimaryKey: true,
    remark: "主键id",
    isAutoIncrement: true,
    isUnsigned: true,
    isFillZero: false,
  },
  // 创建人
  T_CreatorId: {
    type: "int",
    notNull: true,
    remark: "创建人",
    isUnsigned: true,
    defaultValue: 0, // 默认值为0，不代表任何人（兜底处理）
  },
  // 最后修改人
  T_UpdatorId: {
    type: "int",
    remark: "最后修改人",
    isUnsigned: true,
    defaultValue: 0, // 默认值为0，不代表任何人（兜底处理）
  },
  /***** 枚举相关 *****/
  // 通用枚举类型
  T_Enum: {
    type: "tinyint",
    length: 1,
    notNull: true,
    // remark: "", // 枚举
    // defaultValue: undefined,
    isUnsigned: true,
    // enum: {},
  },
  // 布尔状态：0否 1是
  T_BoolStatus: {
    type: "tinyint",
    length: 1,
    // notNull: true,
    // remark: "是否状态",
    // defaultValue: 0,
    isUnsigned: true,
    enum: D_BooleanStatus,
  },
  // 启用状态（枚举类型）
  T_EnableStatus: {
    type: "tinyint",
    name: "status",
    length: 1,
    notNull: true,
    remark: "启用状态",
    defaultValue: 1,
    isUnsigned: true,
    enum: D_EnableStatus,
  },
  // 审核状态（枚举类型）
  T_AuditStatus: {
    type: "tinyint",
    length: 1,
    notNull: true,
    remark: "审核状态",
    defaultValue: 0,
    isUnsigned: true,
    enum: D_AuditStatus,
  },
};
