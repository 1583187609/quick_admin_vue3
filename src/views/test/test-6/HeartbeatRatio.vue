<!-- 组件-心动嘉宾比例配置 -->
<template>
  <SectionForm v-model="model" :sections="sections" class="heartbeat-ratio">
    <template #xyh="{ form }">
      <GroupFormItem v-model="form.xyh" />
    </template>
    <template #yzjb="{ form }">
      <GroupFormItem v-model="form.yzjb" />
    </template>
    <template #ptyh="{ form }">
      <GroupFormItem v-model="form.ptyh" />
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { SectionFormItem } from "@/components/form";
import SectionForm from "@/components/form/SectionForm.vue";
import GroupFormItem from "./_components/GroupFormItem.vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
let model = reactive<CommonObj>({
  xyh: [{ jblx: undefined, zb: undefined }],
  yzjb: [{ jblx: undefined, zb: undefined }],
  ptyh: [{ jblx: undefined, zb: undefined }],
});
const sections: SectionFormItem[] = [
  {
    prop: "xyh",
    title: "新用户",
    type: "custom",
  },
  {
    prop: "yzjb",
    title: "优质嘉宾",
    type: "custom",
  },
  {
    prop: "ptyh",
    title: "普通用户",
    type: "custom",
  },
];
</script>
<style lang="scss" scoped>
.heartbeat-ratio {
  width: 480px;
}
</style>
