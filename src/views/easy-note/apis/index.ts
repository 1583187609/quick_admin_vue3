import http from "@/core/http";
import { CommonObj } from "@/vite-env";

/************ 用户相关 *************/

export const easyNoteDomain = "http://localhost:7003";
// 基础相关
export const GetToolCaptcha = (data?: CommonObj) => http("get", `${easyNoteDomain}/easy-note/tool/captcha`, data, { intercept: false });

// 用户相关
export const PostUserAdd = (data?: CommonObj) => http("post", `${easyNoteDomain}/easy-note/user/add`, data);
export const DeleteUserDelete = (data?: CommonObj) => http("delete", `${easyNoteDomain}/easy-note/user/delete`, data);
export const PutUserUpdate = (data?: CommonObj) => http("put", `${easyNoteDomain}/easy-note/user/update`, data);
export const GetUserList = (data?: CommonObj) => http("post", `${easyNoteDomain}/easy-note/user/list`, data);
export const GetUserDetail = (data?: CommonObj) => http("get", `${easyNoteDomain}/easy-note/user/detail`, data);

export const PostUserLogin = (data?: CommonObj) => http("post", `${easyNoteDomain}/easy-note/user/login`, data);
export const PostUserLogout = (data?: CommonObj) => http("post", `${easyNoteDomain}/easy-note/user/logout`, data);

// 题目相关
export const PostTopicAdd = (data?: CommonObj) => http("post", `${easyNoteDomain}/easy-note/topic/add`, data);
export const DeleteTopicDelete = (data?: CommonObj) => http("delete", `${easyNoteDomain}/easy-note/topic/delete`, data);
export const PutTopicUpdate = (data?: CommonObj) => http("put", `${easyNoteDomain}/easy-note/topic/update`, data);
export const GetTopicList = (data?: CommonObj) => http("post", `${easyNoteDomain}/easy-note/topic/list`, data);
export const GetTopicDetail = (data?: CommonObj) => http("get", `${easyNoteDomain}/easy-note/topic/detail`, data);

// 行业相关
export const PostIndustryAdd = (data?: CommonObj) => http("post", `${easyNoteDomain}/easy-note/industry/add`, data);
export const DeleteIndustryDelete = (data?: CommonObj) => http("delete", `${easyNoteDomain}/easy-note/industry/delete`, data);
export const PutIndustryUpdate = (data?: CommonObj) => http("put", `${easyNoteDomain}/easy-note/industry/update`, data);
export const GetIndustryList = (data?: CommonObj) => http("get", `${easyNoteDomain}/easy-note/industry/list`, data);
export const GetIndustryDetail = (data?: CommonObj) => http("get", `${easyNoteDomain}/easy-note/industry/detail`, data);
