<!-- 页面-简介 -->
<template>
  <BaseForm
    @change="handleChange"
    v-model="modelData"
    class="add-file-config"
    style="width: 800px"
    submitBtn="确定"
    :fields="fields"
    @submit="handleSubmit"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { sysGeneratorTplsNew, compTypeOptions } from "../_config";
import { deleteAttrs, getTreeNodeByValue, getTreeNodesByValue } from "@/core/utils";
import { getGroupApiOpts } from "../../_config";
import { OptionItem } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";

const apiOpts: OptionItem[] = getGroupApiOpts();

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {}
);
const $emit = defineEmits(["confirm"]);
const modelData = reactive<CommonObj>({
  compType: 1,
  contType: 1,
  menu_path: getTreeNodesByValue(sysGeneratorTplsNew, 1).join(" / "),
  route_path: "/demo-center/comps/form/base-form/basic-use",
  ...props.data,
});
function getSubOptions(parOptions: OptionItem[] = [], val: number, omitChildren = true, childrenKey = "children") {
  const opts = parOptions.find(it => it.value === val)?.[childrenKey];
  if (!omitChildren) return opts;
  return opts.map(item => deleteAttrs(item, [childrenKey]));
}
const fields = computed<FormFieldAttrs[]>(() => {
  const { compType, contType } = modelData;
  const contTypeOpts = getSubOptions(compTypeOptions, compType); // compTypeOptions.find(it => it.value === compType)?.children;
  return [
    { prop: "menu_path", label: "菜单路径", quickAttrs: { pureText: true } },
    { prop: "route_path", label: "路由路径", quickAttrs: { pureText: true } },
    { prop: "cn_name", label: "中文名称", required: true, attrs: { maxlength: 10 }, quickAttrs: { grid: 12 } },
    { prop: "en_name", label: "英文名称", required: true, attrs: { maxlength: 10 }, quickAttrs: { grid: 12 } },
    {
      prop: "compType",
      label: "组件类型",
      type: "radio-group",
      required: true,
      attrs: {
        options: compTypeOptions,
      },
    },
    {
      prop: "contType",
      label: "详细类型",
      type: "radio-group",
      required: true,
      attrs: {
        options: contTypeOpts,
      },
    },
    {
      prop: "tpl",
      label: "模板",
      type: "select",
      attrs: {
        options: contTypeOpts?.find(it => it.value === contType).tpls,
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
function handleChange(val: any, prop: string) {
  if (prop === "compType") {
    modelData.contType = compTypeOptions.find(it => it.value === val)?.children[0].value;
  } else if (prop === "tpl") {
    //
  }
}
function handleSubmit(data: CommonObj, next: FinallyNext) {
  $emit("confirm", props.data.type, data, next);
}
</script>
<style lang="scss" scoped></style>
