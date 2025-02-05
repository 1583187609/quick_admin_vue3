<template>
  <div class="base-print">打印功能待完善，敬请期待</div>
</template>
<script lang="ts" setup>
import config from "@/core/config";

const props = withDefaults(defineProps<{}>(), {
  ...config?.BaseCrud?.SetPrint,
});
</script>
<style lang="scss" scoped>
.base-print {
  width: 800px;
}
</style>
