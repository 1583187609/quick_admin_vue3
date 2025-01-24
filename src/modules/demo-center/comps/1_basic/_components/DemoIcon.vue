<!-- 图标 -->
<template>
  <div>
    <BaseSection title="默认">
      <BaseIcon />
    </BaseSection>
    <BaseSection title="设置大小和名称">
      <BaseIcon size="2em" name="CirclePlusFilled" />
      <BaseIcon name="Setting" size="3em" />
    </BaseSection>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";

const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
