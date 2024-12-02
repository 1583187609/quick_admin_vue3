<!-- 页面-简介 -->
<template>
  <div class="auth-info">
    <div class="f-c-c-c item-box" v-if="data.schoolStatus === 0">
      <BaseTag name="D_AuthCase" value="2" />
      <div class="text-tag">{{ data.labelSchool || "-" }}</div>
      <div class="text-tag">{{ data.schoolName || "-" }}</div>
    </div>
    <div class="f-c-c-c item-box" v-if="data.companyStatus === 0">
      <BaseTag name="D_AuthCase" value="3" />
      <div class="text-tag">{{ data.labelCompany || "-" }}</div>
    </div>
    <template v-if="data.schoolStatus !== 0 && data.companyStatus !== 0">-</template>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
</script>
<style lang="scss" scoped>
.item-box {
  &:not(:last-child) {
    margin-bottom: $gap-qtr;
  }
  .text-tag {
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>
