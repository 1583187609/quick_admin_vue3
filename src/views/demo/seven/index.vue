<!-- 页面 - 测试 -->
<template>
  <div class="page-view">demo-7</div>
</template>
<script lang="ts" name="TestSeven" setup>
//form-create地址： http://www.form-create.com/v3/element-ui/
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, OptionItem, StrNum } from "@/vite-env";
import { useDictStore } from "@/store";
const { getOpts, getText } = useDictStore();
const genderOpts = getOpts("Gender");
</script>
<style lang="scss" scoped></style>
