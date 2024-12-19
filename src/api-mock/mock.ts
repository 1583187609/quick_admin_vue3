import http from "@/core/http";
import { CommonObj } from "@/core/_types";

/************ 临时写的三个暂用接口 *************/
export const GetImSearchFromUserList = (data?: CommonObj) => http("get", "/mock/common/list", data);
export const GetImSearchFriendList = (data?: CommonObj) => http("get", "/mock/common/list", data);
export const GetImSearchP2pChatList = (data?: CommonObj) => http("get", "/mock/common/list", data);
