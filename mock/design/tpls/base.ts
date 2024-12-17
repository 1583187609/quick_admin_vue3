export default {
  T_Id: {
    type: "id",
    // prop: "id", // 省略不写，则跟模板名称的下划线命名保持一致
    remark: "自增id",
    attrs: {
      min: 1,
    },
  },
  T_Title: {
    type: "string",
    remark: "标题名称",
    attrs: {
      typeKey: "ctitle",
      min: 3,
      max: 8,
    },
  },
  T_CreateTime: {
    type: "createUpdate",
    // prop: "create_time",
    remark: "创建时间",
    attrs: {
      typeKey: "createTime",
      min: "-1y",
      max: "-1M",
    },
  },
  T_UpdateTime: {
    type: "createUpdate",
    // prop: "update_time",
    remark: "更新时间",
    attrs: {
      typeKey: "updateTime",
      min: "-1M",
    },
  },
  T_Create: {
    type: "createUpdate",
    prop: ["create_time", "create_user"],
    remark: "创建时间+创建人",
    attrs: {
      typeKey: "create",
      min: "-1y",
      max: "-1M",
    },
  },
  T_Update: {
    type: "createUpdate",
    prop: ["update_time", "update_user"],
    remark: "更新时间+更新人",
    attrs: {
      typeKey: "update",
      min: "-1y",
      max: "-1M",
    },
  },
  T_CreateUpdate: {
    type: "createUpdate",
    prop: ["create_time", "create_user", "update_time", "update_user"],
    remark: "创建时间+创建人+更新时间+更新人",
    attrs: {
      typeKey: "createUpdate",
      min: "-1y",
      max: "-1M",
    },
  },
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
      name: "Region",
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
    attrs: {
      name: "D_EnableStatus",
    },
  },
  T_YesNoStatus: {
    type: "dict",
    remark: "是否状态",
    attrs: {
      name: "D_YesNoStatus",
    },
  },
  T_RoleType: {
    type: "dict",
    prop: "role",
    remark: "角色类型",
    attrs: {
      name: "D_RoleType",
    },
  },
  T_MenuType: {
    type: "dict",
    prop: "menu",
    remark: "菜单类型",
    attrs: {
      name: "D_MenuType",
    },
  },
};
