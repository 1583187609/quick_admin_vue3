<!-- summary 插槽规则
  插槽可接受字符串（等价于default插槽）、对象（键名即为插槽名，值可为字符串、数组、同/异步引入的vue组件，渲染规则见`基础/BaseRender渲染`章节内容）。
  JSON跟实际DOM保持一致嵌套，slots也是。下面的示例中，el-form-item的插槽在最外层的slots中，el-input的插槽在attrs.slots中
 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" :fetch="PostMockCommon" />
</template>
<script lang="ts" setup>
import { reactive, computed, defineAsyncComponent, h } from "vue";
import { PostMockCommon } from "@/api-mock";
import { CommonObj, OptionItem } from "@/core/_types";
import { FormField } from "@/core/components/form/_types";
import ColorsLabel from "./_components/ColorsLabel.vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";

const AsyncColorsLabel = defineAsyncComponent(() => import("./_components/ColorsLabel.vue"));

const slotTypeOpts: OptionItem[] = [
  { value: 0, label: "不使用插槽", desc: "不使用插槽" },
  { value: 1, label: "自定义标签（字符串）", desc: "slots 接收对象，label 为字符串" },
  { value: 2, label: ColorsLabel, desc: "slots 接收对象，label 为引入的vue组件" },
  { value: 3, label: [ColorsLabel, { text: "自定义标签组件" }], desc: "slots 接收对象，label 为引入的vue组件，且支持传参" },
  { value: 4, label: AsyncColorsLabel, desc: "slots 接收对象，label 为引入的异步vue组件" },
];

const modelData = reactive<CommonObj>({ type: 0 });

const fields = computed<FormField[]>(() => {
  const { type } = modelData;
  const { popover, label } = slotTypeOpts[type];
  return [
    // {
    //   prop: "type",
    //   label: "label插槽类型",
    //   type: "radio-group",
    //   options: slotTypeOpts,
    // },
    // ...(type === 0
    //   ? [
    //       {
    //         prop: "label",
    //         label,
    //         quickAttrs: {
    //           popover,
    //         },
    //       },
    //     ]
    //   : [
    //       {
    //         prop: "custom_label",
    //         label: "标签",
    //         quickAttrs: {
    //           popover,
    //         },
    //         slots: {
    //           label,
    //         },
    //       },
    //     ]),
    // {
    //   prop: "content",
    //   label: "内容",
    //   slots: "自定义内容", // 本质等同于 el-form-item 的 default 插槽
    //   quickAttrs: {
    //     popover: "slots 接收字符串",
    //   },
    // },
    // {
    //   prop: "inp_slot_str",
    //   label: "输入框插槽",
    //   attrs: {
    //     slots: {
    //       prepend: "http://",
    //       append: ".com",
    //     },
    //   },
    //   quickAttrs: {
    //     popover: "prepend、append插槽，插槽值为纯字符串",
    //   },
    // },
    // {
    //   prop: "inp_slot_obj",
    //   label: "输入框插槽",
    //   attrs: {
    //     slots: {
    //       prefix: h("el-icon", undefined, Search),
    //       suffix: [ElButton, { type: "primary" }, "搜搜"],
    //     },
    //   },
    //   quickAttrs: {
    //     popover: "prefix、suffix插槽，插槽值为h函数和数组",
    //   },
    // },
  ];
});
</script>
<style lang="scss" scoped></style>
