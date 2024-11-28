import http from "@/core/http";
import { CommonObj } from "@/vite-env";

/************ 用户相关 *************/

const domain = "http://localhost:7003";
// 用户相关
export const PostUserAdd = (data: CommonObj) => http("post", `${domain}/easy-note/user/add`, data);
export const DeleteUserDelete = (data: CommonObj) => http("delete", `${domain}/easy-note/user/delete`, data);
export const PutUserUpdate = (data: CommonObj) => http("put", `${domain}/easy-note/user/update`, data);
export const GetUserList = (data: CommonObj) => http("get", `${domain}/easy-note/user/list`, data);
export const GetUserDetail = (data: CommonObj) => http("get", `${domain}/easy-note/user/detail`, data);

// 题目相关
export const PostTopicAdd = (data: CommonObj) => http("post", `${domain}/easy-note/topic/add`, data);
export const DeleteTopicDelete = (data: CommonObj) => http("delete", `${domain}/easy-note/topic/delete`, data);
export const PutTopicUpdate = (data: CommonObj) => http("put", `${domain}/easy-note/topic/update`, data);
export const GetTopicList = (data: CommonObj) => http("get", `${domain}/easy-note/topic/list`, data);
export const GetTopicDetail = (data: CommonObj) => http("get", `${domain}/easy-note/topic/detail`, data);
