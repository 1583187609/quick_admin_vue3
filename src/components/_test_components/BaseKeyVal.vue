<template>
  <div class="base-key-val f-fs-s" :class="[vertical ? 'f-c-c-c' : 'f-fs-fs']">
    <div
      class="key f-0 f-fs-fs"
      :class="{ colon }"
      :style="{
        width: toCssVal(labelWidth),
      }"
    >
      <BaseIcon class="mr-4" :name="icon" v-if="icon" />
      <span class="f-1">{{ label }}</span>
      <QuestionPopover :popover="popover" class="tips-icon" v-if="popover" />
    </div>
    <div
      class="val f-1 f-fs-fs-w"
      :class="{
        [`line-${props.line}`]: !!props.line,
        [`${props.valClass}`]: !!props.valClass,
      }"
    >
      <slot>{{ emptyVals.includes(valText as any) ? "-" : valText }}</slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { toCssVal, typeOf, getPopoverAttrs, emptyVals } from "@/components/_utils";
import { StrNum } from "@/vite-env";
import { PopoverAttrs } from "@/components/_types";
import { DictName } from "@/dict/_types";
import { useDict } from "@/hooks";
import QuestionPopover from "@/components/QuestionPopover.vue";

const { getText } = useDict();
const props = withDefaults(
  defineProps<{
    icon?: string;
    colon?: boolean;
    label?: string;
    value?: StrNum | StrNum[];
    line?: number;
    labelWidth?: string;
    valClass?: string;
    name?: DictName; //下拉项的名称
    popover?: string | PopoverAttrs;
    joinChar?: string;
    vertical?: boolean;
  }>(),
  {
    colon: true,
    line: 0,
    joinChar: "，",
  }
);
const valText = computed(() => {
  const { value, joinChar, name } = props;
  if (name) return getText(name, value);
  if (typeOf(value) === "Array") return (value as StrNum[]).join(joinChar);
  return value;
});
</script>
<style lang="scss" scoped>
.base-key-val {
  line-height: 24px;
  .key {
    text-align: right;
    &.colon::after {
      content: "：";
    }
    .tips-icon {
      margin-top: 5px;
    }
  }
  &.f-c-c-c {
    .key {
      text-align: center;
      width: 100% !important;
    }
  }
  .val {
    align-content: flex-start;
  }
}
</style>
