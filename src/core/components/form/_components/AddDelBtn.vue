<!-- 图标按钮 -->
<template>
  <el-button class="add-del-btn f-0" :type="btnMap[type].type" text :icon="btnMap[type].icon" />
  <!-- <BaseBtn class="add-del-btn f-0" :tpl="{ name: type, text: '' }" :type="btnMap[type].type" text :icon="btnMap[type].icon"></BaseBtn> -->
</template>
<script lang="ts" setup>
import { CirclePlusFilled, RemoveFilled, Edit } from "@element-plus/icons-vue";
import { toCssVal } from "@/core/utils";
import { StrNum } from "@/core/_types";

export type AddDelBtnType = "add" | "delete" | "edit";

const btnMap = {
  add: {
    type: "primary",
    icon: CirclePlusFilled,
  },
  delete: {
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
</script>
<style lang="scss" scoped>
.add-del-btn {
  width: 1em;
  font-size: v-bind(toCssVal(size));
}
</style>
