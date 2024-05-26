<!-- 文件说明-模板文件 -->
<template>
  <div class="">模板7</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { GetMockTest } from "@/api-mock";
import { CommonObj } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
getList();
function getList() {
  GetMockTest().then((res: CommonObj) => {
    console.log(res, "res-test-list------------------");
  });
}
</script>
<style lang="scss" scoped></style>
