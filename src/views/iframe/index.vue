<!-- 页面-简介 -->
<template>
  <iframe class="inner-link page-view" :src="iframeSrc"></iframe>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { useRoute } from "vue-router";
// const props = withDefaults(
//   defineProps<{
//     _example_prop?: CommonObj;
//   }>(),
//   {
//     _example_prop: () => ({}),
//   }
// );
const route = useRoute();
const { url } = route.query;
const iframeSrc = (url as string) ?? "";
</script>
<style lang="scss" name="" scoped>
// .inner-link {
//   //padding: 0;
// }
</style>
