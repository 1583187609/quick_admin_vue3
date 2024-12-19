<!-- 预览面板 -->
<template>
  <SectionBox title="预览" class="preview-pannel">
    <BaseForm :fields="data" v-if="type === 'baseForm'" />
    <BaseTable :cols="cols" :rows="data" v-else-if="type === 'baseTable'" />
    <SectionForm :sections="data" v-else-if="type === 'sectionForm'" />
    <BaseCrud :fields="data" :cols="cols" v-else-if="type === 'baseCrud'" />
  </SectionBox>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SectionBox from "./_components/SectionBox.vue";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { TableCol } from "@/core/components/table/_types";
import { CommonObj } from "@/core/_types";

const props = withDefaults(
  defineProps<{
    data?: any; // CommonObj;
    cols?: TableCol[];
  }>(),
  {}
);
const type = ref("baseForm");
</script>
<style lang="scss" scoped></style>
