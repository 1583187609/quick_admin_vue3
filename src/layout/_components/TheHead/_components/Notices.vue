<!-- 页面-简介 -->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="通知(5)" name="first">
      <div class="list" v-if="true">
        <div class="item" v-for="(item, ind) in 5" :key="ind">
          <BaseImg class="icon" />
          <div class="content">
            <span class="title">这是通知（{{ ind + 1 }}）</span>
            <span class="time-ago">一分钟前</span>
          </div>
        </div>
      </div>
      <BaseEmpty v-else />
    </el-tab-pane>
    <el-tab-pane label="消息(0)" name="second">
      <div class="list" v-if="false">
        <div class="item" v-for="(item, ind) in 5" :key="ind">
          <BaseImg class="icon" />
          <div class="content">
            <span class="title">这是消息（{{ ind + 1 }}）</span>
            <span class="time-ago">一分钟前</span>
          </div>
        </div>
      </div>
      <BaseEmpty v-else />
    </el-tab-pane>
    <el-tab-pane label="待办(0)" name="third">
      <div class="list" v-if="false">
        <div class="item" v-for="(item, ind) in 5" :key="ind">
          <BaseImg class="icon" />
          <div class="content">
            <span class="title">这是待办（{{ ind + 1 }}）</span>
            <span class="time-ago">一分钟前</span>
          </div>
        </div>
      </div>
      <BaseEmpty v-else />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { Search } from "@element-plus/icons-vue";
import BaseEmpty from "@/core/BaseEmpty.vue";
// const props = withDefaults(
//   defineProps<{
//     exampleProp?: CommonObj;
//   }>(),
//   {
//     exampleProp: () => ({}),
//   }
// );
const activeName = ref("first");
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    &:last-child {
      border: none;
    }
    .icon {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }
    .content {
      display: flex;
      flex-direction: column;
      .title {
        margin-bottom: 5px;
      }
      .time-ago {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
