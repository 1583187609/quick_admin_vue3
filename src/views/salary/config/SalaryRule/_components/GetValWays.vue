<!-- 页面-简介 -->
<template>
  <div class="example-vue">
    <el-radio-group v-model="valObj.type">
      <el-radio :disabled="opt.disabled" :value="opt.value" v-for="(opt, ind) in options" :key="ind">
        {{ opt.label }}
      </el-radio>
    </el-radio-group>
    <el-input-number style="margin-right: 100px" v-model="valObj.val" placeholder="请输入值" :min="0" v-if="valObj.type === 1" />
    <el-input v-model="valObj.val" placeholder="请输入公式" type="textarea" v-else-if="valObj.type === 2" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
const options: OptionItem[] = [
  { label: "输入", value: 1 },
  { label: "公式", value: 2 },
];
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue"]);
const valObj = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
</script>
<style lang="scss" scoped></style>
