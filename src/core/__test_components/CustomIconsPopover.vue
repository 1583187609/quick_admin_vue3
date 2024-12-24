<template>
  <el-popover placement="bottom-start" :width="width - 100" trigger="click" ref="popoverRef">
    <template #reference>
      <div class="icon-box f-fs-c" v-if="iconName">
        <BaseIcon size="26" :name="iconName"></BaseIcon>
        <span class="ml-h">{{ iconName }}</span>
      </div>
      <span class="placeholder" v-else>请选择菜单图标</span>
    </template>
    <ul class="list f-fs-fs-w all-hide-scroll">
      <li @click="onClick('')" class="item f-c-c-c f-1" :class="{ active: iconName == '' }">
        <span class="f-c-c" style="height: 32px; width: 32px; font-size: 22px">无</span>
        <span class="text q-line-1">none</span>
      </li>
      <li
        @click="onClick(name)"
        class="item f-c-c-c f-1"
        :class="{ active: iconName == name }"
        v-for="(name, ind) in names"
        :key="ind"
      >
        <BaseIcon :name="name" size="30"></BaseIcon>
        <span class="text q-line-1">{{ name }}</span>
      </li>
      <li class="f-empty item" v-for="(item, ind) in 7 - (names.length % 7)" :key="'empty-' + ind"></li>
    </ul>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import * as Icons from "@element-plus/icons-vue";
import { ClickOutside, useFormItem } from "element-plus";

const props = withDefaults(
  defineProps<{
    width: number;
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
const $emit = defineEmits(["update:modelValue"]);
const popoverRef = ref<any>(null);
const { formItem } = useFormItem();
const names = ref(Object.keys(Icons));
const iconName = computed(() => {
  return props.modelValue;
});
function onClick(name: string) {
  $emit("update:modelValue", name);
  popoverRef.value.hide();
  formItem?.validate("blur");
}
</script>
<style lang="scss" scoped>
.placeholder {
  cursor: pointer;
  color: $color-text-light;
}
.list {
  max-height: 400px;
  overflow: auto;
  .item {
    cursor: pointer;
    flex-basis: 100px;
    margin: $gap-half $gap-qtr;
    &:hover {
      color: #000;
      transform: scale(1.2);
      transition: 0.3s;
    }
    &.active {
      color: $color-primary;
      transform: scale(1.2);
      .text {
        color: $color-primary;
      }
    }
    .text {
      font-weight: 500;
      margin-top: 2px;
      font-size: $font-size-light;
    }
  }
}
.icon-box {
  cursor: pointer;
}
</style>
