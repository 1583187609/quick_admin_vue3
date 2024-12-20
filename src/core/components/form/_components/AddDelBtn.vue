<!-- 图标按钮 -->
<template>
  <el-button class="add-del-btn f-0" :type="btnMap[type].type" text :icon="btnMap[type].icon" @click="handleClick(type)" />
</template>
<script lang="ts" setup>
import { CirclePlusFilled, RemoveFilled, Edit } from "@element-plus/icons-vue";
import { toCssVal } from "@/core/utils";
import { StrNum } from "@/core/_types";

export type AddDelBtnType = "add" | "del" | "edit";

const btnMap = {
  add: {
    type: "success",
    icon: CirclePlusFilled,
  },
  del: {
    type: "danger",
    icon: RemoveFilled,
  },
  edit: {
    type: "primary",
    icon: Edit,
  },
};
const props = withDefaults(
  defineProps<{
    type?: AddDelBtnType;
    size?: StrNum;
  }>(),
  {
    type: "add",
    size: 26,
  }
);
const $emit = defineEmits<{
  /**
   * 点击事件
   * @type {type: AddDelBtnType}
   */
  click: [AddDelBtnType];
}>();
function handleClick(type: AddDelBtnType) {
  $emit("click", type);
}
</script>
<style lang="scss" scoped>
.add-del-btn {
  width: 1em;
  font-size: v-bind(toCssVal(size));
}
</style>
