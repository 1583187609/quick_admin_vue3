<template>
  <div class="img-item f-c-c-c">
    <BaseImg class="mb-q" />
    <el-button
      :type="rejected ? 'success' : 'primary'"
      style="width: 5em"
      size="small"
      @click="emits('click', rejected)"
      :plain="rejected"
    >
      {{ rejected ? "取消驳回" : "驳回" }}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const props = withDefaults(
  defineProps<{
    src?: string;
    rejected?: boolean; //是否已驳回
  }>(),
  {
    rejected: false,
  }
);
const emits = defineEmits(["click"]);
</script>
<style lang="scss" scoped>
.img-item {
  margin-top: $gap-qtr;
  &:not(:last-child) {
    margin-right: $gap-half;
  }
}
</style>
