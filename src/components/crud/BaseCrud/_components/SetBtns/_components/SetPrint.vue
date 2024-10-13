<template>
  <div class="base-print">打印功能待完善，敬请期待</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import config from "@/config";

const props = withDefaults(defineProps<{}>(), Object.assign({}, config?.BaseCrud?._components?.SetPrint));
</script>
<style lang="scss" scoped>
.base-print {
  width: 800px;
}
</style>
