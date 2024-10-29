<template>
  <el-drawer v-model="show" class="basic-drawer" :title="isStr ? title : undefined" ref="basicDrawerRef">
    <template #header="scoped" v-if="!isStr">
      <BaseRender :scoped="scoped" :data="title" />
    </template>
    <slot />
    <template #footer="scoped" v-if="footer">
      <FootBtns
        :type="footer"
        @cancel="handleCancel"
        @confirm="handleConfirm"
        v-if="['confirm','alert'].includes(footer as FootBtnsType)"
      />
      <BaseRender :scoped="scoped" :data="footer" v-else />
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { BaseRenderData } from "@/core/BaseRender.vue";
import { popupCloseAnimationDuration, showMessage, typeOf } from "@/core/_utils";
import FootBtns, { FootBtnsType } from "./FootBtns.vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: BaseRenderData;
    footer?: FootBtnsType | BaseRenderData;
    onCancel?: () => void; // 点击取消按钮
    onConfirm?: () => void; // 点击确认按钮
  }>(),
  {
    modelValue: false,
    title: "查看详情",
    footer: "",
  }
);
const $emit = defineEmits(["update:modelValue"]);
const basicDrawerRef = ref<any>(null);
const isStr = computed(() => typeOf(props.title) === "String");
const show = computed({
  get: () => props.modelValue,
  set: (isShow: boolean) => $emit("update:modelValue", isShow),
});
// 点击取消按钮
function handleCancel() {
  if (props.onCancel) return props.onCancel();
  show.value = false;
}
// 点击确认按钮
function handleConfirm() {
  if (props.onConfirm) return props.onConfirm();
  show.value = false;
  showMessage("点击了【确认按钮 - onConfirm】", "info");
}
// 初始化内容区域的高度（以下是从BasicDialog中copy过来的，需要重新改造下才能使用）
// function initBodyHeight() {
//   //必须要延迟一段时间，不然在过渡动画时间中时，获取到的高度会不足动画完成时的最终高度
//   setTimeout(() => {
//     const dialog = basicDialogRef.value.dialogContentRef?.$el;
//     if (!dialog) return;
//     const body = dialog.children[1];
//     const crud = body.children[0];
//     if (!crud) return;
//     const queryTable = crud.getElementsByClassName("query-table")[0];
//     const elScrollBar = crud.getElementsByClassName("el-scrollbar__wrap")[0];
//     if (!queryTable || !elScrollBar) return;
//     const hasVBar = elScrollBar.scrollHeight > queryTable.clientHeight;
//     // 当在dialog中，出现垂直滚动条时，设置height属性才能避免展示条数过多时（此时有额外按钮，筛选条件）时，最后几条条看不到的问题
//     // body.style.height = `calc(100vh - ${cssVars.dialogTop} - ${cssVars.dialogTop} - 58px)`;
//     body.style.height = hasVBar ? getComputedStyle(body).maxHeight : undefined;
//   }, popupCloseAnimationDuration);
// }
// onMounted(() => {
//   initBodyHeight();
// });
</script>
<style lang="scss">
// 抽屉（drawer)
.basic-drawer {
  .el-drawer__header {
    // font-weight: 600;
    margin-bottom: 0;
    padding-bottom: $gap-half;
    // background: $color-bg-light;
    border-bottom: $border-main;
  }
  .el-drawer__title {
    font-size: $font-size-heavyer;
  }
}
</style>
