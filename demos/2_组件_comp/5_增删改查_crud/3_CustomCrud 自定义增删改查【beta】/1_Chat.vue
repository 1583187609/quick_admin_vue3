<!-- summary 聊天记录
  这是聊天记录的摘要描述
-->
<template>
    <div class="example-vue">聊天记录</div>
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