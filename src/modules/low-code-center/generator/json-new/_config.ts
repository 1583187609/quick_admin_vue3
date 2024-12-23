// 表单项简写模板
export const defaultFormItemsTpls = {
  1: {
    name: "用户信息",
    children: [
      { prop: "name", label: "姓名" },
      "gender",
      "age",
      { prop: "avatar", label: "头像", type: "BaseUpload" },
      "region:home_city:家乡",
      "region:live_city:现居地",
      "enableStatus",
      "remark",
    ],
  },
};
// 表格列简写模板
export const defaultTableColsTpls = {
  1: {
    name: "用户信息",
    children: [
      "id",
      { prop: "name", label: "姓名" },
      "gender",
      "age",
      { prop: "avatar", label: "头像", type: "BaseImg" },
      "region:home_city:家乡",
      "region:live_city:现居地",
      "enableStatus",
      "remark",
      "createUpdate",
    ],
  },
};
