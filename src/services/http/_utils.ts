import { ElLoading, ElMessage } from "element-plus";
import { CommonObj, SetTimeout } from "@/vite-env";
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
    }, 500);
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
