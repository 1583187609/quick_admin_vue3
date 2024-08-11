<template>
  <el-popconfirm @confirm="handleClick" v-bind="newBtn?.popconfirm" v-if="newBtn?.popconfirm">
    <template #reference>
      <el-button class="base-btn" v-bind="newBtn.attrs">
        <slot>{{ newBtn?.text || "-" }}</slot>
      </el-button>
    </template>
  </el-popconfirm>
  <el-button class="base-btn" v-bind="newBtn.attrs" @click="handleClick" v-else>
    <slot>{{ newBtn?.text || "-" }}</slot>
  </el-button>
</template>
<script lang="ts" name="BaseBtn" setup>
import { computed, useAttrs, inject } from "vue";
import { BaseBtnType, getBtnObj } from "@/components/BaseBtn";
import { typeOf } from "@/components/_utils";
import { useRouter } from "vue-router";
import { PopconfirmAttrs } from "./index";
import { CommonObj } from "@/vite-env";
import { BtnAttrs } from "./_types";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name?: BtnName; //可以不传值
    text?: string; //按钮文本
    order?: number; //按钮顺序
    auth?: number[]; //权限
    to?: string | CommonObj | ((row: CommonObj) => string | CommonObj); //点击按钮时要跳转的页面地址
    customRules?: boolean; //是否自定义该按钮的逻辑规则（目前只有导出按钮用到了此属性）
    validate?: boolean; //是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
    popconfirm?: boolean | PopconfirmAttrs;
    attrs?: BtnAttrs; //按钮属性
  }>(),
  {
    name: "empty",
    // 为undefined不能不写，不然vue会将boolean类型转为false，会导致后续逻辑异常
    customRules: undefined,
    validate: undefined,
    popconfirm: undefined,
  }
);
// const $attrs = useAttrs();
const router = useRouter();
const emits = defineEmits(["click"]);
const newBtn: any = computed(() => {
  const { name, ...restProps } = props;
  return getBtnObj(name, undefined, restProps);
});
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
