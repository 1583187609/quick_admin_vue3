import http from "@/core/http";
import { CommonObj } from "@/core/_types";

/************ 角色相关 *************/
// 新增、批量导入
export const PostMockRole = (data?: CommonObj) => http("post", "/mock/role", data);
// 删除、批量删除
export const DeleteMockRole = (data?: CommonObj) => http("delete", "/mock/role", data);
// 修改、批量修改
export const PatchMockRole = (data?: CommonObj) => http("patch", "/mock/role", data);
// 查询详情、查询列表、导出列表
export const GetMockRole = (data?: CommonObj) => http("get", "/mock/role", data);

/************ 菜单相关 *************/
// 新增、批量导入
export const PostMockMenu = (data?: CommonObj) => http("post", "/mock/menu", data);
// 删除、批量删除
export const DeleteMockMenu = (data?: CommonObj) => http("delete", "/mock/menu", data);
// 修改、批量修改
export const PatchMockMenu = (data?: CommonObj) => http("patch", "/mock/menu", data);
// 查询详情、查询列表、导出列表
export const GetMockMenu = (data?: CommonObj) => http("get", "/mock/menu", data);

/************ 用户相关 *************/
// 新增、批量导入
export const PostMockUser = (data?: CommonObj) => http("post", "/mock/user", data);
// 删除、批量删除
export const DeleteMockUser = (data?: CommonObj) => http("delete", "/mock/user", data);
// 修改、批量修改
export const PatchMockUser = (data?: CommonObj) => http("patch", "/mock/user", data);
// 查询详情、查询列表、导出列表
export const GetMockUser = (data?: CommonObj) => http("get", "/mock/user", data);

//获取验证码
export const GetMockCaptcha = (data?: CommonObj) => http("get", "/mock/captcha", data);
//登录
export const PostMockUserLogin = (data?: CommonObj) => http("post", "/mock/user/login", data);
//登出
export const PostMockUserLogout = (data?: CommonObj) => http("post", "/mock/user/logout", data);
//获取可登录的用户账号
export const GetMockUserLoginAccounts = (data?: CommonObj) => http("get", "/mock/user/login/accounts", data);

export * from "./auth";
export * from "./base";
export * from "./mock";
