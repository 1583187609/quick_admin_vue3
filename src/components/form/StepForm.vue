<!-- 页面-简介 -->
<template>
  <div class="step-form f-sb-fs">
    <el-steps v-bind="{ ...defaultStepsAttrs, ...stepAttrs }" class="steps f-0" :direction="direction" :active="active">
      <el-step v-bind="step" v-for="(step, ind) in steps" :key="ind" />
    </el-steps>
    <SectionForm :sections="sections" class="ml-t f-1" v-bind="formAttrs">
      <template #head-right="scope">
        <slot :name="'head-right-' + (scope.section.prop ?? scope.index + 1)" v-bind="scope"></slot>
      </template>
      <template #body="scope">
        <slot :name="'body-' + scope.section.prop" v-bind="scope"></slot>
      </template>
      <template #field="scope">
        <slot :name="scope.field.prop" v-bind="scope"></slot>
      </template>
    </SectionForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { SectionFormItem } from "@/components/form/_types";
import SectionForm from "@/components/form/SectionForm.vue";

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
    formAttrs?: SectionFormAtrrs;
  }>(),
  {
    sections: () => [],
    direction: "vertical",
  }
);
const steps = computed<StepItemAttrs>(() =>
  props.sections.map(item => {
    const { title, description } = item;
    return { title, description };
  })
);
const active = ref(1); //当前激活的步骤
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
