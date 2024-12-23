<!-- summary
 目标：仅传入name属性，即可享有对应按钮的全部功能（含颜色、文本、图标、权限、默认逻辑等），也可传入属性值进行覆盖，同时提供了快捷属性（to、popoconfirm）。
-->
<template>
  <el-popconfirm @confirm="handleClickDebounce" width="fit-content" v-bind="newBtn?.popconfirm" v-if="newBtn?.popconfirm">
    <template #reference>
      <el-button class="base-btn" v-bind="newBtn.attrs" :disabled="loading || newBtn?.attrs?.disabled">
        <template #icon><BaseIcon :class="{ rotate: loading }" :name="loading ? 'Loading' : iconName" /></template>
        <slot>{{ emptyVals.includes(newBtn?.text) ? "" : newBtn?.text }}</slot>
      </el-button>
    </template>
  </el-popconfirm>
  <el-button
    class="base-btn"
    v-bind="newBtn.attrs"
    :disabled="loading || newBtn?.attrs?.disabled"
    @click="handleClickDebounce"
    v-else
  >
    <template #icon><BaseIcon :class="{ rotate: loading }" :name="loading ? 'Loading' : iconName" /></template>
    <slot>{{ emptyVals.includes(newBtn?.text) ? "" : newBtn?.text }}</slot>
  </el-button>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { getBtnObj } from "@/core/components/BaseBtn";
import { debounce, emptyStr, emptyVals, typeOf } from "@/core/utils";
import { useRouter } from "vue-router";
import { CommonObj, FinallyNext, PopconfirmAttrs, RouteTo } from "@/core/_types";
import { BaseBtnType, BtnHandleClickType, EndBtnItem, BtnName, BtnItem } from "./_types";
import { useNextCallback, usePopup } from "@/hooks";

const { closePopup } = usePopup();
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
    tpl?: BaseBtnType; // 可以不传值
    to?: string | CommonObj | ((row: CommonObj) => string | CommonObj); // 点击按钮时要跳转的页面地址
    order?: number; // 按钮顺序
    auth?: number[]; // 权限
    popconfirm?: boolean | PopconfirmAttrs;
    isDebounce?: boolean; // 是否对点击做防抖处理
    /**
     * 功能扩展属性
     */
    handleClickType?: BtnHandleClickType; // 例：导入按钮会默认打开弹窗等逻辑，此参数用于设置对点击事件做不同处理
    validate?: boolean; // 是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
    loading?: boolean; // 是否显示加载图标
    // ...restAttrs 其余属性同el-button的属性
  }>(),
  {
    tpl: "empty",
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
   * @type {tpl: BtnName}
   */
  click: [BtnName, EndBtnItem, FinallyNext, Event];
}>();
const iconName = ref<string>();
const newBtn = computed<EndBtnItem>(() => {
  const { tpl } = props;
  const btn = getBtnObj(tpl, undefined, { attrs: $attrs });
  let _icon = btn?.attrs?.icon;
  if (typeof _icon === "object") _icon = _icon.name;
  iconName.value = _icon;
  if (iconName.value) delete btn!.attrs!.icon;
  return btn;
});
// 处理点击事件
function handleClick(e: Event) {
  const { name, to, text } = newBtn.value;
  if (to === undefined) return $emit("click", name, newBtn.value, useNextCallback(text, closePopup), e);
  router.push(to as RouteTo);
}
// 点击事件防抖处理
const handleClickDebounce = props.isDebounce ? debounce(handleClick, true, 500) : handleClick;
</script>
