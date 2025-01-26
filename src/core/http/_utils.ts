import { ElLoading, ElMessage } from "element-plus";
import { CommonObj, SetTimeout } from "@/core/_types";
export interface Response<T = any> {
  code: number;
  msg: string;
  data: T;
}

type ToastType = "warning" | "info" | "success" | "error";

let lastMsg = ""; // 上次提示过了，下次不提示重复的
let tostTimer: SetTimeout = null;
let showLoadTimer: SetTimeout = null;
let loading: null | CommonObj = null;
let loadingCount = 0;

export function startLoading() {
  loading = ElLoading.service({
    lock: true,
    text: "玩命加载中……",
    background: "rgba(0, 0, 0, 0.5)",
  });
}

export function endLoading() {
  loading?.close();
  loading = null;
}

export function showLoading() {
  if (loadingCount === 0) {
    showLoadTimer = setTimeout(() => {
      startLoading();
      showLoadTimer = null;
    }, 3000); // 如果超过3秒仍未请求成功，则显示全局加载弹窗
  }
  loadingCount += 1;
}

export function hideLoading() {
  if (loadingCount > 0) {
    loadingCount -= 1;
    if (loadingCount === 0) {
      if (showLoadTimer) {
        clearTimeout(showLoadTimer);
        showLoadTimer = null;
      } else {
        endLoading();
      }
    }
  }
}

export function showToast(msg: string, type: ToastType = "warning") {
  if (lastMsg === msg) return;
  ElMessage[type](msg);
  lastMsg = msg;
  tostTimer && clearTimeout(tostTimer);
  tostTimer = setTimeout(() => {
    lastMsg = "";
    tostTimer = null;
  }, 300);
  return msg;
}

interface DefaultResDataMap {
  code: any;
  data: any;
  msg: any;
  successCode: any;
}

export const defaultResDataMap: DefaultResDataMap = {
  code: "code",
  data: "data",
  msg: "msg",
  successCode: 0,
};

/**
 * 获取处理之后的响应数据的结构
 * @param resData 响应数据
 * @param resMap 响应数据字段的映射关系
 * @returns 新的响应数据
 */
export function getResData(resData = {}, resMap = defaultResDataMap): CommonObj {
  if (!resMap) return resData;
  const { code, data, msg, successCode } = resMap;
  return { code: resData[code], data: resData[data], msg: resData[msg], successCode };
}

/**
 * 前往登录页
 */
export function goLogin() {
  const { pathname, search } = location;
  const redirectTo = `${pathname}${search}`; // 解码用 decodeURIComponent
  location.href = `/login?redirectTo=${encodeURIComponent(redirectTo)}`;
}
