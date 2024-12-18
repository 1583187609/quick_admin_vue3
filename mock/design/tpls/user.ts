export default {
  T_Nickname: {
    type: "string",
    remark: "昵称",
    defaultValue: (val = "未知用户") => val,
    attrs: {
      typeKey: "ctitle",
      min: 1,
      max: 5,
    },
  },
  T_Age: {
    type: "number",
    remark: "年龄",
    defaultValue: 18,
    attrs: {
      typeKey: "natural",
      min: 1,
      max: 30,
    },
  },
  // 随机的自然数，大于等于 0 的整数
  T_UserCode: {
    type: "number",
    remark: "学号",
    attrs: {
      typeKey: "natural",
      min: 10000000,
      max: 99999999,
    },
  },
  T_Height: {
    type: "number",
    remark: "身高",
    defaultValue: 160,
    attrs: {
      typeKey: "natural",
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
      format: "YYYY-MM-DD",
    },
  },
  T_UserName: {
    type: "name",
    remark: "姓名",
    attrs: {
      typeKey: "cname", // （中文姓名）
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
  T_Avatar: {
    type: "image",
    remark: "头像图片地址",
    attrs: {
      typeKey: "avatar",
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
    type: "dict",
    remark: "性别",
    defaultValue: 0,
    attrs: {
      name: "D_Gender",
    },
  },
  T_AccountStatus: {
    type: "dict",
    remark: "账号状态",
    defaultValue: 1,
    attrs: {
      name: "D_AccountStatus",
    },
  },
  T_EducationType: {
    type: "dict",
    remark: "学历类型",
    defaultValue: 2,
    attrs: {
      name: "D_EducationType",
    },
  },
  D_MatrimonyStatus: {
    type: "dict",
    remark: "婚姻状态",
    defaultValue: 0,
    attrs: {
      name: "D_MatrimonyStatus",
    },
  },
};
