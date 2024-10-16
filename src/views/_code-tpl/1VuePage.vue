<!-- 页面描述 -->
<template>
  <div>页面</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CommonObj } from "@/vite-env";

const router = useRouter();
const route = useRoute();
const { id } = route.query;
</script>
<style lang="scss" scoped></style>
