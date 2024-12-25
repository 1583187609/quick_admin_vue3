<!-- summary 基础用法
  待完善
-->
<template>
  <BaseNumber :changeValue="riseVal" showChar>{{ riseVal > 0 ? "收入" : "支出" }}</BaseNumber>
  <br />
  <BaseNumber :changeValue="riseVal">123456</BaseNumber>
  <br />
  <BaseNumber :changeValue="riseVal" iconLast>123456</BaseNumber>
  <br />
  <BaseNumber  transition>123456</BaseNumber>
  <br />
  <BaseNumber  transition>123456</BaseNumber>
  <br />
  <BaseNumber  transition>-123456</BaseNumber>
  <BaseCountTo/>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const riseVal = ref(12);
const declineVal = ref(-12);
</script>
<style lang="scss" scoped></style>
