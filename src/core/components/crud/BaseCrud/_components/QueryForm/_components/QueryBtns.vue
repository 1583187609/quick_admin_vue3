<!-- 页面-简介 -->
<template>
  <el-col class="query-btns f-fe-fs ml-a">
    <el-button type="primary" :icon="Search" v-debounce.immediate="() => $emit('submit')" :disabled="loading" :loading="loading">
      {{ $t("base.button.search") }}
    </el-button>
    <el-button :icon="RefreshLeft" @click="$emit('reset')" :disabled="loading">{{ $t("base.button.reset") }}</el-button>
    <el-button @click="$emit('fold')" text type="primary" v-if="showFoldBtn">
      <template #icon>
        <el-icon class="icon-fold" :class="{ 'rotate-180': !isFold }">
          <ArrowDown />
        </el-icon>
      </template>
      {{ isFold ? $t("base.button.unfold") : $t("base.button.fold") }}
    </el-button>
  </el-col>
</template>
<script lang="ts" setup>
import { RefreshLeft } from "@element-plus/icons-vue";
import { Search, ArrowDown } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    isFold?: boolean;
    loading?: boolean;
    showFoldBtn?: boolean;
  }>(),
  {
    isFold: true,
  }
);
const $emit = defineEmits(["submit", "reset", "fold"]);
</script>
<style lang="scss">
.query-btns {
  display: flex;
  margin-bottom: var(--gap-half);
  .el-button {
    padding: 0 var(--gap-half);
    + .el-button {
      margin-left: var(--gap-half);
    }
  }
  // &.compact {
  //   .el-button {
  //     padding: 0 $gap-half;
  //   }
  // }
}
.icon-fold {
  transition: transform $transition-time-main;
}
</style>
