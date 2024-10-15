<template>
  <el-dialog v-model="show" class="basic-dialog" :class="{ 'top-compact': !footer }" :title="title" ref="basicDialogRef">
    <template #header="scoped" v-if="slots?.header">
      <BaseRender :scoped="scoped" :data="slots.header" />
    </template>
    <slot />
    <template #footer v-if="footer">
      <slot name="footer">
        <div class="foot" v-if="footer === true">
          <el-button v-debounce.immediate="handleCancel">取消</el-button>
          <el-button type="primary" v-debounce.immediate="handleConfirm">确认</el-button>
        </div>
        <BaseRender :data="footer" v-else />
      </slot>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { popupCloseAnimationDuration, showMessage } from "@/components/_utils";
// import { useEvent } from "@/componetns/_hooks";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title?: string;
    footer?: any;
    slots?: any;
    onCancel?: () => void; // 点击取消按钮
    onConfirm?: () => void; // 点击确认按钮
  }>(),
  {
    modelValue: false,
    title: "温馨提示",
    footer: true,
  }
);
const emits = defineEmits(["update:modelValue"]);
const basicDialogRef = ref<any>(null);
const show = computed({
  get: () => props.modelValue,
  set: (isShow: boolean) => emits("update:modelValue", isShow),
});
function initBodyHeight() {
  //必须要延迟一段时间，不然在过渡动画时间中时，获取到的高度会不足动画完成时的最终高度
  setTimeout(() => {
    const dialog = basicDialogRef.value.dialogContentRef?.$el;
    if (!dialog) return;
    const body = dialog.children[1];
    const crud = body.children[0];
    if (!crud) return;
    const queryTable = crud.getElementsByClassName("query-table")[0];
    const elScrollBar = crud.getElementsByClassName("el-scrollbar__wrap")[0];
    if (!queryTable || !elScrollBar) return;
    const hasVBar = elScrollBar.scrollHeight > queryTable.clientHeight;
    // 当在dialog中，出现垂直滚动条时，设置height属性才能避免展示条数过多时（此时有额外按钮，筛选条件）时，最后几条条看不到的问题
    // body.style.height = `calc(100vh - ${cssVars.dialogTop} - ${cssVars.dialogTop} - 58px)`;
    body.style.height = hasVBar ? getComputedStyle(body).maxHeight : undefined;
  }, popupCloseAnimationDuration);
}
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
onMounted(() => {
  initBodyHeight();
});
// useEvent("resize", initBodyHeight);
</script>
<style lang="scss">
.basic-dialog {
  &.el-dialog {
    padding: 0;
  }
  &.top-compact {
    margin: $dialog-top auto;
  }
  .section-form,
  .base-form,
  .base-crud,
  .cell-form {
    height: 100%;
    max-height: calc(100vh - $dialog-top * 2 - 90px);
  }
  //对话框（dialog）
  .el-dialog__header {
    padding: $gap;
    border-bottom: $border-main;
    margin: 0;
  }
  .el-dialog__body {
    padding: $gap;
    max-height: calc(100vh - $dialog-top * 2 - 58px);
    // 当在dialog中，出现垂直滚动条时，才让此属性生效，这样能避免展示条数最多（此时有额外按钮，筛选条件）时，最后一条看不到的问题
    // height: calc(100vh - $dialog-top * 2 - 58px);
    overflow: auto;
  }
}
</style>
<style lang="scss" scoped>
.basic-dialog {
  .foot {
    padding: 0 $gap $gap;
  }
}
</style>
