<!-- 互动信息 -->
<template>
  <BaseSection class="inter-statistics" title="互动统计">
    <template #right>
      <div>注册时间：3天</div>
    </template>
    <div class="group f-fs-fs-w">
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">表态</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">10%</strong>
        <div class="key">发出喜欢率</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">达成好友</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">单身圈查看</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">发出喜欢</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">发出超级喜欢</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">10%</strong>
        <div class="key">喜欢回应率</div>
      </div>
    </div>
    <div class="group f-fs-fs-w">
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">曝光</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">10%</strong>
        <div class="key">喜欢率</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">被喜欢</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">100</strong>
        <div class="key">被超级喜欢</div>
      </div>
      <div class="key-val f-c-c-c">
        <strong class="val">10%</strong>
        <div class="key">被喜欢回应率</div>
      </div>
    </div>
  </BaseSection>
  <BaseSection class="notice-back" title="通知召回">
    <div class="group">
      <div class="title">服务号</div>
      <div>
        <el-tag>已关注</el-tag>
        <el-tag>未关注</el-tag>
        <el-tag>取消关注</el-tag>
      </div>
    </div>
    <div class="group">
      <div class="title">订阅通知</div>
      <div class="f-fs-c item">
        <strong class="label">超级喜欢提醒</strong>
        <el-tag>未订阅</el-tag>
        <el-tag>已订阅(0)</el-tag>
        <el-tag>总是允许</el-tag>
      </div>
      <div class="f-fs-c item">
        <strong class="label">相互喜欢提醒</strong>
        <el-tag>未订阅</el-tag>
        <el-tag>已订阅(0)</el-tag>
        <el-tag>总是允许</el-tag>
      </div>
      <div class="f-fs-c item">
        <strong class="label">新活动提醒</strong>
        <el-tag>未订阅</el-tag>
        <el-tag>已订阅(0)</el-tag>
        <el-tag>总是允许</el-tag>
      </div>
    </div>
  </BaseSection>
  <div>
    <el-button @click="openPopup('峡谷先锋的好友关系（10）', AttitudeList)" type="primary"> 打开好有关系列表弹窗 </el-button>
    <el-button @click="openPopup('峡谷先锋的表态（22）', FriendsList)" type="primary">打开表态列表弹窗</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import AttitudeList from "./_components/AttitudeList.vue";
import FriendsList from "./_components/FriendsList.vue";
import { CommonObj } from "@/vite-env";
const openPopup: any = inject("openPopup");

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
</script>
<style lang="scss" scoped>
.base-section {
  &:not(:last-child) {
    margin-bottom: $gap-half;
  }
}

.inter-statistics {
  .group {
    padding: $gap 0;

    &:not(:last-child) {
      border-bottom: $border-main;
    }
  }

  .key-val {
    &:not(:last-child) {
      margin-right: $gap-two;
    }

    .key {
      color: $color-text-light;
      font-size: $font-size-light;
    }

    .val {
      font-size: 20px;
    }
  }
}

.notice-back {
  .group {
    &:not(:last-child) {
      margin-bottom: $gap;
    }

    .title {
      margin-bottom: $gap-qtr;
      font-weight: 600;
    }
  }

  .item {
    &:not(:last-child) {
      margin-bottom: $gap-qtr;
    }

    .label {
      width: 6em;
      margin-right: $gap-half;
      text-align: right;
      font-size: $font-size-light;
    }
  }

  .el-tag {
    &:not(:last-child) {
      margin-right: $gap-half;
    }
  }
}
</style>
