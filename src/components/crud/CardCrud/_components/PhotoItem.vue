<!-- 组件 - 资料巡查 -->
<template>
  <div class="photo-item f-fs-s-c" :class="{ passed: status === 0, rejected: status === 1 }">
    <BarsImg :src="row.url" :topBar="topBar" class="img" sizeType="default" :bottomBar="row.status === 1 ? row.reason : ''" />
    <div class="foot-box f-c-c-c f-0">
      <BaseCopy class="mb-q" :text="row.userId" />
      <BaseBtn :name="btn" round size="small" @click="() => emits('groupBtn', btn)" v-for="(btn, ind) in groupBtns" :key="ind" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, unref, nextTick, inject } from "vue";
import { CommonObj } from "@/vite-env";
import { BtnItem } from "@/components/BaseBtn";
import BarsImg from "@/components/BarsImg.vue";
import { AuditStatus } from "../Index.vue";
import { useDictMap } from "@/hooks";
const { getMap } = useDictMap();
const props = withDefaults(
  defineProps<{
    row?: CommonObj;
    groupBtns?: BtnItem[];
    status?: AuditStatus;
  }>(),
  {
    row: () => ({}),
    groupBtns: () => [],
  }
);
const topBar = computed(() => {
  const status = props.row.status;
  if (status === 1) {
    const obj: CommonObj = getMap("AuditStatus")[status];
    obj.text = "已驳回";
    obj.attrs.type = "warning";
    return obj;
  } else {
    return undefined;
  }
});
const emits = defineEmits(["groupBtn"]);
//是否出现了滚动条
const hasScroll = ref(false);
const descRef = ref();
nextTick(() => {
  getShowScroll();
});
function getShowScroll() {
  const { scrollHeight, clientHeight } = descRef?.value || {};
  hasScroll.value = scrollHeight > clientHeight;
}
</script>
<style lang="scss" scoped>
.photo-item {
  $size: 160px;
  margin-top: $gap;
  transition: all 0.85s;
  background: #fff;
  border-radius: $radius-main;
  overflow: hidden;
  @include shadow-main();
  &.passed {
    // visibility: hidden;
    // opacity: 0;
  }
  &.rejected {
    // filter: grayscale(1);
  }
  .img {
    height: $size;
    width: $size;
  }
}
.foot-box {
  padding: $gap-qtr 0;
}
</style>
