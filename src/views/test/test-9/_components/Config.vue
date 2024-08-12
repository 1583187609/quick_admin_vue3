<!-- 组件 - 添加下拉项 -->
<template>
  <div class="config">
    <InputWays v-model="inpType" />
    <el-input
      type="textarea"
      style="width: 100%"
      :placeholder="'请输入标准JSON字符串，例：' + exampleMap[type]"
      v-if="inpType === 0"
    />
    <div class="f-fs-c" v-else-if="inpType === 1">
      暂未处理动态添加
    </div>
    <div class="f-fs-fs" v-else-if="inpType === 2">
      暂未处理请求获取
      <!-- <el-input class="f-1" placeholder="请输入请求地址" />
        <el-input
          class="f-1 ml-o"
          type="textarea"
          :rows="1"
          placeholder="请输入请求参数，例：{id: 1}"
        /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
import InputWays, { InputType } from "./InputWays.vue";
import { exampleMap } from "../_config";
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    type: string;
  }>(),
  {}
);
const emits = defineEmits(["update:modelValue"]);
const inpType = ref<InputType>(0);
const val = computed<any>({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
</script>
<style lang="scss" scoped>
.config {
  width: 600px;
}
</style>
