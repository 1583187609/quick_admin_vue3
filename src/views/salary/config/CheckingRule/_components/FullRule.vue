<!-- 组件 - 全勤奖 -->
<template>
  <div>
    <div class="f-fs-c">
      <el-switch class="mr-o" v-model="obj.kg" />
      <span>发生以下情况之一，不发放全勤奖</span>
    </div>
    <template v-if="obj.kg">
      <div class="f-fs-c item" v-for="(item, ind) in list" :key="ind">
        <label class="f-fs-c">
          <el-checkbox v-model="item.xz" />
          <div class="label" v-bind="item.attrs">{{ item.label }}</div>
        </label>
        <el-input-number :min="0" v-if="item.unit" />
        <div class="ml-q">{{ item.unit }}以上(含)</div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue"]);
const obj = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
const list = reactive<CommonObj[]>([
  { xz: false, z: 10, label: "缺勤", unit: "" },
  { xz: true, z: 10, label: "年假", unit: "小时" },
  {
    xz: true,
    z: 10,
    label: "调休",
    unit: "小时",
  },
  { xz: false, z: 10, label: "请假", unit: "小时" },
  {
    xz: true,
    z: 10,
    label: "迟到、早退",
    unit: "分钟",
    attrs: { style: "width: 5em" },
  },
]);
</script>
<style lang="scss" scoped>
.item {
  display: inline-flex;
  width: 50%;
  margin-bottom: $gap-qtr;
  .label {
    width: 2em;
    margin: 0 $gap-half;
  }
}
</style>
