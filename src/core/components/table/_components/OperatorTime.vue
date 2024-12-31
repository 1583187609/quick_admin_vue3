<!-- 操作人/操作时间 -->
<template>
  <template v-if="typeOf(newProp) === 'Array'">
    <div>{{ renderValue(data[newProp[0]]) }}</div>
    <div>{{ getTimeStr(renderValue(data[newProp[1]])) }}</div>
  </template>
  <template v-else>{{ getTimeStr(renderValue(data[newProp])) }}</template>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/types";
import { emptyStr, propsJoinChar, renderValue, typeOf } from "@/core/utils";
import dayjs from "dayjs";
const props = withDefaults(
  defineProps<{
    prop: string | [string, string];
    data: CommonObj;
    format?: string;
  }>(),
  {}
);
const newProp = computed<string | [string | string]>(() => {
  const { prop } = props;
  return prop.includes(propsJoinChar) ? prop.split(propsJoinChar) : prop;
});
function getTimeStr(time: any) {
  if (time === emptyStr) return time;
  const { format } = props;
  return format ? dayjs(time).format(format) : time;
}
</script>
<style lang="scss" scoped></style>
