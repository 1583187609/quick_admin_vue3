<!-- 页面-简介 -->
<template>
  <div class="page-view two f-sb-s">
    <SectionForm class="f-2" v-model="model" :fetch="handleFetch" :sections="sections">
      <template #right-0>这是标题右侧的插槽</template>
      <template #zdy="{ form }">
        <el-input placeholder="这是自定义组件" v-model="form.zdy" clearable />
      </template>
      <template #bjnr="{ form }">
        <BaseEditor v-model="form.bjnr" />
      </template>
      <template #tx="{ form }">
        <BaseUpload v-model="form.tx" />
      </template>
    </SectionForm>
    <ul class="f-1 ml-o tips-list">
      <li class="item" v-for="(item, ind) in tipsList" :key="ind">{{ ind + 1 }}、{{ item }}</li>
    </ul>
  </div>
</template>
<script lang="ts" name="TestTwo" setup>
import { ref, reactive, watch, computed } from "vue";
import SectionForm from "@/components/form/SectionForm.vue";
import { SectionFormItem } from "@/components/form";
import { CommonObj } from "@/vite-env";
import { PostAuthRoleList } from "@/api-mock";
import { useDictStore } from "@/store";
import AddDelBtn from "@/components/AddDelBtn.vue";
const { getOpts, getText } = useDictStore();
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
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
const genderOpts = getOpts("Gender");
let model = reactive({
  nl: 24,
  cyxslx: 1,
});
const sections = computed<SectionFormItem[]>(() => {
  const { cyxslx } = model;
  return [
    {
      // prop: "jcxx",
      title: "基础信息",
      // pureText: true,
      popover: "纯文本展示",
      fieldAttrs: { span: 8 },
      fields: [
        {
          prop: "xm",
          label: "姓名",
        },
        {
          prop: "xb",
          label: "性别",
          type: "select",
          options: genderOpts,
        },
        {
          prop: "nl",
          label: "年龄",
          type: "input-number",
          valid: "age",
          attrs: {},
        },
        {
          prop: "dhhm",
          label: "电话",
          valid: "phone",
        },
        {
          prop: "dz",
          label: "地址",
          type: "cascader",
        },
        {
          prop: "hz",
          label: "后缀",
          // attrs: {
          //   style: "50%",
          // },
          // before: "第",
          after: {
            component: AddDelBtn,
            attrs: {
              name: "add",
            },
          },
        },
        {
          prop: "bz",
          label: "备注",
          span: 24,
          attrs: {
            type: "textarea",
          },
        },
      ],
    },
    {
      // prop: "debf",
      title: "第二部分",
      popover: "属性继承（例：disabled）",
      fieldAttrs: { attrs: { disabled: true } },
      fields: [
        { prop: "sfzh", label: "身份证号", valid: "identity", span: 12 },
        {
          prop: "zsbh",
          label: "证书证号",
          span: 12,
          attrs: {
            maxlength: 11,
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
          type: "custom",
          tips: "这是自定义组件，临时用el-input代替",
        },
        { prop: "tx", label: "头像", required: true, type: "custom", span: 12 },
        {
          prop: "zs",
          label: "证书",
          required: true,
          type: "BaseUpload",
          span: 12,
        },
        {
          prop: "cyxslx",
          label: "差异显示类型",
          type: "radio-group",
          tips: "radio-group控件，默认为button样式",
          popover: "点击提交按钮时，有prop，可看到提交参数多嵌套了一层并包裹在prop中，无prop，子级children散开在外层",
          options: [
            { label: "认证方式有prop", value: 1 },
            { label: "认证方式无prop", value: 2 },
          ],
        },
        cyxslx === 1 && {
          prop: "rzfs",
          label: "认证方式",
          children: [
            {
              prop: "isSupportEmail",
              label: "邮箱认证",
              type: "switch",
              labelWidth: "6em",
              attrs: supportSwitchAttrs,
            },
            {
              prop: "isSupportPerson",
              label: "人工认证",
              type: "switch",
              labelWidth: "6em",
              attrs: supportSwitchAttrs,
            },
          ],
        },
        cyxslx === 2 && {
          label: "认证方式",
          children: [
            {
              prop: "isSupportDingTalk",
              label: "钉钉认证",
              type: "switch",
              labelWidth: "6em",
              attrs: supportSwitchAttrs,
            },
            {
              prop: "isSupportFeiShu",
              label: "飞书认证",
              type: "switch",
              labelWidth: "6em",
              attrs: supportSwitchAttrs,
            },
          ],
        },
        { prop: "bjnr", label: "编辑内容", type: "custom" },
        {
          prop: "bz",
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
  console.log(params, "parasms-----------");
  return PostAuthRoleList(params);
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
