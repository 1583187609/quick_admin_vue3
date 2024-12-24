<template>
  <div class="avatar-item" :class="{ passed, rejected }">
    <div class="top-box" :class="[true ? 'f-sb-s' : 'none']">
      <div class="mask f-c-c" v-if="showMask">
        <div class="inner f-c-c" :class="{ passed, rejected }">
          {{ passed ? "已通过" : rejected ? "已驳回" : "" }}
        </div>
      </div>
      <TagImg :bottomTag="status === 1 ? row.reason : ''" width="200" height="200" :src="row.src" class="avatar f-0" />
      <div class="info f-1">
        <div @click="$router.push({ name: 'systemUserDetail', query: { id: row.userId } })" class="nickname q-line-2 row">
          {{ row.nickname || "-" }}
        </div>
        <BaseCopy class="row">{{ row.userId }}</BaseCopy>
        <div class="f-fs-c row">
          <span class="mr-h">{{ row.age ?? "-" }}岁</span>
          <BaseTag name="D_Gender" :value="row.gender" pure-text />
        </div>
        <div class="row">
          上传：<b :class="{ 'color-success': row.uploadNum }">{{ row.uploadNum ?? "-" }}</b>
        </div>
        <div class="row">
          驳回：<b :class="{ 'color-danger': row.rejectNum }">{{ row.rejectNum ?? "-" }}</b>
        </div>
        <div class="time-age row">
          {{ getTimeAgo(row.avatarData?.update_time) || "-" }}
        </div>
      </div>
    </div>
    <div class="foot-box f-c-c">
      <BaseBtn
        :tpl="btn"
        round
        size="small"
        :disabled="isPatrol ? false : status !== 2"
        @click="() => $emit('operateBtns', btn)"
        v-for="(btn, ind) in operateBtns"
        :key="ind"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { getTimeAgo } from "@/core/utils";
import { CommonObj } from "@/core/_types";
import { OperateBtnsType } from "@/core/components/table/_components/GroupBtns.vue";
import { AuditStatus } from "../Index.vue";
import TagImg from "@/core/img/TagImg.vue";
import { operateBtnsEmitName } from "@/core/components/table";

const props = withDefaults(
  defineProps<{
    row: CommonObj;
    withMask?: boolean; //是否要用mask遮罩层来区分
    status?: AuditStatus;
    isPatrol?: boolean; //是否是巡查
    operateBtns?: OperateBtnsType;
  }>(),
  {
    row: () => ({
      age: 0,
      userId: "",
      gender: 0,
      nickname: "",
      uploadNum: 0,
      rejectNum: 0,
      create_time: 0,
      update_time: 0,
      avatarData: () => {},
    }),
    operateBtns: () => [],
  }
);
const $emit = defineEmits([operateBtnsEmitName]);
const passed = computed(() => !props.isPatrol && props.status === 0);
const rejected = computed(() => !props.isPatrol && props.status === 1);
const showMask = computed(() => props.withMask && (passed.value || rejected.value));
</script>
<style lang="scss" scoped>
$size: 200px;
.avatar-item {
  position: relative;
  min-width: 310px;
  max-width: 350px;
  margin-bottom: $gap-qtr;
  // height: 33.33%;
  width: calc(20% - $gap-half);
  transition: all 0.85s;
  &.passed {
    // visibility: hidden;
    // opacity: 0;
  }
  &.rejected {
    // filter: grayscale(1);
    // &:hover {
    //   filter: none;
    // }
  }
  &:hover {
    .mask {
      opacity: 0;
      pointer-events: none;
    }
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    border-radius: $radius-main;
    background: rgba(#000, 0.5);
    transition: opacity 0.85s;
    .inner {
      border-radius: 50%;
      height: 100px;
      width: 100px;
      font-size: 16px;
      &.passed {
        color: $color-success;
        border: 2px dashed $color-success;
        background: rgba($color-success, 0.25);
      }
      &.rejected {
        color: $color-danger;
        border: 2px dashed $color-danger;
        background: rgba($color-danger, 0.25);
      }
    }
  }
  .top-box {
    height: $size;
    overflow: hidden;
    border-radius: $radius-main;
    background: #fff;
    @include shadow-main();
    &.none {
      background: transparent;
    }
  }
  .avatar {
    height: $size;
    width: $size;
    border-radius: 0;
  }
  .info {
    font-size: 13px;
    padding: $gap-qtr $gap-half;
    .row {
      &:not(:last-child) {
        margin-bottom: $gap-half;
      }
    }
    .nickname {
      cursor: pointer;
      margin-top: $gap-half;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
    .time-age {
      color: $color-text-light;
      font-size: 12px;
    }
  }
  .foot-box {
    height: 36px;
  }
}
</style>
