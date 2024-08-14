<!-- summary 相册
  这是相册的摘要描述
-->
<template>
    <div class="example-vue">相册</div>
</template>
<script lang="ts" setup>
import {ref,reactive,watch,computed} from "vue"
const props = withDefaults(
    defineProps<{
        exampleProp?: CommonObj;
    }>(),
    {
        exampleProp: () => ({}),
    }
);
</script>
<style lang="scss" scoped>
</style>