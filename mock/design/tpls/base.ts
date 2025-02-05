export default {
  T_Id: {
    type: "id",
    // prop: "id", // 省略不写，则跟模板名称的下划线命名保持一致
    remark: "自增id",
    notNull: true,
    isAutoIncrement: true,
    attrs: {
      min: 1,
    },
  },
  T_Title: {
    type: "string",
    remark: "标题名称",
    defaultValue: "标题示例",
    attrs: {
      typeKey: "ctitle",
      min: 3,
      max: 8,
    },
  },
  T_CreateTime: {
    type: "createTime",
    // prop: "create_time",
    remark: "创建时间",
    attrs: {
      min: "-1y",
      max: "-1M",
    },
  },
  T_UpdateTime: {
    type: "updateTime",
    // prop: "update_time",
    remark: "更新时间",
    defaultValue: () => Date.now(),
    attrs: {
      min: "-1M",
    },
  },
  T_CreateUser: {
    type: "name",
    remark: "创建人",
    attrs: {
      typeKey: "cname", // （中文姓名）
    },
  },
  T_UpdateUser: {
    type: "name",
    remark: "修改人",
    attrs: {
      typeKey: "cname", // （中文姓名）
    },
  },
  T_Create: ["createTime", "createUser"],
  T_Update: ["updateTime", "updateUser"],
  T_CreateUpdate: ["createTime", "createUser", "updateTime", "updateUser"],
  T_Remark: {
    type: "string",
    remark: "备注",
    attrs: {
      typeKey: "csentence",
      min: 5,
      max: 20,
    },
  },
  T_Region: {
    type: "cascader",
    remark: "行政地址",
    attrs: {
      name: "C_Region",
    },
  },
  T_Address: {
    type: "address",
    remark: "城市",
    attrs: {
      typeKey: "county",
      prefix: true,
    },
  },
  T_EnableStatus: {
    type: "dict",
    prop: "status",
    remark: "启用状态",
    defaultValue: 1,
    attrs: {
      name: "D_EnableStatus",
    },
  },
  T_YesNoStatus: {
    type: "dict",
    prop: "yes_no",
    remark: "是否状态",
    defaultValue: 1,
    attrs: {
      name: "D_YesNoStatus",
    },
  },
  T_RoleType: {
    type: "dict",
    prop: "role",
    remark: "角色类型",
    defaultValue: 6,
    attrs: {
      name: "D_RoleType",
    },
  },
  T_MenuType: {
    type: "dict",
    remark: "菜单类型",
    defaultValue: 0,
    attrs: {
      name: "D_MenuType",
    },
  },
};
