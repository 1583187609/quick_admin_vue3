<!-- 语音播放组件面板 -->
<template>
  <div class="video-pannel f-sb-c">
    <el-icon size="20" class="f-0">
      <ElemeFilled />
    </el-icon>
    <time class="f-0 ml-h">00:00/02:23</time>
    <el-slider class="f-1 ml-o mr-h" />
    <el-icon size="20" class="f-0">
      <ElemeFilled />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj } from "@/vite-env";
import { ElemeFilled } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
</script>
<style lang="scss" scoped>
.video-pannel {
  width: 400px;
  border-radius: 40px;
  height: 28px;
  padding: 0 12px;
  background: #eee;
}
</style>
