/********************************************************
 ***** 平台内部方法(仅限脱单计划平台使用的方法) *****
 ********************************************************/

import { CommonObj } from "@/vite-env";
import { typeOf, emptyTime, storage, isProd } from "@/utils";
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

/**
 * 处理时间：后端的时间为 1000-01-01 00:00:00 时，实际上是空值
 * @tips 提取出来是为了方便后续集中处理，可能还有其他处理操作，或更简便的处理方式
 */
export function handleDateTime(row: CommonObj, key: string) {
  return row[key] === emptyTime ? "-" : row[key];
}

/**
 * 计算src/views下开发的有效页面
 * @return
 */
export function getDevelopPages() {
  const pages = import.meta.glob("@/views/**/*.vue");
  const allNames = Object.keys(pages);
  const unValidNames: string[] = []; //无效页面
  //有效页面
  const valideNames = allNames.filter((key: string) => {
    if (key.includes(" ")) unValidNames.push(key);
    return !key.includes("/_") && !key.includes(" ");
  });
  return {
    valideNames,
    unValidNames,
  };
}
