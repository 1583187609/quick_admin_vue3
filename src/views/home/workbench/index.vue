<!-- 页面-简介 -->
<template>
  <div class="page-view">
    <div class="f-sb-c pannels">
      <DataPannel class="f-1 item" v-for="(item, ind) in pannels" :key="ind" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import DataPannel from "./_components/DataPannel.vue";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const pannels = ref([{}, {}, {}, {}]);
</script>
<style lang="scss" scoped>
.pannels {
  .item {
    &:not(:last-child) {
      margin-right: $gap;
    }
  }
}
</style>
