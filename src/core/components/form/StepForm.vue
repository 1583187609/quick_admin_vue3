<!-- summary 
  目标：定位为步骤表单。
  功能：结合了分块表单（SectionForm）和步骤条的功能。
-->
<template>
  <div class="step-form f-sb-fs">
    <el-steps class="steps f-0" :direction="direction" :active="currStep" v-bind="{ ...defaultStepsAttrs, ...stepAttrs }">
      <el-step v-bind="step" v-for="(step, ind) in steps" :key="ind" />
    </el-steps>
    <SectionForm
      class="ml-t f-1"
      :sections="sections"
      v-bind="formAttrs"
      @blur="(...args) => $emit('blur', ...args)"
      @focus="handleFocus"
      @change="(...args) => $emit('change', ...args)"
      ref="formRef"
    >
      <template #head-right="scope">
        <slot :name="'head-right-' + (scope.section.prop ?? scope.index + 1)" v-bind="scope" />
      </template>
      <template #body="scope">
        <slot :name="'body-' + scope.section.prop" v-bind="scope" />
      </template>
      <template #field="scope">
        <slot :name="scope.field.prop" v-bind="scope" />
      </template>
      <template #footer v-if="footer">
        <slot name="footer" />
      </template>
    </SectionForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { FormField, FormFieldAttrs, SectionFormItem, SectionFormItemAttrs } from "@/core/components/form/_types";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { CommonObj } from "../_types";

export interface StepItemAttrs {
  title: string;
  description?: string;
}
export type StepDirection = "vertical" | "horizontal";
const defaultStepsAttrs = {
  // direction: 'vertical',
  // space: '',
  // processStatus: "process",
  // finishStatus: 'finish',
  // alignCenter: false,
};
const props = withDefaults(
  defineProps<{
    sections?: SectionFormItem[];
    direction?: StepDirection;
    stepAttrs?: StepItemAttrs;
    formAttrs?: CommonObj; // SectionFormAtrrs;
    footer?: boolean;
  }>(),
  {
    sections: () => [],
    footer: true,
    direction: "vertical",
  }
);
const $emit = defineEmits(["change", "blur", "focus"]);
const formRef = ref<any>(null);
const steps = computed<StepItemAttrs[]>(() => {
  return props.sections
    .filter(it => !!it)
    .map(item => {
      const { title, description } = item as SectionFormItemAttrs;
      return { title, description };
    });
});
const currStep = ref(1); // 当前激活的步骤
function getIsFind(item: FormField, byKey: string) {
  if (!item) return false;
  const { children, prop } = item as FormFieldAttrs;
  if (!children?.length) return prop === byKey;
  return !!children.find(it => getIsFind(it, byKey));
}
// 处理聚焦的逻辑
function handleFocus(val: any, prop: any) {
  const { sections } = props;
  const findInd = sections.findIndex(sItem => {
    if (!sItem) return false;
    const { fields } = sItem as SectionFormItemAttrs;
    return !!fields?.find(it => getIsFind(it, prop));
  });
  currStep.value = findInd + 1;
  $emit("focus", val, prop);
}
defineExpose({
  formRef,
  // 获取配置信息
  // getConfig() {
  //   return { sections: newSections.value };
  // },
});
</script>
<style lang="scss" scoped>
.step-form {
  height: 100%;
  .steps {
    flex-basis: 200px;
    // width: fit-content;
  }
}
</style>
