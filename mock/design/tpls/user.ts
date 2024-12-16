export default {
  T_Nickname: {
    type: "cword",
    remark: "昵称",
    attrs: {
      words: "别样的感动",
      min: 1,
      max: 5,
    },
  },
  T_Age: {
    type: "integer",
    remark: "年龄",
    attrs: {
      min: 1,
      max: 30,
    },
  },
  T_UserCode: {
    type: "natural",
    remark: "学号",
    attrs: {
      min: 10000000,
      max: 99999999,
    },
  },
  T_Height: {
    type: "integer",
    remark: "身高",
    attrs: {
      min: 150,
      max: 200,
    },
  },
  T_Birthday: {
    type: "date",
    remark: "出生日期",
    attrs: {
      min: "-40y",
      max: "-10y",
    },
  },
  T_UserName: {
    type: "cname",
    remark: "姓名", // （中文）
    attrs: {},
  },
  T_CreateUser: {
    type: "cname",
    remark: "创建人",
    attrs: {},
  },
  T_UpdateUser: {
    type: "cname",
    remark: "修改人",
    attrs: {},
  },
  T_Avatar: {
    type: "avatar",
    remark: "头像图片地址",
    attrs: {
      genderKey: "gender",
    },
  },
  T_Phone: {
    type: "phone",
    remark: "电话号码",
    attrs: {
      pre: "135", // 电话号码前缀
    },
  },
  T_Gender: {
    type: "enum",
    remark: "性别",
    attrs: {
      name: "D_Gender",
    },
  },
  T_AccountStatus: {
    type: "enum",
    remark: "账号状态",
    attrs: {
      name: "D_AccountStatus",
    },
  },
  T_EducationType: {
    type: "enum",
    remark: "学历类型",
    attrs: {
      name: "D_EducationType",
    },
  },
  D_MatrimonyStatus: {
    type: "enum",
    remark: "婚姻状态",
    attrs: {
      name: "D_MatrimonyStatus",
    },
  },
};
