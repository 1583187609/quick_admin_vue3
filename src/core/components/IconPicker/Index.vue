<template>
  <div @click="openPopup('选择图标', [SelectIcon, { onSelected: handleSelected }])" class="icon-picker f-c-c">
    <template v-if="iconName">
      <BaseIcon class="q-line-1" style="line-height: 1" size="1.4em" :name="iconName" />
      <span class="ml-h">{{ iconName }}</span>
    </template>
    <span class="placeholder" v-else>点击选择图标</span>
  </div>
</template>
<script lang="ts" setup>
import { useFormItem } from "element-plus";
import SelectIcon from "./_components/SelectIcon.vue";
import { usePopup } from "@/hooks";

const { openPopup, closePopup } = usePopup();
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {}
);
const $emit = defineEmits(["update:modelValue"]);
const { formItem } = useFormItem();
const iconName = ref(props.modelValue);

function handleSelected(name: string) {
  iconName.value = name;
  $emit("update:modelValue", name);
  formItem?.validate("change");
  closePopup();
}
</script>
<style lang="scss" scoped>
.icon-picker {
  cursor: pointer;
  .placeholder {
    cursor: pointer;
    color: $color-text-light;
  }
}
</style>
