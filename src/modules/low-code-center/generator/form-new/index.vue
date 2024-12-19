<!-- 表单配置生成文件 -->
<template>
  <div class="f-sb-s">
    <FilePannel v-model="currFile" class="pannel f-0" style="width: 180px" />
    <PreviewPannel :data="fileData" class="pannel f-1" />
    <JsonPannel v-model="fileData" class="pannel f-0" :width="width" />
  </div>
</template>
<script lang="ts" setup>
import FilePannel from "./FilePannel.vue";
import PreviewPannel from "./PreviewPannel.vue";
import JsonPannel from "./JsonPannel.vue";
import { ref, watch } from "vue";
import { CommonObj } from "@/core/_types";
const width = "400px";
const currFile = ref("");
const fileData = ref<CommonObj>({});
watch(
  () => currFile.value,
  newVal => {
    if (!newVal) return;
    fileData.value = {};
  }
);
</script>
<style lang="scss" scoped>
.pannel {
  &:not(:last-child) {
    margin-right: $gap;
  }
}
</style>
