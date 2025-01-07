<template>
  <BasicSkins>
    <BasicPopup>
      <Suspense>
        <RouterView />
      </Suspense>
      <!-- 使用水印 -->
      <WaterMark :text="VITE_APP_NAME" v-if="showWaterMask" />
    </BasicPopup>
  </BasicSkins>
</template>
<script lang="ts" setup>
import BasicSkins from "@/core/components/BasicSkins/Index.vue";
import BasicPopup from "@/core/components/BasicPopup/Index.vue";
//后续添加的
import { ref, watch } from "vue";
import WaterMark from "@/core/components/WaterMark.vue";
import { useRoute } from "vue-router";

const { VITE_APP_NAME } = import.meta.env;
const route = useRoute();
const showWaterMask = ref(false);
watch(route, newVal => {
  showWaterMask.value = newVal.name !== "login";
});
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
//设置 nprogress 的背景色
#nprogress {
  .bar {
    background: $color-primary !important;
  }
  .peg {
    // box-shadow: 0 0 10px #00000000, 0 0 5px #00000000 !important;
    box-shadow: 0 0 10px #dd181800, 0 0 5px #c2282800 !important;
  }
}
// .driver-popover {}
.guide-popover-card {
  // .driver-popover-arrow {}
  // .driver-popover-title {}
  // .driver-popover-description {}
  .driver-popover-close-btn {
    font-size: 26px;
    line-height: 1;
  }
  //.driver-popover-footer {
  //}
  //.driver-popover-progress-text {
  //}
  //.driver-popover-prev-btn {
  //}
  //.driver-popover-next-btn {
  //  // background: $color-primary;
  //}
}
</style>
