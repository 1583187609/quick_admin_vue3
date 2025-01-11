<!-- 页面-简介 -->
<template>
  <div class="q-page-view two f-sb-s">
    <SectionForm class="f-2" v-model="modelData" :fetch="handleFetch" :sections="sections">
      <template #head-right-0>这是标题右侧的插槽</template>
      <template #zdy>
        <input placeholder="这是自定义组件" v-model="modelData.zdy" style="border: 1px solid purple" />
      </template>
      <template #edit_content>
        <BaseEditor v-model="modelData.edit_content" />
      </template>
    </SectionForm>
    <ul class="f-1 ml-o tips-list">
      <li class="item" v-for="(item, ind) in tipsList" :key="ind">{{ ind + 1 }}、{{ item }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { FormFieldAttrs, SectionFormItem } from "@/core/components/form/_types";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { CommonObj } from "@/core/_types";
import { PostMockCommon } from "@/api-mock";
import IconBtns from "@/core/components/IconBtns.vue";
import { showMessage } from "@/utils";

const tipsList: string[] = ["section块之间span属性功能完善", "label宽度根据各个section块决定"];
//是否支持： 0否;1=是
const supportSwitchAttrs: CommonObj = {
  activeValue: 1,
  inactiveValue: 0,
  activeText: "支持",
  inactiveText: "不支持",
  inlinePrompt: true,
  style: "width: 5em",
};
const authWaysChildrenFields: FormFieldAttrs[] = [
  {
    prop: "isSupportEmail",
    label: "邮箱认证",
    type: "switch",
    // labelWidth: "6em",
    attrs: supportSwitchAttrs,
  },
  {
    prop: "isSupportPerson",
    label: "人工认证",
    type: "switch",
    // labelWidth: "6em",
    attrs: supportSwitchAttrs,
  },
  {
    prop: "isSupportDingTalk",
    label: "钉钉认证",
    type: "switch",
    // labelWidth: "6em",
    attrs: supportSwitchAttrs,
  },
  {
    prop: "isSupportFeiShu",
    label: "飞书认证",
    type: "switch",
    // labelWidth: "6em",
    attrs: supportSwitchAttrs,
  },
];
const modelData = reactive<CommonObj>({
  age: 24,
  diff_type: 1,
});
const sections = computed<SectionFormItem[]>(() => {
  const { diff_type } = modelData;
  return [
    {
      // prop: "jcxx",
      title: "基础信息",
      popover: "纯文本展示和禁用展示",
      fields: [
        {
          prop: "user_name",
          label: "姓名",
          quickAttrs: {
            grid: 8,
            pureText: true,
          },
        },
        {
          prop: "gender",
          label: "性别",
          type: "select",
          attrs: {
            options: "D_Gender",
          },
          quickAttrs: {
            grid: 8,
            pureText: true,
          },
        },
        {
          tpl: "T_Age",
          prop: "age",
          label: "年龄",
          type: "input-number",
          labelWidth: "4em",
          quickAttrs: {
            grid: 8,
            pureText: true,
          },
        },
        {
          tpl: "T_Price",
          prop: "price",
          label: "价格",
          labelWidth: "4em",
          attrs: {
            disabled: true,
          },
          quickAttrs: {
            grid: 12,
          },
        },
        {
          tpl: "T_Phone",
          prop: "phone",
          label: "电话",
          labelWidth: "4em",
          attrs: {
            disabled: true,
          },
          quickAttrs: {
            grid: 12,
          },
        },
      ],
    },
    {
      prop: "debf",
      title: "第二部分",
      popover: "属性嵌套，数据会挂载在debf属性下",
      fields: [
        {
          tpl: "T_Identity",
          prop: "sfzh",
          label: "身份证号",
          quickAttrs: {
            grid: 12,
          },
        },
        {
          prop: "zsbh",
          label: "证书证号",
          quickAttrs: {
            grid: 12,
          },
          attrs: {
            maxlength: 11,
          },
        },
        {
          prop: "address",
          label: "地址",
          type: "cascader",
          attrs: {
            options: "C_Region",
          },
        },
        {
          prop: "after_fix",
          label: "后缀",
          // attrs: {
          //   style: "50%",
          // },
          quickAttrs: {
            // before: "第",
            // after: h(IconBtns, { tpl: "add" }),
            after: [
              IconBtns,
              {
                tpl: "add",
                onClick(name: string) {
                  showMessage(`点击了${name}按钮`, "info");
                },
              },
            ],
          },
        },
        {
          prop: "remark",
          label: "备注",
          quickAttrs: {
            grid: 24,
          },
          attrs: {
            type: "textarea",
          },
        },
      ],
    },
    {
      // prop: "dsbf",
      title: "第三部分",
      popover: "正常表单配置",
      fields: [
        {
          prop: "zdy",
          label: "自定义组件",
          type: "slot",
          quickAttrs: {
            tips: "这是自定义组件，临时用el-input代替",
          },
        },
        {
          prop: "tx",
          label: "头像",
          required: false,
          type: "BaseUpload",
          quickAttrs: {
            grid: 12,
          },
        },
        {
          prop: "zs",
          label: "证书",
          required: false,
          type: "BaseUpload",
          quickAttrs: {
            grid: 12,
          },
        },
        {
          prop: "diff_type",
          label: "差异显示类型",
          type: "radio-group",
          attrs: {
            options: [
              { label: "认证方式有prop", value: 1 },
              { label: "认证方式无prop", value: 2 },
            ],
          },
          quickAttrs: {
            tips: "radio-group控件，默认为button样式",
            popover: "点击提交按钮时，有prop，可看到提交参数多嵌套了一层并包裹在prop中，无prop，子级children散开在外层",
          },
        },
        {
          prop: "auth_ways",
          label: "认证方式",
          type: "BaseAnyEleList",
          attrs: {
            fields: authWaysChildrenFields.slice(...(diff_type === 1 ? [0, 2] : [2])),
          },
        },
        {
          prop: "edit_content",
          label: "编辑内容",
          type: "slot",
          rules: [{ maxlength: 10, message: "不能超过10个字符", trigger: "change" }],
          quickAttrs: {
            popover: "不能超过最大字符数校验",
          },
        },
        {
          prop: "remark",
          label: "备注",
          attrs: {
            type: "textarea",
            maxlength: 100,
          },
        },
      ],
    },
  ];
});
//外层套用一层函数，可将参数进行转化处理再执行请求，也可传入handleParams属性
function handleFetch(params: CommonObj) {
  return PostMockCommon(params);
}
</script>
<style lang="scss" scoped>
.tips-list {
  .item {
    &:not(:last-child) {
      margin-bottom: $gap-half;
    }
  }
}
</style>
