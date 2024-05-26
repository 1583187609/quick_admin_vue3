<!-- 关于我/我的理想型 -->
<template>
  <div class="about-title f-sb-c">
    <strong class="mr-h">{{ titleMap[type] }}</strong>
    <el-button style="margin-right: auto; width: 5em" type="primary" size="small" :plain="rejected">{{
      rejected ? "取消驳回" : "驳回"
    }}</el-button>
    <div class="right f-fs-c">
      <div class="item">提交：<b class="blue">1</b></div>
      <div class="item">驳回：<b class="red">0</b></div>
      <div class="item">
        当前状态：<b :class="rejected ? 'red' : 'green'">{{ rejected ? "已驳回" : "正常" }}</b>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/vite-env";
import { ref, reactive, watch, computed } from "vue";
export type AboutType = "me" | "you";
const titleMap: CommonObj = {
  me: "关于我",
  you: "我的理想型",
};
const props = withDefaults(
  defineProps<{
    type?: AboutType;
    rejected?: boolean;
  }>(),
  {
    type: "me",
  }
);
</script>
<style lang="scss" scoped>
.about-title {
}
.right {
  .item {
    font-size: 12px;
    &:not(:last-child) {
      margin-right: $gap;
    }
  }
}
.blue {
  color: blue;
}
.red {
  color: $color-danger;
}
.green {
  color: $color-success;
}
</style>
