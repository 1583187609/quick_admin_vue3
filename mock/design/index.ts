export const designMap = {
  // 角色表
  role: {
    name: "角色",
    list: [], // allRoles,
    fields: [
      "id:用户id| | |disabled",
      "phone| | |required", // required 也可写为*，意为必填
      "password|||required",
      "userName| | |required",
      "nickname| | | ",
      "gender| | | ",
      "age| | | ",
      "id:role:角色id（类型）| | |required,tips:这是示例文字说明,popover:只是弹出层示例文字说明", // 角色（管理员、会员、普通用户等）
      "amount:coin:金币余额|| |disabled",
      "commonTime:memberTime:会员到期时间| | | ",
      "createTime:注册时间| | ",
      "update",
      // "commonTime:destroyTime:注销时间| | ",
      "accountStatus:status:账号状态| | |grid:12",
    ],
    // fields: [
    //   "id:用户id",
    //   "phone",
    //   "password",
    //   "userName",
    //   "nickname",
    //   "gender",
    //   "age",
    //   "role", // 角色（管理员、会员、普通用户等）
    //   "amount:coin:金币余额",
    //   "commonTime:memberTime:会员到期时间",
    //   "createTime:注册时间",
    //   "update",
    //   // "commonTime:destroyTime:注销时间",
    //   "accountStatus:status:账号状态",
    // ],
  },
  // 用户表
  //   user: {
  //     name: "用户",
  //     list: [], // allUsers,
  //     privateKeys: ["psd"],
  //   },
};
