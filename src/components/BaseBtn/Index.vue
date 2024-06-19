<template>
  <el-popconfirm @confirm="handleClick" v-bind="newBtn?.popconfirm" v-if="newBtn?.popconfirm">
    <template #reference>
      <el-button class="base-btn" v-bind="{ ...newBtn.attrs, ...$attrs }">
        <slot>{{ newBtn?.text || "-" }}</slot>
      </el-button>
    </template>
  </el-popconfirm>
  <el-button class="base-btn" @click="handleClick" v-bind="{ ...newBtn.attrs, ...$attrs }" v-else>
    <slot>{{ newBtn?.text || "-" }}</slot>
  </el-button>
</template>
<script lang="ts">
export default {
  name: "BaseBtn",
  inheritAttrs: false,
};
</script>
<script lang="ts" name="BaseBtn" setup>
import { computed, useAttrs, useSlots, inject } from "vue";
import { BaseBtnType, getBtnObj } from "@/components/BaseBtn";
import { typeOf } from "@/utils";
import { useRouter } from "vue-router";
import { PopconfirmAttrs } from "./index";
import { CommonObj } from "@/vite-env";

const props = withDefaults(
  defineProps<{
    name?: BaseBtnType;
    icon?: CommonObj; //必须是引入的有render函数的组件，不能传字符串
    data?: any; //要传给to(args)的args参数
    popconfirm?: boolean | PopconfirmAttrs; //popconfirm 弹出层的属性
  }>(),
  {
    name: "empty",
  }
);
const $attrs = useAttrs();
const router = useRouter();
const emits = defineEmits(["click"]);
const newBtn: any = computed(() => getBtnObj(props.name));
function handleClick() {
  const { name, to, attrs, customRules } = newBtn.value;
  if (to === undefined) {
    emits("click", name);
  } else {
    const t = typeOf(to);
    router.push(t === "Function" ? to(props.data) : to);
  }
}
</script>
<style lang="scss" scoped></style>
