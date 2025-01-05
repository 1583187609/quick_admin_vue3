<!-- summary
 目标：仅传入name属性，即可享有对应按钮的全部功能（含颜色、文本、图标、权限、默认逻辑等），也可传入属性值进行覆盖，同时提供了快捷属性（to、popoconfirm）。
-->
<template>
  <el-popconfirm @confirm="handleClickDebounce" width="fit-content" v-bind="newBtn?.popconfirm" v-if="newBtn?.popconfirm">
    <template #reference>
      <el-button class="base-btn" v-bind="newBtn.attrs" :disabled="loading || newBtn?.attrs?.disabled" :loading="loading">
        <slot>{{ emptyVals.includes(newBtn?.text) ? "" : newBtn?.text }}</slot>
      </el-button>
    </template>
  </el-popconfirm>
  <el-button
    class="base-btn"
    v-bind="newBtn.attrs"
    :disabled="loading || newBtn?.attrs?.disabled"
    :loading="loading"
    @click="handleClickDebounce"
    v-else
  >
    <slot>{{ emptyVals.includes(newBtn?.text) ? "" : newBtn?.text }}</slot>
  </el-button>
</template>
<script lang="ts" setup>
import { computed, defineAsyncComponent, useAttrs } from "vue";
import { getBtnObj } from "@/core/components/BaseBtn";
import { debounce, emptyVals } from "@/core/utils";
import { useRouter } from "vue-router";
import { CommonObj, FinallyNext, PopconfirmAttrs, RouteTo } from "@/core/_types";
import { BaseBtnType, BtnHandleClickType, EndBtnItem, BtnName } from "./_types";
import { useNextCallback, usePopup } from "@/hooks";
import { ImportCfgAttrs } from "@/core/components/BaseBtn/_components/CommonImport.vue";

const CommonImport = defineAsyncComponent(() => import("@/core/components/BaseBtn/_components/CommonImport.vue"));

const { openPopup, closePopup } = usePopup();
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
    isStand?: boolean; // 是否是标准的按钮属性对象，如果是，则不用再次处理了（用作性能优化场景）
    /**
     * 功能扩展属性
     */
    handleClickType?: BtnHandleClickType; // 例：导入按钮会默认打开弹窗等逻辑，此参数用于设置对点击事件做不同处理
    validateForm?: boolean; // 是否需要进行表单校验（仅当出现在表单项的底部更多按钮中时才生效）
    loading?: boolean; // 是否显示加载图标
    /**
     * 特定按钮的数据或配置信息
     */
    dataAttrs?: ImportCfgAttrs;
    /**
     * 其余属性
     */
    // ...restAttrs 其余属性同el-button的属性
  }>(),
  {
    tpl: "add",
    isDebounce: true,
    // 为undefined不能不写，不然vue会将boolean类型转为false，会导致后续逻辑异常
    handleClickType: undefined,
    validateForm: undefined,
    popconfirm: undefined,
  }
);
const $emit = defineEmits<{
  /**
   * 点击事件
   * @type {tpl: BtnName}
   */
  click: [BtnName, EndBtnItem, FinallyNext, Event];
  change: [BtnName, any, FinallyNext, Event]; // 第二个参数any是导入文件时候的 change 事件接收到的数据
}>();
const newBtn = computed<EndBtnItem>(() => {
  const { isStand, tpl } = props;
  return isStand ? tpl : getBtnObj(tpl, undefined, { attrs: $attrs });
});
// 处理点击事件
function handleClick(e: Event) {
  const { name, to, text, handleClickType: clickType } = newBtn.value;
  const { dataAttrs, handleClickType = clickType } = props;
  if (to === undefined) {
    if (name === "import" && handleClickType) {
      if (handleClickType !== "common") throw new Error(`暂未提供其他导入组件模板`);
      return openPopup("导入文件", [
        CommonImport,
        {
          ...(dataAttrs as ImportCfgAttrs),
          onChange: (arr: CommonObj[]) => $emit("change", name, arr, useNextCallback(text, closePopup), e),
        },
      ]);
    }
    return $emit("click", name, newBtn.value, useNextCallback(text, closePopup), e);
  }
  router.push(to as RouteTo);
}
// 点击事件防抖处理
const handleClickDebounce = newBtn.value.isDebounce || props.isDebounce ? debounce(handleClick, true, 500) : handleClick;
</script>
