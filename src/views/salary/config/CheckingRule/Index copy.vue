<!-- 组件-考勤规则 -->
<template>
  <el-collapse accordion>
    <el-collapse-item :name="item.name" v-for="(item, ind) in list" :key="ind">
      <template #title>
        {{ item.title }}
        <el-button class="ml-h" v-bind="btnMap[item.hasSeted ? 'hasSet' : 'noSet'].attrs" size="small">{{
          btnMap[item.hasSeted ? "hasSet" : "noSet"].text
        }}</el-button>
      </template>
      <div>
        Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the
        users are used to;
      </div>
      <div>
        Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of
        elements, etc.
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const btnMap: CommonObj = {
  hasSet: {
    text: "已设置",
    attrs: {
      type: "info",
    },
  },
  noSet: {
    text: "未设置",
    attrs: {
      type: "warning",
    },
  },
};
const list: CommonObj[] = [
  {
    name: "1",
    title: "旷工扣款规则",
    hasSeted: false,
  },
  {
    name: "2",
    title: "加班工资规则",
    hasSeted: true,
  },
  {
    name: "3",
    title: "请假扣款规则",
    hasSeted: true,
  },
  {
    name: "4",
    title: "迟到、早退扣款规则",
    hasSeted: false,
  },
  {
    name: "5",
    title: "全勤奖规则",
    hasSeted: false,
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
