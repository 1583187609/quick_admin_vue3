<!-- 底部按钮 -->
<template>
  <div class="foot-btns">
    <BaseBtn :name="btn" v-for="(btn, ind) in btns" :key="ind" />
  </div>
</template>
<script lang="ts" setup>
import { BtnItem } from "@/core/BaseBtn/_types";
const props = withDefaults(
  defineProps<{
    btns?: BtnItem[];
  }>(),
  {
    btns: () => [
      {
        name: "cancel",
        text: "取消",
        attrs: {
          onClick: () => $emit("cancel"),
        },
      },
      {
        name: "confirm",
        text: "确认",
        attrs: {
          type: "primary",
          onClick: () => $emit("confirm"),
        },
      },
    ],
  }
);
// const $emit = defineEmits(props.btns.map(it => it.name) as string[]);
const $emit = defineEmits(["confirm", "cancel"]);
</script>
<style lang="scss" scoped></style>
