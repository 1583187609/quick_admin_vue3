<!-- summary
基础按钮，用于增删改查列表页：中间或表格操作栏的按钮。集成了样式、图标、位置、权限、路由跳转、气泡确认框（popconfirm）等功能。
-->
<template>
  <el-popconfirm @confirm="handleClick" v-bind="newBtn?.popconfirm" v-if="newBtn?.popconfirm">
    <template #reference>
      <el-button class="base-btn" v-bind="newBtn.attrs">
        <slot>{{ emptyVals.includes(newBtn?.text) ? "-" : newBtn?.text }}</slot>
      </el-button>
    </template>
  </el-popconfirm>
  <el-button class="base-btn" v-bind="newBtn.attrs" @click="handleClick" v-else>
    <slot>{{ emptyVals.includes(newBtn?.text) ? "-" : newBtn?.text }}</slot>
  </el-button>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { getBtnObj } from "@/components/BaseBtn";
import { emptyVals, typeOf } from "@/components/_utils";
import { useRouter } from "vue-router";
import { CommonObj } from "@/vite-env";
import { BaseBtnType, BtnItem, BtnName } from "./_types";
import { PopconfirmAttrs } from "../_types";

defineOptions({
  inheritAttrs: false,
});

const $attrs = useAttrs();
const router = useRouter();
const props = withDefaults(
  defineProps<{
    name?: BaseBtnType; //可以不传值
    data?: CommonObj; //要传递的数据
    order?: number; //按钮顺序
    auth?: number[]; //权限
    to?: string | CommonObj | ((row: CommonObj) => string | CommonObj); //点击按钮时要跳转的页面地址
    customRules?: boolean; //是否自定义该按钮的逻辑规则（目前只有导出按钮用到了此属性）
    validate?: boolean; //是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
    popconfirm?: boolean | PopconfirmAttrs;
    // ...restAttrs 其余属性同el-button的属性
  }>(),
  {
    name: "empty",
    // 为undefined不能不写，不然vue会将boolean类型转为false，会导致后续逻辑异常
    customRules: undefined,
    validate: undefined,
    popconfirm: undefined,
  }
);
const emits = defineEmits<{
  /**
   * 点击事件
   * @type {name: BtnName}
   */
  click: [BtnName];
}>();
const newBtn = computed<BtnItem>(() => {
  const { name } = props;
  return getBtnObj(name, undefined, { attrs: $attrs });
});
// 处理点击事件
function handleClick() {
  const { name, to, customRules } = newBtn.value;
  if (to === undefined) return emits("click", name!);
  const t = typeOf(to);
  router.push(t === "Function" ? (to as Function)(props.data) : to);
}
</script>
<style lang="scss" scoped></style>
