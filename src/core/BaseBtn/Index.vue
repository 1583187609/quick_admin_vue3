<!-- summary
 目标：仅传入name属性，即可享有对应按钮的全部功能（含颜色、文本、图标、权限、默认逻辑等），也可传入属性值进行覆盖，同时提供了快捷属性（to、popoconfirm）。
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
import { BaseBtnType, BtnHandleClickType, EndBtnItem, BtnName } from "./_types";

defineOptions({
  inheritAttrs: false,
});

const $attrs = useAttrs();
const router = useRouter();
const props = withDefaults(
  defineProps<{
    /**
     * 基础扩展属性
     */
    name?: BaseBtnType; // 可以不传值
    data?: CommonObj; // 要传递的数据
    order?: number; // 按钮顺序
    auth?: number[]; // 权限
    to?: string | CommonObj | ((row: CommonObj) => string | CommonObj); // 点击按钮时要跳转的页面地址
    popconfirm?: boolean | PopconfirmAttrs;
    isDebounce?: boolean; // 是否对点击做防抖处理
    /**
     * 功能扩展属性
     */
    handleClickType?: BtnHandleClickType; // 例：导入按钮会默认打开弹窗等逻辑，此参数用于设置对点击事件做不同处理
    validate?: boolean; // 是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
    // 同el-button的属性
    // ...restAttrs 其余属性同el-button的属性
  }>(),
  {
    name: "empty",
    handleClickType: "common",
    isDebounce: true,
    // 为undefined不能不写，不然vue会将boolean类型转为false，会导致后续逻辑异常
    validate: undefined,
    popconfirm: undefined,
  }
);
const $emit = defineEmits<{
  /**
   * 点击事件
   * @type {name: BtnName}
   */
  click: [BtnName];
}>();
const newBtn = computed<EndBtnItem>(() => {
  const { name } = props;
  return getBtnObj(name, undefined, { attrs: $attrs });
});
// 处理点击事件
function handleClick() {
  const { name, to } = newBtn.value;
  if (to === undefined) return $emit("click", name!);
  const t = typeOf(to);
  router.push(t === "Function" ? (to as Function)(props.data) : to);
}
// 点击事件防抖处理
const handleClickDebounce = props.isDebounce ? debounce(handleClick) : handleClick;
</script>
