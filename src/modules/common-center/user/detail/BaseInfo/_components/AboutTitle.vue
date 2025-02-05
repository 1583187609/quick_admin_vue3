<!-- 关于我/我的理想型 -->
<template>
  <div class="about-title f-sb-c">
    <div class="right f-fs-c">
      <div class="item">提交：<el-button @click="$emit('submit', type)" style="min-width: 2em" ype="primary" size="small" text>1</el-button></div>
      <div class="item">驳回：<b class="red">0</b></div>
      <div class="item">
        当前状态：<b :class="rejected ? 'red' : 'green'">{{ rejected ? "已驳回" : "正常" }}</b>
      </div>
    </div>
    <el-button style="width: 5em" type="primary" size="small" class="ml-a" :plain="rejected">{{ rejected ? "取消驳回" : "驳回" }}</el-button>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { ref, reactive, watch, computed } from "vue";
export type AboutType = "me" | "you";
const props = withDefaults(
  defineProps<{
    type?: AboutType;
    rejected?: boolean;
  }>(),
  {
    type: "me",
  }
);
const $emit = defineEmits(["submit"]);
</script>
<style lang="scss" scoped>
.about-title {
  flex: 1;
  padding: 0 $gap-half;
  background: $color-bg-light;
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
