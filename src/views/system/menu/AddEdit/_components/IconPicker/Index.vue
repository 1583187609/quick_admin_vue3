<template>
  <div @click="openSelectIcon" class="icon-box f-c-c">
    <template v-if="iconName">
      <BaseIcon class="line-1" style="line-height: 1" size="28" :name="iconName"></BaseIcon>
      <span class="ml-h">{{ iconName }}</span>
    </template>
    <span class="placeholder" v-else> 点击选择图标 </span>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed, h } from "vue";
import { useFormItem } from "element-plus";
import SelectIcon from "./_components/SelectIcon.vue";

const openPopup = inject<any>("openPopup");
const closePopup = inject<any>("closePopup");
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
const emits = defineEmits(["update:modelValue"]);
const { formItem } = useFormItem();
const iconName = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    emits("update:modelValue", val);
    formItem?.validate("change");
  },
});

function openSelectIcon() {
  openPopup(
    "选择图标",
    h(SelectIcon, {
      onSelected: handleSelected,
    })
  );
}
function handleSelected(name: string) {
  iconName.value = name;
  closePopup();
}
</script>
<style lang="scss" scoped>
.icon-box {
  cursor: pointer;
  .placeholder {
    cursor: pointer;
    color: $color-text-light;
  }
}
</style>
