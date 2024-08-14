<template>
  <BaseNumberRange v-model="vals" style="width: 250px" />
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { StrNum } from "@/vite-env";
const vals = reactive<[StrNum, StrNum]>([1, 2]);
</script>
<style lang="scss" scoped></style>
