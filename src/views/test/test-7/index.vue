<!-- 文件说明-模板文件 -->
<template>
  <div class="page-view four f-fs-s-c">
    <el-tabs class="f-0" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-bind="tItem" v-for="(tItem, tInd) in tabs" :key="tInd"></el-tab-pane>
    </el-tabs>
    <!-- 下面这样是为了避免加载时一次性加载所有组件，并请求所有接口 -->
    <RewardsTask class="wrap f-1" v-if="activeName === 'rewards-task'" />
    <RealnameWhiteList class="wrap f-1" v-else-if="activeName === 'realname-white-list'" />
    <CompanyAuth class="wrap f-1" v-else-if="activeName === 'company-auth'" />
    <ShareUserRole class="wrap f-1" v-else-if="activeName === 'share-user-role'" />
    <HeartbeatRatio class="wrap f-1" v-else-if="activeName === 'heartbeat-ratio'" />
    <SectionHeartbeatRatio class="wrap f-1" v-else-if="activeName === 'section-heartbeat-ratio'" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, TabItem } from "@/vite-env";
import { TabsPaneContext } from "element-plus";
import RewardsTask from "./_components/RewardsTask.vue";
import RealnameWhiteList from "./_components/RealnameWhiteList.vue";
import CompanyAuth from "./_components/CompanyAuth.vue";
import ShareUserRole from "./_components/ShareUserRole.vue";
import HeartbeatRatio from "./_components/HeartbeatRatio.vue";
import SectionHeartbeatRatio from "./_components/SectionHeartbeatRatio.vue";

const activeName = ref<any>("share-user-role");

const tabs: TabItem[] = [
  { label: "奖励及任务配置", name: "rewards-task" },
  { label: "实名白名单配置", name: "realname-white-list" },
  { label: "公司认证审核员配置", name: "company-auth" },
  { label: "分享嘉宾角色配置", name: "share-user-role" },
  { label: "心动嘉宾比例配置", name: "heartbeat-ratio" },
  { label: "分块心动嘉宾比例配置", name: "section-heartbeat-ratio" },
];
function handleClick(tab: TabsPaneContext, event: Event) {
  activeName.value = tab.paneName;
}
</script>
<style lang="scss" scoped>
.wrap {
  overflow: auto;
}
</style>
