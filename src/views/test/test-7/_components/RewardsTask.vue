<!-- 组件 - 奖励及其任务 -->
<template>
  <div class="f-fs-s-c" style="height: 100%">
    <div class="kpi-head f-fs-c f-0">
      <div class="item">任务名称</div>
      <div class="item">状态</div>
      <div class="item">奖励类型</div>
      <div class="item">奖励明细</div>
      <div class="item">领取方式</div>
    </div>
    <SectionForm :sections="sections" v-model="model" class="rewards-task f-1"></SectionForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import SectionForm from "@/components/form/SectionForm.vue";
import { SectionFormItem } from "@/components/form";
import { FormField } from "@/components/form";
import { CommonObj } from "@/vite-env";

const model = reactive<CommonObj>({
  //kpi-1
  // wszl: { zt: 0, jllx: 1, jlmx: 10, lqfs: 1 },
  scszzp: { zt: 0, jllx: 2, jlmx: 20, lqfs: 2 },
  scyyjs: { zt: 0, jllx: 1, jlmx: 30, lqfs: 1 },
  bcxqah: { zt: 0, jllx: 2, jlmx: 40, lqfs: 2 },
  bclxx: { zt: 0, jllx: 1, jlmx: 50, lqfs: 1 },
  wcsfrz: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  //kpi-2
  jsycsfk: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  fsyccjxh: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  dcycxhxh: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  //kpi-3
  bc: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  sdqjsyckp: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  dsqoyywlx: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  dsqoyywxy: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  //kpi-4
  gzgzh: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
  bdsjh: { zt: 0, jllx: 2, jlmx: 60, lqfs: 2 },
});
const childrenFields: FormField[] = [
  {
    prop: "zt",
    label: "状态",
    type: "switch",
    // required: true,
  },
  {
    prop: "jllx",
    label: "奖励类型",
    // required: true,
    type: "select",
    options: "TaskRewards",
  },
  {
    prop: "jlmx",
    label: "奖励明细",
    type: "input-number",
    required: true,
    attrs: {
      min: 0,
    },
  },
  {
    prop: "lqfs",
    label: "领取方式",
    type: "radio-group",
    required: true,
    options: "GetRewardWay",
  },
];
//如果在SectionFormItem中添加 prop 属性，则提交时的数据会包裹在对应的prop名称下
const sections: SectionFormItem[] = [
  {
    // prop: "kpi_1",
    title: "KPI1 - 提升自己",
    fields: [
      { prop: "wszl", label: "完善资料", children: childrenFields },
      { prop: "scszzp", label: "上传3张照片", children: childrenFields },
      { prop: "scyyjs", label: "上传语音介绍", children: childrenFields },
      { prop: "bcxqah", label: "补充兴趣爱好", children: childrenFields },
      { prop: "bclxx", label: "补充理想型", children: childrenFields },
      { prop: "wcsfrz", label: "完成身份认证", children: childrenFields },
    ],
  },
  {
    // prop: "kpi_2",
    title: "KPI2 - 结识新朋友",
    fields: [
      { prop: "jsycsfk", label: "解锁一次身份卡", children: childrenFields },
      { prop: "fsyccjxh", label: "发送一次超级喜欢", children: childrenFields },
      { prop: "dcycxhxh", label: "达成一次相互喜欢", children: childrenFields },
    ],
  },
  {
    // prop: "kpi_3",
    title: "KPI3 - 探索新功能",
    fields: [
      { prop: "bc", label: "补充[颜值描述]", children: childrenFields },
      {
        prop: "sdqjsyckp",
        label: "单身圈解锁一次卡片",
        children: childrenFields,
      },
      {
        prop: "dsqoyywlx",
        label: "单身圈偶遇一位老乡",
        children: childrenFields,
      },
      {
        prop: "dsqoyywxy",
        label: "单身圈偶遇一位校友",
        children: childrenFields,
      },
    ],
  },
  {
    // prop: "kpi_4",
    title: "KPI4 - 加速脱单",
    fields: [
      { prop: "gzgzh", label: "关注公众号", children: childrenFields },
      { prop: "bdsjh", label: "绑定手机号", children: childrenFields },
    ],
  },
];
</script>
<style lang="scss" scoped>
.kpi-head {
  padding-bottom: $gap-half;
  .item {
    font-weight: 600;
    color: $color-text-light;
    text-align: center;
    &:nth-child(1) {
      width: 10em;
      text-align: right;
    }
    &:nth-child(2) {
      width: 7.5em;
    }
    &:nth-child(3) {
      width: 15em;
    }
    &:nth-child(4) {
      width: 12em;
    }
    &:nth-child(5) {
      width: 9em;
    }
  }
}
.kpi-item {
  &:not(:last-child) {
    margin-bottom: $gap-half;
  }
}
.rewards-task {
  overflow: auto;
  width: 750px;
}
</style>
