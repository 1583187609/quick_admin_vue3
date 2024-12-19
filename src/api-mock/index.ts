import http from "@/core/http";
import { CommonObj } from "@/core/_types";

/************ 通用接口 *************/
// {
//   此处是对单个请求的：是否字符串序列化、是否显示全局加载动效、是否吐司提示、请求失败后最大重连次数的设置
//   isStringify: false,
//   loadEnable: true,
//   toastEnable: true,
//   reconnectMax: 1,
// }
// ts类型示例
export interface PostMockCommonListReq {
  [key: string]: any;
}
export interface PostMockCommonListRes {
  [key: string]: any;
}
// 新增、批量导入
export const PostMockCommon = (data?: PostMockCommonListReq) => http<PostMockCommonListRes>("post", "/mock/common", data);
// 删除、批量删除
export const DeleteMockCommon = (data?: CommonObj) => http("delete", "/mock/common", data);
// 修改、批量修改
export const PatchMockCommon = (data?: CommonObj) => http("patch", "/mock/common", data);
// 查询详情、查询列表、导出列表
export const GetMockCommon = (data?: CommonObj) => http("get", "/mock/common", data);

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

/************ 部门相关 *************/
// 新增、批量导入
export const PostMockDepartment = (data?: CommonObj) => http("post", "/mock/department", data);
// 删除、批量删除
export const DeleteMockDepartment = (data?: CommonObj) => http("delete", "/mock/department", data);
// 修改、批量修改
export const PatchMockDepartment = (data?: CommonObj) => http("patch", "/mock/department", data);
// 查询详情、查询列表、导出列表
export const GetMockDepartment = (data?: CommonObj) => http("get", "/mock/department", data);

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

/************ select 下拉项 *************/
// 获取学校/公司下拉项数据
export const GetMockOptions = (data?: CommonObj) => http("get", "/mock/options", data);

/************ cascader 下拉项 *************/
// 获取mock 地区省市区县
export const GetMockCascader = (data?: CommonObj) => http("get", "/mock/cascader", data);

/************ 临时写的三个暂用接口 *************/
export const GetImSearchFromUserList = (data?: CommonObj) => http("get", "/mock/common", data);
export const GetImSearchFriendList = (data?: CommonObj) => http("get", "/mock/common", data);
export const GetImSearchP2pChatList = (data?: CommonObj) => http("get", "/mock/common", data);
