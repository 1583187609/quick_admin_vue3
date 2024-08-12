<!-- 页面-简介 -->
<template>
  <el-button
    class="add-del-btn f-0"
    type="primary"
    text
    :icon="CirclePlusFilled"
    @click="handleClick('add')"
    v-if="type === 'add'"
  ></el-button>
  <el-button
    class="add-del-btn f-0"
    type="danger"
    text
    :icon="RemoveFilled"
    @click="handleClick('del')"
    v-else-if="type === 'del'"
  ></el-button>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CirclePlusFilled, RemoveFilled, CirclePlus, Remove } from "@element-plus/icons-vue";
import { toCssVal } from "@/components/_utils";
import { CommonObj, StrNum } from "@/vite-env";
export type AddDelBtnType = "add" | "del";
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
const emits = defineEmits<{
  /**
   * 点击事件
   * @type {type: AddDelBtnType}
   */
  click: [AddDelBtnType];
}>();
function handleClick(type: AddDelBtnType) {
  emits("click", type);
}
</script>
<style lang="scss" scoped>
.add-del-btn {
  width: 1em;
  font-size: v-bind(toCssVal(size));
}
</style>
