<!-- 组件 - 创建基础表单 -->
<template>
  <div class="f-sb-fs" style="height: 200px">
    <SectionForm class="create-base-form f-3" v-model="modelData" :sections="sections">
      <template #head-right>
        <BaseBtn name="delete" link icon="" />
      </template>
    </SectionForm>
    <div class="ml-t f-1 f-fs-s-c">
      <h1 class="title f-0">预览</h1>
      <BaseForm class="f-1 ml-o" :fields="fields" disabled></BaseForm>
      <h1 class="title mt-t f-0">JSON</h1>
      <!-- v-model="fieldsStr" -->
      <el-input
        class="f-0"
        type="textarea"
        @click="showMessage('只读，不可编辑', 'warning')"
        @change="handleChange"
        :modelValue="fieldsStr"
        :rows="20"
        placeholder="表单字段项，JSON"
        readonly
        clearable
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject, h } from "vue";
import { FormField, FormFieldAttrs, SectionFormItemAttrs } from "@/core/components/form/_types";
import { CommonObj, OptionItem } from "@/core/_types";
import { exampleMap } from "./_config";
import SectionForm from "@/core/components/form/SectionForm.vue";
import Config from "./_components/Config.vue";
import { omitAttrs, showMessage, typeOf } from "@/utils";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const modelData = reactive<CommonObj>(
  Object.assign(
    {}
    // { prop: "xm", label: "姓名" }
    // { type: "input", required: false, prop: "xm", label: "姓名" }
  )
);
const fields = ref<FormFieldAttrs[]>([]);
const fieldsStr = ref<string>("");
const names = [
  { prop: "xm", label: "姓名" },
  { prop: "xb", label: "性别" },
  { prop: "nl", label: "年龄" },
  { prop: "dh", label: "电话" },
];
const sections = computed<SectionFormItemAttrs[]>(() => {
  const fields: FormField[] = getFields();
  return names.map((item, ind) => {
    // const { prop, label } = modelData?.[ind] ?? {};
    const { prop, label } = item;
    setTimeout(() => {
      modelData[prop].prop = prop;
      modelData[prop].label = label;
    });
    return {
      prop,
      title: `${label || "-"}(${prop || "-"})`,
      fields,
    };
  });
});
watch(
  modelData,
  newVal => {
    newVal = omitAttrs(newVal);
    const values = Object.values(newVal) as FormFieldAttrs[];
    if (!values.some((item: CommonObj) => JSON.stringify(item) === "{}")) {
      fields.value = values;
      fieldsStr.value = JSON.stringify(values);
    }
  },
  { deep: true }
);
function getFields(isChildren = false): FormFieldAttrs[] {
  const showOpts = ["select", "cascader", "checkbox-group"].includes(modelData.type);
  return [
    {
      prop: "attrs",
      label: "属性集",
      attrs: {
        type: "textarea",
        readonly: true,
        onClick: () => openConfigPopup("attrs"),
      },
      quickAttrs: {
        grid: 12,
        example: exampleMap.attrs,
        popover: "属性参见ElementPlus官方文档：https://element-plus.org/zh-CN/component/button.html",
      },
    },
    {
      prop: "rules",
      label: "规则集",
      attrs: {
        type: "textarea",
        readonly: true,
        onClick: () => openConfigPopup("rules"),
      },
      quickAttrs: {
        grid: 12,
        popover: "属性参见ElementPlus官方文档：https://element-plus.org/zh-CN/component/form.html#form-attributes",
        example: exampleMap.rules,
      },
    },
    {
      prop: "children",
      label: "子级元素",
      attrs: {
        type: "textarea",
        readonly: true,
        onClick: () => openConfigPopup("children"),
      },
      quickAttrs: {
        popover: "表单项后面的子元素",
      },
    },
  ].filter((it: FormField) => typeOf(it) === "Object") as FormFieldAttrs[];
}
// 打开配置弹窗
function openConfigPopup(type: string = "") {
  const label = getFields().find(it => it.prop === type)?.label ?? "";
  openPopup(`编辑${label}(${type})`, [Config, { type }]);
}
// openConfigPopup("options");
function handleChange(val: string) {
  //   if (!val) return;
  //   try {
  //     Object.assign(modelData, JSON.parse(val));
  //   } catch (err) {
  //     console.error(err);
  //   }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
}
</style>
