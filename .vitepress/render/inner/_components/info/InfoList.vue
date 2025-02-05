<!-- 面试题内容面板 -->
<template>
  <InfoSection v-for="(item, ind) in list" :key="ind" />
  <SetPanels />
</template>
<script lang="ts" setup>
import { GetMockCommon } from "@/api-mock";
import InfoSection from "./InfoSection.vue";
import SetPanels from "./SetPanels.vue";
const props = withDefaults(
  defineProps<{
    id: string | number;
  }>(),
  {}
);
const list = ref<CommonObj[]>([]);
GetMockCommon({ partId: props.id }).then(res => {
  list.value = res.records;
});
</script>
<style lang="scss" scoped>
.info-section {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
.set-panels {
  position: fixed;
  right: $gap;
  top: 70px;
}
</style>
