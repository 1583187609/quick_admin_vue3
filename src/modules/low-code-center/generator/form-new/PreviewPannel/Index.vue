<!-- 预览面板 -->
<template>
  <SectionBox title="预览" class="preview-pannel">
    <template #right>
      <BaseBtn :name="{ name: 'delete', text: '清空数据' }" size="small" @click="$emit('clear')" />
      <el-button type="success" size="small" @click="openPopup('生成设置', [CreateSet])" :disabled="fields.length <= 1">生成文件</el-button>
    </template>
    <BaseForm :fields="fields" v-if="type === 'baseForm'">
      <template #add>
        <el-button style="width: 100%" :icon="Plus" @click="handleAdd">新增</el-button>
      </template>
    </BaseForm>
    <BaseTable :cols="cols" :rows="data" v-else-if="type === 'baseTable'" />
    <SectionForm :sections="data" v-else-if="type === 'sectionForm'" />
    <BaseCrud :fields="data" :cols="cols" v-else-if="type === 'baseCrud'" />
  </SectionBox>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SectionBox from "../_components/SectionBox.vue";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { TableCol } from "@/core/components/table/_types";
import CreateSet from "../_components/CreateSet.vue";
import { usePopup } from "@/hooks";
import { Plus } from "@element-plus/icons-vue";
import DelEdit from "./_components/DelEdit.vue";
import cssVars from "@/assets/styles/_var.module.scss";

const { openPopup } = usePopup();
const props = withDefaults(
  defineProps<{
    data?: any; // CommonObj;
    cols?: TableCol[];
    activeIndex?: number;
  }>(),
  {
    activeIndex: -1,
  }
);
const $emit = defineEmits(["update:modelValue", "add", "del", "edit", "clear"]);
const type = ref("baseForm");
const order = ref(0);
const fields = computed(() => {
  return props.data.map((it, i) => {
    if (it.prop === "add") return it;
    const after = [DelEdit, { onEdit: () => $emit("edit", i), onDel: () => $emit("del", i) }];
    if (it.quickAttrs) {
      it.quickAttrs.after = after;
    } else {
      it.quickAttrs = { after: after };
    }
    it.style = props.activeIndex === i ? `background:${cssVars.colorBgLight};border-radius:${cssVars.radiusMain}` : undefined;
    // it.class = props.activeIndex === i ? "red" : undefined;
    return it;
  });
});
function handleAdd() {
  $emit("add", { prop: `input_${order.value}`, label: `输入框${order.value}` });
  order.value = order.value + 1;
}
</script>
<style lang="scss" scoped>
.red {
  background: red;
}
</style>
