<!-- 设置面板 -->
<template>
  <SectionBox
    :title="modelData?.label && modelData?.prop ? `${modelData?.label}（${modelData?.prop}）` : '未选择'"
    class="set-pannel"
    bodyClass="p-h"
    emptyTips="请在左侧选择字段"
  >
    <el-tabs v-model="currConfigType" v-if="props.fieldInfo">
      <el-tab-pane v-bind="item" v-for="(item, ind) in configTypeOpts" :key="ind">
        <ConfigField v-model="modelData" @change="data => $emit('save', data, props.type)" v-if="currConfigType === 'field'" ref="configFieldRef" />
        <ConfigJson v-else-if="currConfigType === 'json'" />
      </el-tab-pane>
    </el-tabs>
  </SectionBox>
</template>
<script lang="ts" setup>
import { FormFieldAttrs } from "@/core/components/form/_types";
import SectionBox from "../_components/SectionBox.vue";
import { CommonObj } from "@/core/_types";
import ConfigField from "./ConfigField.vue";
import ConfigJson from "./ConfigJson/Index.vue";

export type SetPannelType = "add" | "edit";
export type ConfigType = "field" | "json"; // 配置字段，配置JSON

const configTypeOpts: CommonObj[] = [
  { label: "配置字段", name: "field" },
  { label: "配置JSON", name: "json" },
];
const props = withDefaults(
  defineProps<{
    fieldInfo?: FormFieldAttrs;
    width?: string;
    type?: SetPannelType;
  }>(),
  {
    type: "add",
  }
);
const $emit = defineEmits(["save"]);
const currConfigType = ref<ConfigType>("field"); // 配置类型
const configFieldRef = ref<any>(null);
const modelData = ref<CommonObj>(props.fieldInfo);
watch(
  () => props.fieldInfo,
  newVal => {
    modelData.value = newVal ?? {};
  },
  {
    immediate: true,
  }
);
defineExpose({
  reset() {
    configFieldRef.value?.reset?.();
  },
});
</script>
<style lang="scss" scoped></style>
