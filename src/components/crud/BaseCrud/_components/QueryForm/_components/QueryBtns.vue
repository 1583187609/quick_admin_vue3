<!-- 页面-简介 -->
<template>
  <el-col class="query-btns f-fe-fs" :class="{ compact, small }">
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
import { ref, reactive, watch, computed } from "vue";
import { RefreshLeft } from "@element-plus/icons-vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    isFold?: boolean;
    loading?: boolean;
    showFoldBtn?: boolean;
    compact?: boolean;
    small?: boolean;
  }>(),
  {
    isFold: true,
  }
);
const emits = defineEmits(["submit", "reset", "fold"]);
</script>
<style lang="scss">
.query-btns {
  display: flex;
  margin-left: auto;
  &.compact {
    .el-button {
      padding: 0 $gap-half;
    }
  }
  .el-button {
    padding: 0 $gap-half;
    + .el-button {
      margin-left: $gap-half;
    }
  }
  &.small {
    .el-button {
      padding: 0 $gap-qtr;
      + .el-button {
        margin-left: $gap-qtr;
      }
    }
  }
}
</style>
