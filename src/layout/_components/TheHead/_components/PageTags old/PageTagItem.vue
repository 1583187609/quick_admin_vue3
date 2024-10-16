<template>
  <el-tag
    class="route-tag"
    :effect="active ? 'dark' : 'light'"
    @click="onClick"
    @close="onClose"
    @contextmenu.prevent="onContextmenu"
    :closable="closable"
  >
    <div class="f-c-c">
      <BaseIcon class="mr-4" size="1.2em" :name="icon" v-if="icon"></BaseIcon>
      <span class="text line-1"><slot /></span>
    </div>
  </el-tag>
</template>
<script lang="ts" setup>
export type CopyType = "path";
const props = withDefaults(
  defineProps<{
    icon?: string;
    active?: boolean;
    closable?: boolean;
  }>(),
  {
    closable: true,
    active: false,
  }
);
const $emit = defineEmits(["close", "click", "contextmenu"]);
function onClose() {
  $emit("close");
}
function onClick() {
  $emit("click");
}
function onContextmenu(e: Event) {
  $emit("contextmenu", e);
}
</script>
<style lang="scss" scoped>
.route-tag {
  position: relative;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: $gap-qtr;
  }
  .text {
    // max-width: 8em;
  }
}
</style>
