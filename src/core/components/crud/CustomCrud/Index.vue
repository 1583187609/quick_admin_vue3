<!--  summary
  目标：基础增删改查的扩展，每一项元素的呈现样式可以自定义。
-->
<template>
  <BaseCrud class="custom-crud" :summaryList="summaryList" :pagination="!summaryList" ref="crudRef">
    <template #content="{ loading, params, rows, total, hasMore }">
      <LoadMore
        class="f-1"
        @reachBottom="handleReachBottom(params)"
        :paddingBottom="hasMore ? 0 : 250"
        :loading="loading"
        v-if="summaryList"
      >
        <slot name="list" :list="rows" :total="total" :hasMore="hasMore" />
      </LoadMore>
      <div class="list-box f-1" v-loading="loading" v-else>
        <slot name="list" :list="rows" :total="total" :hasMore="hasMore" />
      </div>
    </template>
  </BaseCrud>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import LoadMore from "@/core/components/LoadMore.vue";
import { SummaryListType } from "@/core/components/table/_types";
import { CommonObj } from "@/core/_types";
import { HandleButtonAuth } from "@/core/components/crud/BaseCrud/_types";
import { operateBtnsEmitName } from "@/core/components/table";

const props = withDefaults(
  defineProps<{
    summaryList?: SummaryListType; //汇总请求数据的 list
    handleAuth?: HandleButtonAuth;
  }>(),
  {}
);
const $emit = defineEmits(["update:modelValue", "extraBtns", operateBtnsEmitName, "selectionChange"]);
const crudRef = ref<any>(null);
/**
 * 刷新列表
 * @param cb function 预留的回调函数
 */
function handleReachBottom(params: CommonObj) {
  params.page = params.page + 1;
  crudRef.value.getList(params);
}
defineExpose({
  // ...crudRef.value
});
</script>
<style lang="scss" scoped>
.custom-crud {
  overflow: auto;
  .list-box {
    overflow: auto;
  }
}
</style>
