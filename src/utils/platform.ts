/********************************************************
 ***** 平台内部方法(仅限脱单计划平台使用的方法) *****
 ********************************************************/

import { CommonObj } from "@/core/_types";
import { typeOf } from "@/utils";
import dayjs from "dayjs";

// 获取认证方式
export function getAuthWaysFromObj(item: CommonObj) {
  const ways: number[] = [];
  const map: CommonObj = {
    // isSupportContract: 0,
    // isSupportPerson: 0,
    isSupportCpyWeChat: 2,
    isSupportDingTalk: 4,
    isSupportEmail: 0,
    isSupportFeiShu: 3,
    isSupportWorkCard: 1,
  };
  for (const key in map) {
    if (item[key]) {
      ways.push(map[key]);
    }
  }
  return ways;
}

//到期时间倒计时字符串
export function getCountDownTimeStr(time: string) {
  const diff = dayjs(time).diff() / 1000;
  const d = Math.floor(diff / (60 * 60 * 24));
  const h = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
  const m = Math.floor((diff % (60 * 60)) / 60);
  const text = `${d > 0 ? d + "天" : ""}${h > 0 ? h + "小时" : ""}${m > 0 ? m + "分钟" : ""}`;
  const type = d >= 1 ? "success" : "danger";
  return { text, type };
}

//处理地区传值，只传最后一级，而不是传一个数组
export function handleRegionParams(args: CommonObj, keys: string[]) {
  keys?.forEach(key => {
    if (typeOf(args[key]) === "Array") {
      args[key] = args[key].slice(-1)[0];
    }
  });
  return args;
}
