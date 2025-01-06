<!-- 操作人/操作时间 -->
<template>
  <div>{{ renderValue(data[userProp]) }}</div>
  <div>{{ getTimeStr(renderValue(data[timeProp])) }}</div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/types";
import { emptyStr, renderValue } from "@/core/utils";
import dayjs from "dayjs";
const props = withDefaults(
  defineProps<{
    prop: string;
    data: CommonObj;
    userProp?: string; // 用户属性名称
    timeProp?: string; // 时间属性名称
    format?: string; // 时间格式化
  }>(),
  {
    timeProp: _props => _props.prop,
  }
);
function getTimeStr(time: any) {
  if (time === emptyStr) return time;
  const { format } = props;
  return format ? dayjs(time).format(format) : time;
}
</script>
<style lang="scss" scoped></style>
