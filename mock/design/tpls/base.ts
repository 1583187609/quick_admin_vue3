export default {
  T_Id: {
    type: "id",
    // prop: "id", // 省略不写，则跟模板名称的下划线命名保持一致
    remark: "自增id",
    attrs: {
      min: 1,
    },
  },
  T_CreateTime: {
    type: "date",
    remark: "创建时间",
    attrs: {
      min: "-1y",
      max: "-1M",
    },
  },
  T_UpdateTime: {
    type: "date",
    remark: "更新时间",
    attrs: {
      min: "-1M",
    },
  },
  T_CreateUpdateTime: {
    type: "createUpdateTime",
    prop: ["create_time", "update_time"],
    remark: "创建/更新时间",
    attrs: {
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
