<template>
  <BaseNumberRange v-model="vals" />
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { StrNum } from "@/vite-env";
const vals = reactive<[StrNum, StrNum]>([]);
</script>
<style lang="scss" scoped></style>
