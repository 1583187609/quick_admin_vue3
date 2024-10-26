<!-- summary
基础按钮，用于增删改查列表页：中间或表格操作栏的按钮。集成了样式、图标、位置、权限、路由跳转、气泡确认框（popconfirm）等功能。
-->
<template>
  <el-popconfirm @confirm="handleClickDebounce" v-bind="newBtn?.popconfirm" v-if="newBtn?.popconfirm">
    <template #reference>
      <el-button class="base-btn" v-bind="newBtn.attrs">
        <slot>{{ emptyVals.includes(newBtn?.text) ? emptyStr : newBtn?.text }}</slot>
      </el-button>
    </template>
  </el-popconfirm>
  <el-button class="base-btn" v-bind="newBtn.attrs" @click="handleClickDebounce" v-else>
    <slot>{{ emptyVals.includes(newBtn?.text) ? emptyStr : newBtn?.text }}</slot>
  </el-button>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { getBtnObj } from "@/core/BaseBtn";
import { debounce, emptyStr, emptyVals, typeOf } from "@/core/_utils";
import { useRouter } from "vue-router";
import { CommonObj, PopconfirmAttrs } from "@/vite-env";
import { BaseBtnType, BtnHandleClickType, BtnItem, BtnName } from "./_types";

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
    handleClickType?: BtnHandleClickType;
    validate?: boolean; //是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
    popconfirm?: boolean | PopconfirmAttrs;
    isDebounce?: boolean; // 点击是否做防抖处理
    // ...restAttrs 其余属性同el-button的属性
  }>(),
  {
    name: "empty",
    // 为undefined不能不写，不然vue会将boolean类型转为false，会导致后续逻辑异常
    handleClickType: "common",
    validate: undefined,
    popconfirm: undefined,
    isDebounce: true,
  }
);
const $emit = defineEmits<{
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
  const { name, to, handleClickType } = newBtn.value;
  if (to === undefined) return $emit("click", name!);
  const t = typeOf(to);
  router.push(t === "Function" ? (to as Function)(props.data) : to);
}
// 点击事件防抖处理
const handleClickDebounce = props.isDebounce ? debounce(handleClick) : handleClick;
</script>
