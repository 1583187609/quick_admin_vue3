<!-- 页面-基础配置 -->
<template>
  <div class="page-view four f-fs-s-c">
    <el-tabs class="f-0" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-bind="tItem" v-for="(tItem, tInd) in tabs" :key="tInd"></el-tab-pane>
    </el-tabs>
    <!-- 下面这样是为了避免加载时一次性加载所有组件，并请求所有接口 -->
    <Coin class="f-1" v-if="activeName === 'coin'" />
    <RewardsTask class="wrap f-1" v-else-if="activeName === 'rewards-task'" />
    <EducationAuth class="wrap f-1" v-else-if="activeName === 'education-auth'" />
    <RealnameWhiteList class="wrap f-1" v-else-if="activeName === 'realname-white-list'" />
    <CompanyAuth class="wrap f-1" v-else-if="activeName === 'company-auth'" />
    <ShareUserRole class="wrap f-1" v-else-if="activeName === 'share-user-role'" />
    <HeartbeatRatio class="wrap f-1" v-else-if="activeName === 'heartbeat-ratio'" />
    <DayLimit class="wrap f-1" v-else-if="activeName === 'day-limit'" />
    <ContentSecure class="wrap f-1" v-else-if="activeName === 'content-secure'" />
  </div>
</template>
<script lang="ts" name="TestFour" setup>
import { ref, reactive, watch, computed } from "vue";
import Coin from "./Coin.vue";
import RewardsTask from "./RewardsTask.vue";
import EducationAuth from "./EducationAuth.vue";
import RealnameWhiteList from "./RealnameWhiteList.vue";
import CompanyAuth from "./CompanyAuth.vue";
import ShareUserRole from "./ShareUserRole.vue";
import HeartbeatRatio from "./HeartbeatRatio.vue";
import DayLimit from "./DayLimit.vue";
import ContentSecure from "./ContentSecure.vue";
import { BtnName } from "@/components/BaseBtn";
import { CommonObj, FinallyNext, StrNum, TabItem } from "@/vite-env";
import { TabsPaneContext } from "element-plus";
const tabs: TabItem[] = [
  // { label: "代币配置", name: "coin" },
  { label: "奖励及任务配置", name: "rewards-task" },
  // { label: "学历认证配置", name: "education-auth" },
  { label: "实名白名单配置", name: "realname-white-list" },
  { label: "公司认证审核员配置", name: "company-auth" },
  { label: "分享嘉宾角色配置", name: "share-user-role" },
  { label: "心动嘉宾比例配置", name: "heartbeat-ratio" },
  // { label: "每日嘉宾额度配置", name: "day-limit" },
  // { label: "内容安全配置", name: "content-secure" },
];
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const activeName = ref<any>("rewards-task");
function handleClick(tab: TabsPaneContext, event: Event) {
  activeName.value = tab.paneName;
}
</script>
<style lang="scss" scoped>
.wrap {
  overflow: auto;
}
</style>
