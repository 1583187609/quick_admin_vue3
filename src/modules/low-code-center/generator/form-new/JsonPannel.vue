<!-- JSON面板 -->
<template>
  <SectionBox title="JSON" class="json-pannel" :style="{ minWidth: width }">
    <BaseForm :fields="fields" :moreBtns="['add']" @moreBtns="handleMoreBtns" />
  </SectionBox>
</template>
<script lang="ts" setup>
import { computed, reactive } from "vue";
import SectionBox from "./_components/SectionBox.vue";
import { usePopup } from "@/hooks";
import SetPannel from "./SetPannel/Index.vue";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj } from "@/core/_types";

const { openPopup } = usePopup();

const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
    width?: string;
  }>(),
  {
    modelValue: () => reactive({}),
  }
);
const $emit = defineEmits(["update:modelValue"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: string) => $emit("update:modelValue", val),
});
const fields: FormFieldAttrs[] = [];
function handleMoreBtns(name: BtnName) {
  const nameMap = {
    add: () => handleAddField(),
  };
  nameMap[name]?.();
}
function handleAddField(data?: CommonObj) {
  openPopup(`${data ? "编辑" : "新增"}字段`, [SetPannel, { data, onConfirm: handleConfirm, width: props.width }]);
}
function handleConfirm(data: CommonObj) {
  // modelVal.value = data
}
</script>
<style lang="scss" scoped></style>
