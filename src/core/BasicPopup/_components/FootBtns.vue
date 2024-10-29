<!-- 底部按钮 -->
<template>
  <div class="foot-btns">
    <template v-if="type === 'confirm'">
      <el-button v-debounce.immediate="() => $emit('cancel')">取消</el-button>
      <el-button type="primary" v-debounce.immediate="() => $emit('confirm')">确认</el-button>
    </template>
    <el-button type="primary" v-debounce.immediate="() => $emit('confirm')" v-else-if="type === 'alert'">我知道了</el-button>
    <template v-else>{{ throwTplError(`暂未处理此类型：${type}`) }}</template>
  </div>
</template>
<script lang="ts" setup>
import { throwTplError } from "@/utils";

export type FootBtnsType = "confirm" | "alert";
const props = withDefaults(
  defineProps<{
    type?: FootBtnsType;
  }>(),
  {
    type: "confirm",
  }
);

const $emit = defineEmits(["confirm", "cancel"]);
</script>
