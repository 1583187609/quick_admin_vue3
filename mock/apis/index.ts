import base from "./user";
import users from "./user";
import mocks from "./mock";
import auths from "./auth";
export default [...base, ...users, ...mocks, ...auths];

import { createRestfulApis } from "../create";

const restfulApis = {
  ...createRestfulApis("user"),
  ...createRestfulApis("role"),
  ...createRestfulApis("department"),
};

import http from "@/core/http";
import { CommonObj } from "@/core/_types";

// 新增（注册）、批量新增（导入）
export const PostMockUser = (data?: CommonObj) => http("post", "/mock/user", data);
// 删除、批量删除
export const DeleteMockUser = (data?: CommonObj) => http("delete", "/mock/user", data);
// 修改、批量修改
export const PatchMockUser = (data?: CommonObj) => http("patch", "/mock/user", data);
// 查询详情、查询列表、导出列表
export const GetMockUser = (data?: CommonObj) => http("get", "/mock/user", data);

// // 新增（注册）
// export const PostMockUserAdd = (data?: CommonObj) => http("post", "/mock/user/add", data);
// // 删除
// export const DeleteMockUserDel = (data?: CommonObj) => http("delete", "/mock/user/del", data);
// // 修改
// export const PatchMockUserUpdate = (data?: CommonObj) => http("patch", "/mock/user/update", data);
// // 查详情
// export const GetMockUserDetail = (data?: CommonObj) => http("get", "/mock/user/detail", data);
// // 查列表
// export const GetMockUserList = (data?: CommonObj) => http("get", "/mock/user/list", data);
