<!-- 预览面板 -->
<template>
  <SectionBox :title="menuPathStr" class="preview-pannel" bodyClass="p-h f-fs-s-c" emptyTips="请在左侧选择文件">
    <template v-if="menuInfo">
      <div class="f-sb-c mb-o f-0">
        <div class="mr-a">
          <BaseBtn tpl="add" size="small" @click="handleAdd">新增</BaseBtn>
          <BaseBtn tpl="delete" size="small" :disabled="isDisabled" @click="handleClear">清空</BaseBtn>
        </div>
        <div>
          <BaseBtn tpl="submit" type="success" size="small" :disabled="isDisabled" @click="handleCreateFile" plain>生成</BaseBtn>
          <BaseBtn :tpl="isView ? 'edit' : 'view'" size="small" :disabled="isDisabled" @click="isView = !isView">
            {{ isView ? "编辑" : "预览" }}
          </BaseBtn>
          <BaseBtn tpl="submit" type="success" size="small" :disabled="isDisabled" @click="handleSave">保存</BaseBtn>
        </div>
      </div>
      <BaseForm style="height: calc(100% - 70px)" class="f-1" v-model="modelData" :fields="fields" v-if="type === 'baseForm'" />
      <BaseTable :cols="tableCols" :data="formFields" v-else-if="type === 'baseTable'" />
      <SectionForm :sections="formSections" v-else-if="type === 'sectionForm'" />
      <BaseCrud :fields="formFields" :cols="tableCols" v-else-if="type === 'baseCrud'" />
    </template>
  </SectionBox>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SectionBox from "../_components/SectionBox.vue";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { TableCol } from "@/core/components/table/_types";
import { cssVars } from "@/utils";
import { showMessage, showConfirmMessage, getTreeNodesByValue } from "@/utils";
import { CommonObj } from "@/core/_types";
import IconBtns, { IconBtnTpl } from "@/core/components/IconBtns.vue";
import { FormFieldAttrs, SectionFormItemAttrs } from "@/core/components/form/_types";
import useTpls from "../../_hooks/useTpls";

const { sysGeneratorTplsNew } = useTpls();
const props = withDefaults(
  defineProps<{
    menuInfo?: CommonObj; // 菜单信息，包含文件（组件）信息
    formFields?: FormFieldAttrs[]; // 表单字段
    formSections?: SectionFormItemAttrs[]; // 分块表单字段
    tableCols?: TableCol[];
    activeIndex?: number;
    defaultValues?: CommonObj;
  }>(),
  {
    activeIndex: -1,
  }
);
const $emit = defineEmits(["update:modelValue", "add", "delete", "edit", "clear"]);
const order = ref(0);
const type = ref("baseForm");
const isView = ref<boolean>(false); // 是否是预览模式
const menuPathStr = computed(() => getTreeNodesByValue(sysGeneratorTplsNew, props.menuInfo?.id).join(" / "));
const routePathStr = computed(() => "/demo-center/comps/form/base-form/basic-use");
const modelData = computed({
  get: () => props.defaultValues,
  set: (val: any) => $emit("update:modelValue", val),
});
const fields = computed(() => getHandleFields(props?.formFields));
const isDisabled = computed(() => !fields.value.length);
function getHandleFields(fields: FormFieldAttrs[]) {
  return fields.map((it, i) => {
    const after = isView.value ? undefined : [IconBtns, { tpl: ["delete", "edit"], onClick: (tpl: IconBtnTpl) => $emit(tpl, i) }];
    if (it.quickAttrs) {
      it.quickAttrs.after = after;
    } else {
      it.quickAttrs = { after: after };
    }
    const isLight = !isView.value && props.activeIndex === i; // 是否高亮显示
    it.style = isLight ? `background:${cssVars.colorBgLight};border-radius:${cssVars.radiusMain};` : undefined;
    return it;
  });
}
function handleCreateFile() {
  const htmlStr = `菜单路径：${menuPathStr.value}<br/>路由信息：${routePathStr.value}`;
  showConfirmMessage(htmlStr, undefined, undefined, "请确认信息").then(res => showMessage("生成成功"));
}
function handleAdd() {
  $emit("add", { prop: `input_${order.value}`, label: `输入框${order.value}` });
  order.value = order.value + 1;
}
function handleClear() {
  $emit("clear");
  order.value = 0;
}
function handleSave() {
  showMessage("点击了保存按钮");
}
</script>
<style lang="scss" scoped></style>
