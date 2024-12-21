<!-- 预览面板 -->
<template>
  <SectionBox title="预览" class="preview-pannel" bodyClass="p-h f-fs-s-c" emptyTips="请在左侧选择文件">
    <template #right> {{ menuPathStr }} </template>
    <template v-if="fileInfo">
      <div class="f-sb-c mb-o f-0">
        <div class="mr-a">
          <BaseBtn tpl="add" size="small" @click="handleAdd">新增字段</BaseBtn>
          <BaseBtn tpl="delete" size="small" :disabled="disabled" @click="handleClear">清空字段</BaseBtn>
        </div>
        <div>
          <BaseBtn tpl="submit" type="success" size="small" :disabled="disabled" @click="handleSave">保存草稿</BaseBtn>
          <BaseBtn tpl="submit" type="success" size="small" :disabled="disabled" @click="handleCreateFile" plain>生成文件</BaseBtn>
          <BaseBtn :tpl="isView ? 'edit' : 'view'" size="small" :disabled="disabled" @click="isView = !isView">
            {{ isView ? "编辑" : "预览" }}模式
          </BaseBtn>
        </div>
      </div>
      <BaseForm style="height: calc(100% - 70px)" class="f-1" v-model="modelData" :fields="fields" v-if="type === 'baseForm'"> </BaseForm>
      <BaseTable :cols="cols" :rows="data" v-else-if="type === 'baseTable'" />
      <SectionForm :sections="data" v-else-if="type === 'sectionForm'" />
      <BaseCrud :fields="data" :cols="cols" v-else-if="type === 'baseCrud'" />
    </template>
  </SectionBox>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SectionBox from "../_components/SectionBox.vue";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { TableCol } from "@/core/components/table/_types";
import { usePopup } from "@/hooks";
import DelEdit from "./_components/DelEdit.vue";
import cssVars from "@/assets/styles/_var.module.scss";
import { showMessage, showConfirmMessage, getTreeNodesByValue } from "@/utils";
import { CommonObj } from "@/core/_types";
import { sysGeneratorTplsNew } from "../FilePannel/_config";

const isView = ref<boolean>(true);
const { openPopup } = usePopup();
const props = withDefaults(
  defineProps<{
    data?: any; // CommonObj;
    cols?: TableCol[];
    fileInfo?: CommonObj;
    activeIndex?: number;
    defaultValues?: CommonObj;
  }>(),
  {
    activeIndex: -1,
  }
);
const menuPathStr = computed(() => getTreeNodesByValue(sysGeneratorTplsNew, props.fileInfo?.id).join(" / "));
const routePathStr = computed(() => "/demo-center/comps/form/base-form/basic-use");
const $emit = defineEmits(["update:modelValue", "add", "del", "edit", "clear"]);
const type = ref("baseForm");
const modelData = computed({
  get: () => props.defaultValues,
  set: (val: any) => $emit("update:modelValue", val),
});
const order = ref(0);
const fields = computed(() => {
  return props?.data.map((it, i) => {
    const after = isView.value ? undefined : [DelEdit, { onEdit: () => $emit("edit", i), onDel: () => $emit("del", i) }];
    if (it.quickAttrs) {
      it.quickAttrs.after = after;
    } else {
      it.quickAttrs = { after: after };
    }
    if (!isView.value && props.activeIndex === i) {
      // ;outline:3px solid #3399FF;
      it.style = `background:${cssVars.colorBgLight};border-radius:${cssVars.radiusMain};`;
    } else {
      it.style = undefined;
    }

    return it;
  });
});
const disabled = computed(() => !fields.value.length);
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
<style lang="scss" scoped>
// .red {
//   background: red;
// }
</style>
