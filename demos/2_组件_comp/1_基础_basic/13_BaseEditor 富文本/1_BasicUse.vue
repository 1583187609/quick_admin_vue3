<!-- summary 基础用法
  提供富文本编辑器的解决方案。
  待完善
-->
<template>
  <BaseEditor v-model="htmlStr" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
const htmlStr = ref("");
</script>
<style lang="scss" scoped></style>
