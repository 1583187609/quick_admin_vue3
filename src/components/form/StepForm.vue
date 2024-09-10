<!-- 页面-简介 -->
<template>
  <div class="step-form f-sb-fs">
    <el-steps v-bind="{ ...defaultStepsAttrs, ...stepAttrs }" class="steps f-0" :direction="direction" :active="active">
      <el-step v-bind="step" v-for="(step, ind) in steps" :key="ind" />
    </el-steps>
    <SectionForm :sections="sections" class="ml-t f-1" v-bind="formAttrs" ref="formRef">
      <template #head-right="scope">
        <slot :name="'head-right-' + (scope.section.prop ?? scope.index + 1)" v-bind="scope" />
      </template>
      <template #body="scope">
        <slot :name="'body-' + scope.section.prop" v-bind="scope" />
      </template>
      <template #field="scope">
        <slot :name="scope.field.prop" v-bind="scope" />
      </template>
    </SectionForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { SectionFormItem, SectionFormItemAttrs } from "@/components/form/_types";
import SectionForm from "@/components/form/SectionForm.vue";
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
  }>(),
  {
    sections: () => [],
    direction: "vertical",
  }
);
const formRef = ref<any>(null);
const steps = computed<StepItemAttrs>(() => {
  return props.sections
    .filter(it => !!it)
    .map(item => {
      const { title, description } = item as SectionFormItemAttrs;
      return { title, description };
    });
});
const active = ref(1); //当前激活的步骤
defineExpose({
  formRef,
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
