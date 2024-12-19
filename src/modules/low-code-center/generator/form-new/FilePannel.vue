<template>
  <SectionBox title="文件" class="file-pannel">
    <BaseTree :data="treeData" />
  </SectionBox>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import SectionBox from "./_components/SectionBox.vue";
import { OptionItem } from "@/core/_types";

const treeData: OptionItem[] = [
  {
    value: 1,
    label: "Level one 1",
    children: [
      {
        value: 4,
        label: "Level two 1-1",
        children: [
          {
            value: 9,
            label: "Level three 1-1-1",
          },
          {
            value: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    value: 2,
    label: "Level one 2",
    children: [
      {
        value: 5,
        label: "Level two 2-1",
      },
      {
        value: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    value: 3,
    label: "Level one 3",
    children: [
      {
        value: 7,
        label: "Level two 3-1",
      },
      {
        value: 8,
        label: "Level two 3-2",
      },
    ],
  },
];

const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
const $emit = defineEmits(["update:modelValue"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: string) => $emit("update:modelValue", val),
});
</script>
<style lang="scss" scoped></style>
