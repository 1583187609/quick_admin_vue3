<!-- 组件 - 创建基础表单 -->
<template>
  <div class="f-sb-fs" style="height: 200px">
    <SectionForm class="create-base-form f-3" v-model="model" :sections="sections" debug> </SectionForm>
    <!-- <BaseSection class="create-base-form f-3" title="第一部分">
      <el-form>
        <template v-for="(field, ind) in getFields()" :key="ind">
          <BaseFormItem :field="field" v-model="fieldsArr[ind]" />
        </template>
      </el-form>
    </BaseSection> -->
    <div class="ml-t f-1 f-fs-s-c">
      <h1 class="title f-0">预览</h1>
      <BaseForm class="f-1 ml-o" :fields="fields" disabled></BaseForm>
      <h1 class="title mt-t f-0">JSON</h1>
      <!-- v-model="fieldsStr" -->
      <el-input
        class="f-0"
        type="textarea"
        @change="handleChange"
        :modelValue="fieldsStr"
        :rows="4"
        placeholder="表单字段项，JSON"
        readonly
        clearable
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
import { useDictStore } from "@/store";
import { exampleMap } from "./_config";
import SectionForm from "@/components/form/SectionForm.vue";
import { SectionFormItem, SectionFormItemAttrs } from "@/components/form";
import Config from "./_components/Config.vue";
import { omitAttrs, typeOf } from "@/utils";
const openPopup = inject<any>("openPopup");
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const widgetTypeOpts: OptionItem[] = [
  { label: "输入框", value: "input" },
  { label: "数字输入框", value: "input-number" },
  { label: "选择框", value: "select" },
  { label: "级联", value: "cascader" },
  { label: "多选框", value: "checkbox" },
  { label: "自定义", value: "custom" },
];
const validOpts: OptionItem[] = [
  { label: "电话号码", value: "phone" },
  { label: "身份证号", value: "identity" },
  { label: "密码", value: "password" },
  { label: "邮箱", value: "identity" },
  { label: "年龄", value: "age" },
];
let model = reactive<CommonObj>(
  Object.assign(
    {}
    // { prop: "xm", label: "姓名" }
    // { type: "input", required: false, prop: "xm", label: "姓名" }
  )
);
const { getOpts } = useDictStore();
const yesNoOpts: OptionItem[] = [
  { label: "是", value: true },
  { label: "否", value: false },
];
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
    // const { prop, label } = model?.[ind] ?? {};
    const { prop, label } = item;
    setTimeout(() => {
      model[prop].prop = prop;
      model[prop].label = label;
    });
    return {
      prop,
      title: `${label || "-"}(${prop || "-"})`,
      fields,
    };
  });
});
watch(
  model,
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
  const showOpts = ["select", "cascader", "checkbox-group"].includes(model.type);
  return [
    { prop: "label", label: "标签名", span: 6, required: false },
    { prop: "prop", label: "属性名", span: 6, required: false },
    {
      prop: "type",
      label: "控件类型",
      type: "select",
      span: 6,
      popover: "表单控件类型",
      options: widgetTypeOpts,
    },
    {
      prop: "required",
      label: "是否必填",
      type: "select",
      span: 6,
      options: yesNoOpts,
    },
    {
      prop: "defaultValue",
      label: "默认值",
      span: 6,
      popover: "默认值",
    },
    {
      prop: "example",
      label: "例如文案",
      span: 6,
      popover: "placeholder中的文字，会直接拼在placeholder文字后面",
    },
    {
      prop: "valid",
      label: "校验类型",
      type: "select",
      span: 6,
      popover: "内置的几种常用校验类型，含表单校验规则、属性等",
      options: validOpts,
    },
    {
      prop: "span",
      label: "列宽占位",
      type: "input-number",
      span: 6,
      popover: "每个表单项占位宽度，最小为1，最大,为24",
      attrs: {
        style: "width:100%;",
        min: 1,
        max: 24,
      },
    },
    {
      prop: "pureText",
      label: "是否纯文本",
      type: "select",
      span: 6,
      popover: "展示时，将不会看到输入框等边框，而是以纯文本展示",
      options: yesNoOpts,
    },
    {
      prop: "labelWidth",
      label: "标签宽度",
      span: 6,
      popover: "手动指定标签宽度",
      example: exampleMap.labelWidth,
    },
    {
      prop: "labelHide",
      label: "隐藏标签",
      type: "select",
      span: 6,
      popover: "手动指定标签宽度",
      options: yesNoOpts,
    },
    showOpts && {
      prop: "options",
      label: "下拉项",
      attrs: {
        type: "textarea",
        readonly: true,
        onClick: () => openConfigPopup("options"),
      },
      example: exampleMap.options,
    },
    {
      prop: "attrs",
      label: "属性集",
      span: 12,
      attrs: {
        type: "textarea",
        readonly: true,
        onClick: () => openConfigPopup("attrs"),
      },
      example: exampleMap.attrs,
      popover: "属性参见ElementPlus官方文档：https://element-plus.org/zh-CN/component/button.html",
    },
    {
      prop: "rules",
      label: "规则集",
      span: 12,
      attrs: {
        type: "textarea",
        readonly: true,
        onClick: () => openConfigPopup("rules"),
      },
      popover: "属性参见ElementPlus官方文档：https://element-plus.org/zh-CN/component/form.html#form-attributes",
      example: exampleMap.rules,
    },
    {
      prop: "tips",
      label: "提示文案",
      span: 12,
      popover: "控价下方的提示性文字",
    },
    {
      prop: "tips",
      label: "疑问文案",
      span: 12,
      popover: "鼠标放到标签文字右侧问号图标上时，出现的提示性文字",
    },
    {
      prop: "before",
      label: "前置元素",
      span: 12,
      popover: "每个表单项前面的元素，可以是文本或自定义组件",
      attrs: {
        type: "textarea",
        readonly: true,
        rows: 1,
        onClick: () => openConfigPopup("before"),
      },
    },
    {
      prop: "after",
      label: "后置元素",
      span: 12,
      popover: "每个表单项后面的元素，可以是文本或自定义组件",
      attrs: {
        type: "textarea",
        readonly: true,
        rows: 1,
        onClick: () => openConfigPopup("after"),
      },
    },
    {
      prop: "children",
      label: "子级元素",
      popover: "表单项后面的子元素",
      attrs: {
        type: "textarea",
        readonly: true,
        onClick: () => openConfigPopup("children"),
      },
    },
  ].filter((it: FormField) => typeOf(it) === "Object") as FormFieldAttrs[];
}
//打开配置弹窗
function openConfigPopup(type: string = "") {
  const label = getFields().find(it => it.prop === type)?.label;
  openPopup(`编辑${label || ""}(${type})`, {
    component: Config,
    attrs: {
      type,
    },
  });
}
// openConfigPopup("options");
function handleChange(val: string) {
  //   if (!val) return;
  //   try {
  //     Object.assign(model, JSON.parse(val));
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
