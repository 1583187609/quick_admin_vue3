<!-- 文件说明-模板文件 -->
<template>
  <div class="f-sb-s">
    <div class="f-1">
      <h3>编辑</h3>
      <BaseEditor v-model="htmlStr" />
    </div>
    <div class="right ml-t f-1">
      <h3>预览</h3>
      <div v-html="htmlStr"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const htmlStr = ref<string>("");
</script>
<style lang="scss" scoped></style>
