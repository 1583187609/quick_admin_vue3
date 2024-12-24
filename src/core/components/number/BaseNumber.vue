<!-- summary
目标：数字升降。
-->
<template>
  <div class="base-number f-c-c" :class="changeValue && { rise: changeValue > 0, decline: changeValue < 0, last: iconLast }">
    <template v-if="changeValue">
      <template v-if="showChar">{{ changeValue > 0 ? "+" : "-" }}</template>
      <BaseIcon :name="changeValue > 0 ? riseIcon : declineIcon" :class="iconLast ? 'ml-h' : 'mr-h'" v-else />
      {{ changeValue }}
    </template>
    <!-- <CountTo :endValue="+slotValue" v-if="transition && slotValue && !isNaN(+slotValue)"/> -->
    <span v-if="transition && changeValue && !isNaN(+changeValue)">
      <slot />
    </span>
    <slot v-else />
  </div>
</template>
<script lang="ts" setup>
import { useSlots } from "vue";

// import CountTo from "./CountTo.vue";

const props = withDefaults(
  defineProps<{
    changeValue?: number; // 变化的值
    riseIcon?: string;
    declineIcon?: string;
    iconLast?: boolean;
    showChar?: boolean; // 是否显示正负符号
    transition?: boolean; // 是否从0过渡到目标值
  }>(),
  {
    showChar: false,
    transition: true,
    riseIcon: "Top",
    declineIcon: "Bottom",
  }
);
// const $slots = useSlots();
// const slotValue = $slots.default?.()[0]?.children;
</script>
<style lang="scss" scoped>
.base-number {
  color: $color-info;
  &.rise {
    color: $color-danger;
  }
  &.decline {
    color: $color-success;
  }
  &.last {
    flex-direction: row-reverse;
  }
}
</style>
