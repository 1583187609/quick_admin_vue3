<!-- 页面-简介 -->
<template>
  <BaseForm v-model="modelData" class="add-file-config" style="width: 800px" :fields="fields" @submit="handleSubmit"> </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { defaultGeneratorTplsNew } from "../_config";
import { getTreeNodeByValue } from "@/core/utils";
import { getGroupApiOpts } from "../../_config";

const apiOpts: OptionItem[] = getGroupApiOpts();

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {}
);
const $emit = defineEmits(["confirm"]);
const modelData = reactive<CommonObj>({
  contType: 1,
  ...props.data,
});
const fields: FormFieldAttrs[] = computed(() => {
  const { contType } = modelData;
  return [
    { prop: "name", label: "名称", required: true, attrs: { maxlength: 10 } },
    {
      prop: "contType",
      label: "类型",
      type: "radio-group",
      required: true,
      attrs: {
        options: [
          { label: "表单", value: 1 },
          { label: "表格", value: 2 },
          { label: "增删改查", value: 3 },
        ],
      },
    },
    {
      prop: "tpl",
      label: "模板",
      type: "select",
      attrs: {
        options: defaultGeneratorTplsNew[contType],
      },
    },
    {
      prop: "api",
      label: "Api",
      type: "select",
      attrs: {
        options: apiOpts,
        filterable: true,
      },
      quickAttrs: {
        popover: "调用的接口",
        example: "/mock/user",
      },
    },
  ];
});
function handleSubmit(data: CommonObj, next: FinallyNext) {
  $emit("confirm", props.data.type, data, next);
}
</script>
<style lang="scss" scoped></style>
