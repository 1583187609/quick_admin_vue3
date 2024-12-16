<!-- 组件描述 -->
<template>
  <div class="example-class" v-model="modalData">组件</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj } from "@/core/_types";

const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const $emit = defineEmits(["update:modelValue"]);

const modalData = computed({
  get: () => props.modelValue,
  set: (val: CommonObj) => $emit("update:modelValue", val),
});
</script>
<style lang="scss" scoped>
.example-class {
}
</style>
