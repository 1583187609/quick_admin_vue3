<template>
  <el-dialog
    class="basic-dialog"
    :class="{ 'top-compact': !footer }"
    v-model="show"
    v-bind="newAttrs"
    append-to-body
    destroy-on-close
    draggable
    ref="basicDialogRef"
  >
    <!-- <template #header="{ close, titleId, titleClass }" v-if="newAttrs.title">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template> -->
    <slot>
      <BaseRender :data="body" />
    </slot>
    <template #footer v-if="footer">
      <slot name="footer">
        <div class="foot" v-if="footer === true">
          <el-button @click="newAttrs.cancel">取消</el-button>
          <el-button type="primary" @click="newAttrs.confirm"> 确认 </el-button>
        </div>
        <template v-else>
          {{ footer }}
        </template>
      </slot>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, useAttrs, computed, onMounted } from "vue";
import { popupCloseAnimationDuration, showMessage } from "@/components/_utils";
import { useEvent } from "@/hooks";
const defaultAttrs = {
  title: "温馨提示",
  width: "fit-content",
  style: "max-width: 94vw;min-width:200px;", //background:#f2f3f5;
  closeOnClickModal: false,
  cancel() {
    show.value = false;
    // showMessage("点击了【取消按钮 - cancel】", "info");
  },
  confirm() {
    show.value = false;
    showMessage("点击了【确认按钮 - confirm】", "info");
  },
};
const props = withDefaults(
  defineProps<{
    body?: any;
    footer?: any;
  }>(),
  {
    footer: true,
    modelValue: false,
  }
);
const emits = defineEmits(["update:modelValue"]);
const $attrs = useAttrs();
const basicDialogRef = ref<any>(null);
const newAttrs = Object.assign({}, defaultAttrs, $attrs);
const show = computed({
  get() {
    return props.modelValue;
  },
  set(isShow: boolean) {
    emits("update:modelValue", isShow);
  },
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
onMounted(() => {
  initBodyHeight();
});
useEvent("resize", initBodyHeight);
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
  .el-dialog__body {
    padding: $gap;
    max-height: calc(100vh - $dialog-top * 2 - 58px);
    // 当在dialog中，出现垂直滚动条时，才让此属性生效，这样能避免展示条数最多（此时有额外按钮，筛选条件）时，最后一条看不到的问题
    // height: calc(100vh - $dialog-top * 2 - 58px);
    overflow: auto;
  }
  //对话框（dialog）
  .el-dialog__header {
    padding: $gap;
    border-bottom: $border-main;
    margin: 0;
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
