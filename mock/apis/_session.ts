import { needParam } from "@/utils";

// 缓存的session数据
const sessionData = {
  token: "", //登录授权token
  captcha: "", //4位验证码
  userInfo: null,
};

// 获取（修改）缓存
export function getSession(key: string = needParam()) {
  const val = sessionData[key];
  if (val === undefined) throw new Error(`不存在该属性：${key}`);
  return val;
}

// 设置（修改）缓存
export function setSession(key: string = needParam(), val = needParam()) {
  if (sessionData[key] === undefined) throw new Error(`不存在该属性：${key}`);
  sessionData[key] = val;
  return val;
}
