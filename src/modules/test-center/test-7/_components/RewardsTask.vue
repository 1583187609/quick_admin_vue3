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
    <SectionForm v-model="modelData" :sections="sections" class="rewards-task f-1"></SectionForm>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { SectionFormItem } from "@/core/components/form/_types";
import { FormField } from "@/core/components/form/_types";
import { CommonObj } from "@/core/_types";

const modelData = reactive<CommonObj>({
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
const addDelChildrenFields: FormField[] = [
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
    attrs: {
      options: "D_TaskRewards",
    },
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
    attrs: {
      options: "D_GetRewardWay",
    },
  },
];
//如果在SectionFormItem中添加 prop 属性，则提交时的数据会包裹在对应的prop名称下
const sections: SectionFormItem[] = [
  {
    // prop: "kpi_1",
    title: "KPI1 - 提升自己",
    fields: [
      {
        prop: "wszl",
        label: "完善资料",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "scszzp",
        label: "上传3张照片",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "scyyjs",
        label: "上传语音介绍",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "bcxqah",
        label: "补充兴趣爱好",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "bclxx",
        label: "补充理想型",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "wcsfrz",
        label: "完成身份认证",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
    ],
  },
  {
    // prop: "kpi_2",
    title: "KPI2 - 结识新朋友",
    fields: [
      {
        prop: "jsycsfk",
        label: "解锁一次身份卡",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "fsyccjxh",
        label: "发送一次超级喜欢",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "dcycxhxh",
        label: "达成一次相互喜欢",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
    ],
  },
  {
    // prop: "kpi_3",
    title: "KPI3 - 探索新功能",
    fields: [
      {
        prop: "bc",
        label: "补充[颜值描述]",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "sdqjsyckp",
        label: "单身圈解锁一次卡片",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "dsqoyywlx",
        label: "单身圈偶遇一位老乡",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "dsqoyywxy",
        label: "单身圈偶遇一位校友",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
    ],
  },
  {
    // prop: "kpi_4",
    title: "KPI4 - 加速脱单",
    fields: [
      {
        prop: "gzgzh",
        label: "关注公众号",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
      {
        prop: "bdsjh",
        label: "绑定手机号",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
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
