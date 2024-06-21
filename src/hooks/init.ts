import {
  // GetV2DistrictJsonData,
  // GetAdminIndustryJobTree,
  PostUserList,
} from "@/api-mock";
import { storage, typeOf, debounce, printLog } from "@/utils";
import pkg from "#/package.json";
import { useDictStore } from "@/store";
import { CommonObj, OptionItem } from "@/vite-env";

const { version } = pkg;
//页面加载时的初始化操作
let isFirst = true;
export default () => {
  //监测是否是最新版本
  function isLatestVersion() {
    const lastVer = storage.getItem("lastVersion");
    if (lastVer) {
      const isLatest = lastVer === version;
      !isLatest && storage.setItem("lastVersion", version);
      return isLatest;
    } else {
      storage.setItem("lastVersion", version);
      return true;
    }
  }
  //更新数据
  function updateData() {
    console.log("监测到版本更新，已自动同步本地all-tags数据");
  }
  //轮询更新localStorage中的allTags
  function cycleUpdateTags(gapSconds = 10 * 1000) {
    if (isFirst) {
      isFirst = false;
      !isLatestVersion() && updateData();
      cycleUpdateTags(gapSconds);
      // console.log("轮询监测版本是否更新-----------");
    } else {
      setInterval(() => {
        !isLatestVersion() && updateData();
        // console.log("轮询监测版本是否更新-----------");
      }, gapSconds);
    }
  }
  // fetchRegionOpts();
  // fetchIndustryOpts();
  cycleUpdateTags();
};
