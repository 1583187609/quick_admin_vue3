<!-- 页面-简介 -->
<template>
  <el-tree-select
    check-strictly
    placeholder="请选择文件路径"
    class="menu-tree"
    :style="{ width }"
    v-model="modelVal"
    :data="autoMenus"
    :props="{ value: 'path' }"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { autoMenus } from "@/router/routes/auto";
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    width?: string;
  }>(),
  {
    width: "300px",
  }
);
const $emit = defineEmits(["update:modelValue"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});

const data = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
</script>
<style lang="scss" scoped>
.menu-tree {
}
// .popper1 {
//   background: red;
//   width: 600px;
// }
</style>
