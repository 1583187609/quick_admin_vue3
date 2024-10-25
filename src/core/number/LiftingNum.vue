<!-- 页面-简介 -->
<template>
    <div class="example-vue">数字升降</div>
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