<!-- 组件-考勤规则 -->
<template>
  <SectionForm v-model="model" :sections="sections">
    <template #kkbllx="{ form }">
      <CutRatioiTypes />
    </template>
    <template #jlbllx="{ form }">
      <CutRatioiTypes />
    </template>
    <template #right-2>
      <el-button type="primary" size="small">添加</el-button>
    </template>
    <template #jjrbl="{ form }">
      <HolidaysRatio />
    </template>
    <template #right-3>
      <el-button type="primary" size="small">添加</el-button>
    </template>
    <template #qjkkbl="{ form }">
      <CutRatioiTypes stagework />
    </template>
    <template #right-4>
      <el-button type="primary" size="small">添加</el-button>
    </template>
    <template #cd="{ form }">
      <TimeTable />
    </template>
    <template #zt="{ form }">
      <TimeTable />
    </template>
    <template #qqjsfqy="{ form }">
      <FullRule v-model="form.qqjsfqy" />
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";
import CutRatioiTypes from "./_components/CutRatioiTypes.vue";
import HolidaysRatio from "./_components/HolidaysRatio.vue";
import SectionForm from "@/components/form/SectionForm.vue";
import { SectionFormItemAttrs } from "@/components/form";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import TimeTable from "./_components/TimeTable.vue";
import FullRule from "./_components/FullRule.vue";
let model = reactive({ kkbllx: { type: 1, val: "" }, qqjsfqy: { kg: 1 } });
const sections: SectionFormItemAttrs[] = [
  {
    title: "月标准计薪天数",
    hasSeted: false,
    fields: [
      {
        prop: "gzsj",
        label: "工作时间",
        attrs: {
          slots: {
            prepend: "下拉选择项",
            // prepend: {
            // type: "select",
            // options: [
            //   { label: "工作日", value: 1 },
            //   { label: "排班", value: 2 },
            //   { label: "自然天", value: 3 },
            // ],
            // },
            append: "小时/天",
          },
        },
      },
    ],
  },
  {
    title: "旷工扣款规则",
    hasSeted: false,
    fields: [
      {
        prop: "kkbl",
        label: "扣款比例",
        type: "input-number",
        attrs: { min: 0, max: 100 },
        after: "%",
      },
      {
        prop: "kkbllx",
        label: "扣款比例类型",
        type: "custom",
      },
      {
        prop: "bz",
        label: "备注",
        attrs: {
          type: "textarea",
        },
      },
    ],
  },
  {
    title: "加班工资规则",
    hasSeted: true,
    fields: [
      {
        prop: "gzrbl",
        label: "工作日比例",
        type: "input-number",
        attrs: { style: "width: 200px", min: 0, max: 100 },
        span: 12,
        after: "%",
      },
      {
        prop: "xxrbl",
        label: "休息日比例",
        span: 12,
        type: "input-number",
        attrs: { style: "width: 200px", min: 0, max: 100 },
      },
      {
        prop: "jjrbl",
        label: "节假日比例",
        type: "custom",
      },
      {
        prop: "jlbllx",
        label: "奖励比例类型",
        type: "custom",
      },
      {
        prop: "bz",
        label: "备注",
        attrs: {
          type: "textarea",
        },
      },
    ],
  },
  {
    title: "请假扣款规则",
    hasSeted: true,
    fields: [
      {
        prop: "qjlx",
        label: "请假类型",
        type: "select",
      },
      {
        prop: "qjkkbl",
        label: "扣款比例",
        type: "custom",
        tips: "不支持非考勤周期内的调薪，例如上月请假一天，不计入本月调整",
      },
      {
        prop: "qjbz",
        label: "备注",
        attrs: {
          type: "textarea",
        },
      },
    ],
  },
  {
    title: "迟到、早退扣款规则",
    hasSeted: false,
    fields: [
      { prop: "tjfs", label: "统计方式", type: "select", span: 8 },
      { prop: "sfhb", label: "是否合并", type: "switch", span: 4 },
      { prop: "sflj", label: "是否累计", type: "switch", span: 4 },
      { prop: "cd", label: "迟到", type: "custom" },
      { prop: "zt", label: "早退", type: "custom" },
    ],
  },
  {
    title: "全勤奖规则",
    hasSeted: false,
    fields: [
      {
        prop: "qqj",
        label: "全勤奖",
        after: "元",
      },
      {
        prop: "qqjsfqy",
        label: "全勤奖",
        type: "custom",
        // type: "switch",
        // tips: "发生以下情况之一，不发放全勤奖",
      },
    ],
  },
];
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
