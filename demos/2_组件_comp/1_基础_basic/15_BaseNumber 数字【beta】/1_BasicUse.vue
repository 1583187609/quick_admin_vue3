<!-- summary 基础用法
  已实现数字过渡自增动画效果。未来考虑加入千分位、升降变化等数字相关的处理。
  待完善
-->
<template>
  <BaseNumber :changeValue="riseVal" showChar>{{ riseVal > 0 ? "收入" : "支出" }}</BaseNumber>
  <br />
  <BaseNumber :changeValue="riseVal">123456</BaseNumber>
  <br />
  <BaseNumber :changeValue="riseVal" iconLast>123456</BaseNumber>
  <br />
  <BaseNumber transition>123456</BaseNumber>
  <br />
  <BaseNumber transition>123456</BaseNumber>
  <br />
  <BaseNumber transition>-123456</BaseNumber>
  <BaseNumber />
</template>
<script lang="ts" setup>
import { ref } from "vue";
const riseVal = ref(12);
const declineVal = ref(-12);
</script>
<style lang="scss" scoped></style>
