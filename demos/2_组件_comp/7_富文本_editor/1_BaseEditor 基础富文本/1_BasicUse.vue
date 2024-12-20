<!-- summary 基础用法
  摘要介绍暂时略
-->
<template>
  <BaseEditor v-model="htmlStr" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
const htmlStr = ref("");
</script>
<style lang="scss" scoped></style>
