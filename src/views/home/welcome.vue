<!-- 欢迎页 -->
<template>
  <div class="home f-c-c-c">
    <div class="welcome">{{ timeAlias }}好，{{ userInfo?._title }}</div>
    <BaseEmpty description=" " :size="200"></BaseEmpty>
    <el-button :icon="Top" type="primary" @click="router.push('/workbench')">前往工作台</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getUserInfo } from "@/utils";
import { useRouter } from "vue-router";
import { Top } from "@element-plus/icons-vue";
const router = useRouter();
const userInfo = getUserInfo();
function getTimePeriodAlias() {
  const hours = new Date().getHours();
  let alias = "";
  if (hours < 2) {
    alias = "凌晨";
  } else if (hours < 8) {
    alias = "清晨";
  } else if (hours < 11) {
    alias = "上午";
  } else if (hours < 13) {
    alias = "中午";
  } else if (hours < 18) {
    alias = "下午";
  } else if (hours < 20) {
    alias = "傍晚";
  } else if (hours < 23) {
    alias = "晚上";
  } else {
    alias = "深夜";
  }
  return alias;
}
const timeAlias = ref(getTimePeriodAlias());
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
.welcome {
  font-size: 24px;
  font-weight: 500;
}
</style>
