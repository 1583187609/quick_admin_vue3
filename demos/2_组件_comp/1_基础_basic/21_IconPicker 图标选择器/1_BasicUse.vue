<template>
  <div class="f-fs-fs">
    <IconPicker />
  </div>
</template>
<script lang="ts" setup>
import IconPicker from "@/core/components/IconPicker/Index.vue";
</script>
<style lang="scss" scoped>
.base-video {
  &:not(:last-child) {
    margin-right: $gap-two;
  }
}
</style>
