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
    type: "ctitle",
    remark: "备注",
    attrs: {
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
  T_City: {
    type: "city",
    remark: "城市",
    attrs: {},
  },
  T_EnableStatus: {
    type: "enum",
    prop: "status",
    remark: "启用状态",
    attrs: {
      name: "D_EnableStatus",
    },
  },
  T_YesNoStatus: {
    type: "enum",
    remark: "是否状态",
    attrs: {
      name: "D_YesNoStatus",
    },
  },
  T_RoleType: {
    type: "enum",
    prop: "role",
    remark: "角色类型",
    attrs: {
      name: "D_RoleType",
    },
  },
  T_MenuType: {
    type: "enum",
    prop: "menu",
    remark: "菜单类型",
    attrs: {
      name: "D_MenuType",
    },
  },
};
