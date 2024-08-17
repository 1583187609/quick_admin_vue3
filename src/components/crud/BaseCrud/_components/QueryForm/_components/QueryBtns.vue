<!-- 页面-简介 -->
<template>
  <el-col class="query-btns f-fe-fs ml-a" :class="{ compact, [size]: true }">
    <el-button type="primary" v-debounce.immediate="() => emits('submit')" :disabled="loading">
      <template #icon>
        <BaseIcon :class="{ rotate: loading }" :name="loading ? 'Loading' : 'Search'"></BaseIcon>
      </template>
      <template #default>{{ $t("base.button.search") }}</template>
    </el-button>
    <el-button :icon="RefreshLeft" @click="emits('reset')" :disabled="loading">{{ $t("base.button.reset") }}</el-button>
    <el-button @click="emits('fold')" text type="primary" v-if="showFoldBtn">
      <template #icon>
        <BaseIcon name="ArrowDown" :class="{ 'rotate-180': !isFold, 'icon-fold': true }"></BaseIcon>
      </template>
      {{ isFold ? $t("base.button.unfold") : $t("base.button.fold") }}
    </el-button>
  </el-col>
</template>
<script lang="ts" setup>
import { RefreshLeft } from "@element-plus/icons-vue";
import { defaultCommonSize } from "@/components/_utils";
import { CommonSize } from "@/vite-env";

const props = withDefaults(
  defineProps<{
    isFold?: boolean;
    loading?: boolean;
    showFoldBtn?: boolean;
    compact?: boolean;
    size?: CommonSize;
  }>(),
  {
    isFold: true,
    size: defaultCommonSize,
  }
);
const emits = defineEmits(["submit", "reset", "fold"]);
</script>
<style lang="scss">
.query-btns {
  display: flex;
  &.large {
    margin-bottom: $gap-large;
    .el-button {
      padding: 0 $gap-large;
      + .el-button {
        margin-left: $gap-large;
      }
    }
  }
  &.default {
    margin-bottom: $gap-default;
    .el-button {
      padding: 0 $gap-default;
      + .el-button {
        margin-left: $gap-default;
      }
    }
  }
  &.small {
    margin-bottom: $gap-small;
    .el-button {
      padding: 0 $gap-small;
      + .el-button {
        margin-left: $gap-small;
      }
    }
  }
  // &.compact {
  //   .el-button {
  //     padding: 0 $gap-half;
  //   }
  // }
}
</style>
