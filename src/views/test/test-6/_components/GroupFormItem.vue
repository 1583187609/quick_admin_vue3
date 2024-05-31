<!-- 页面-简介 -->
<template>
  <div class="group-form-item">
    <div class="f-fs-fs item" v-for="(item, ind) in list" :key="ind">
      <BaseFormItem
        v-model="item.jblx"
        :field="{
          prop: 'jblx',
          label: '嘉宾类型',
          type: 'select',
          labelWidth: '0',
          required: false,
          options: userOpts,
          extra: {
            noStyle: true,
          },
        }"
      />
      <BaseFormItem
        v-model="item.zb"
        :field="{
          prop: 'zb',
          label: '占比',
          labelWidth: '0',
          required: false,
          type: 'input-number',
          extra: {
            noStyle: true,
          },
        }"
      />
      <!-- <el-select v-model="item.jblx" placeholder="请选择嘉宾类型" clearable>
        <el-option
          v-bind="opt"
          v-for="(opt, oInd) in userOpts"
          :key="oInd"
        ></el-option>
      </el-select> -->
      <!-- <el-input-number
        placeholder="占比"
        :min="0"
        :max="100"
        class="ml-o"
        v-model="item.zb"
        clearable
      /> -->
      <AddDelBtn
        @click="(type:AddDelBtnType)=>handleAddDel(type,ind)"
        class="ml-h"
        :type="ind === list.length - 1 ? 'add' : 'del'"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import AddDelBtn, { AddDelBtnType } from "@/components/AddDelBtn.vue";
import { CommonObj, OptionItem } from "@/vite-env";
import { useFormItem } from "element-plus";
const userOpts: OptionItem[] = [
  { label: "喜欢我的", value: 1 },
  { label: "优质嘉宾", value: 2 },
  { label: "新用户", value: 3 },
  { label: "普通用户", value: 4 },
];
const props = withDefaults(
  defineProps<{
    modelValue: CommonObj[];
  }>(),
  {}
);
const emits = defineEmits(["update:modelValue"]);
const { formItem } = useFormItem();
const list = computed({
  get() {
    console.log(props.modelValue, "modelValue-------------");
    return props.modelValue;
  },
  set(val: CommonObj[]) {
    emits("update:modelValue", val);
    formItem?.validate("change");
    formItem?.validate("blur");
  },
});
function handleAddDel(type: AddDelBtnType, ind: number) {
  if (type === "add") {
    list.value.push({ jblx: undefined, zb: undefined });
  } else if (type === "del") {
    list.value.splice(ind, 1);
  }
}
</script>
<style lang="scss" scoped>
.item {
  &:not(:last-child) {
    margin-bottom: $gap-half;
  }
}
</style>
