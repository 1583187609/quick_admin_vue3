<!-- summary 
  步骤表单。结合了步骤条和分块表单(SectionForm)的功能
-->
<template>
  <div class="step-form f-sb-fs">
    <el-steps
      class="steps f-0"
      :direction="direction"
      :active="currStep"
      v-bind="{ ...defaultStepsAttrs, ...stepAttrs }"
      ref="stepsRef"
    >
      <el-step v-bind="step" v-for="(step, ind) in steps" :key="ind" />
    </el-steps>
    <SectionForm
      class="ml-t f-1"
      :sections="sections"
      v-bind="formAttrs"
      @blur="(...args) => $emit('blur', ...args)"
      @focus="handleFocus"
      @change="(...args) => $emit('change', ...args)"
      ref="sectionFormRef"
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
import { CommonObj } from "@/core/_types";

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
    formAttrs?: CommonObj; // SectionFormAttrs;
    footer?: boolean;
  }>(),
  {
    sections: () => [],
    footer: true,
    direction: "vertical",
  }
);
const $emit = defineEmits(["change", "blur", "focus"]);
const sectionFormRef = ref<any>(null);
const stepsRef = ref<any>(null);
const steps = computed<StepItemAttrs[]>(() => {
  const sections = props.sections.filter(it => !!it);
  const list = sections.map(item => {
    const { title, description } = item as SectionFormItemAttrs;
    return { title, description };
  });
  return [...list, { title: "完成" }];
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
  stepsRef,
  formRef: sectionFormRef,
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
