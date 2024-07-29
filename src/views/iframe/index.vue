<!-- 页面-简介 -->
<template>
  <iframe class="inner-link page-view" :src="iframeSrc"></iframe>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
const { url } = route.query;
const iframeSrc = (url as string) ?? "";
</script>
<style lang="scss" scoped>
.inner-link {
  padding: 0;
}
</style>
