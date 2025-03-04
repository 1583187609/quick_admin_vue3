<!-- 基础表单 -->
<template>
  <div class="q-page-view">
    <BaseForm
      v-model="modelData"
      style="width: 600px"
      :fetch="PostMockCommon"
      :fields="fields"
      :size="modelData.widget_size"
      :labelPosition="modelData.label_position"
      :pureText="false"
      :moreBtns="[
        { name: 'reject', popconfirm: false },
        {
          name: 'noValid',
          text: '不触发表单校验',
          validateForm: false,
          attrs: { type: 'primary', plain: true },
        },
        {
          name: 'jump',
          text: '回到首页',
          to: { name: 'home' },
          attrs: { type: 'primary', link: true },
        },
      ]"
      @moreBtns="handleMoreBtns"
      @change="handleChange"
    >
      <template #inner_tags>
        <AddDelTags v-model="modelData.inner_tags" />
      </template>
      <template #custom_slot>
        <input placeholder="请输入（自定义组件示例）" v-model="modelData.custom_slot" />
      </template>
      <template #custom_item> 完全自定义内容（不会渲染el-form-item） </template>
    </BaseForm>
  </div>
</template>
<script lang="ts" setup>
import { FormField, FormFieldAttrs } from "@/core/components/form/_types";
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { ElMessage, ElButton } from "element-plus";
import BaseIcon from "@/core/components/BaseIcon.vue";
import { handleBtnNext } from "@/utils";
import { treeData, tempAddressOpts } from "./_data";
import CustomPopover from "./_components/CustomPopover.vue";
import AddDelTags from "@/core/components/form/_components/AddDelTags.vue";
import { defaultCommonSize } from "@/core/config";

const innerObjChildren: FormFieldAttrs[] = [
  {
    prop: "one",
    label: "一",
    required: true,
    labelWidth: "0",
    quickAttrs: {
      // grid: 12,
    },
  },
  {
    prop: "two",
    label: "二",
    required: true,
    labelWidth: "0",
    quickAttrs: {
      // grid: 12,
    },
  },
];
const innerArrChildren: FormFieldAttrs[] = [
  {
    prop: "one",
    label: "一",
    required: true,
    labelWidth: "0",
    // attrs: { style: "width:120px" },
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "two",
    label: "二",
    required: true,
    labelWidth: "0",
    // attrs: { style: "width:120px" },
    quickAttrs: {
      grid: 12,
    },
  },
];
//是否支持： 0否;1=是
const supportSwitchAttrs: CommonObj = {
  // activeValue: 1,
  // inactiveValue: 0,
  // inlinePrompt: true,
  activeText: "支持",
  inactiveText: "不支持",
  style: "width: 5em",
};
const authWaysChildren: FormFieldAttrs[] = [
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
];
const modelData = reactive<CommonObj>({
  widget_size: defaultCommonSize,
  label_position: "right",
  inner_obj: {
    one: "嵌套对象必填项一",
    two: "嵌套对象必填项二",
  },
  inner_arr: [{ one: "1", two: "2" }],
  user_name: "张三",
  phone: "18483221518",
  password: "abc123456",
  gender: 1,
  time: ["2023-04-02", "2023-04-07"],
  diff_type: 1,
  row_show_2: 1,
  channel_source: [1, 2],
  join_ways: 2,
  num_min: 1,
  num_max: 2,
  // is_remember: true,
});

const fields = computed<FormField[]>(() => {
  const { diff_type } = modelData;
  return [
    {
      prop: "widget_size",
      label: "组件尺寸",
      type: "radio-group",
      attrs: {
        options: [
          { label: "大型", value: "large" },
          { label: "默认", value: "default" },
          { label: "小型", value: "small" },
        ],
      },
    },
    {
      prop: "label_position",
      label: "标签所处位置",
      type: "radio-group",
      attrs: {
        options: [
          { label: "左侧", value: "left" },
          { label: "右侧", value: "right" },
          { label: "上方", value: "top" },
        ],
      },
    },
    {
      prop: "inner_obj",
      label: "嵌套（对象）",
      type: "BaseAnyEleList",
      // type: 'slot',
      required: true,
      attrs: {
        fields: innerObjChildren,
        hideLabel: true,
      },
    },
    {
      prop: "inner_arr",
      label: "嵌套（数组）",
      type: "BaseAddDelList",
      // type: 'slot',
      required: true,
      attrs: {
        fields: innerArrChildren,
      },
    },
    {
      prop: "inner_tags",
      label: "标签",
      type: "slot",
      quickAttrs: {
        tips: "最多添加3个标签",
      },
    },
    {
      prop: "user_name",
      label: "姓名",
      required: true,
      quickAttrs: {
        tips: "最少传入prop，label两个属性；tips属性设置表单项下方提示信息;设置required: true, 设为必填；设置attrs属性，完全继承于ElementPlus的表单控件属性；",
      },
      attrs: {
        maxlength: 30,
      },
    },
    {
      prop: "gender",
      label: "性别",
      type: "select",
      attrs: {
        options: [
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ],
      },
      quickAttrs: {
        // explain: h("div", { style: "color:red" }, "这是内容"), // 暂时不要用h函数写，会报错
        // explain: ["div", { style: "color:red" }, "这是内容"],
        explain: CustomPopover, // [CustomPopover],
        tips: [
          "div",
          { style: "color:red;line-height:1.4;margin-top:0.5em;" },
          "自定义explain（鼠标放在左侧的问号图标上可查看自定义explain的效果）；传入自定义tips，通过BaseRender渲染",
        ],
      },
    },
    {
      prop: "rate",
      label: "评分",
      type: "rate",
      attrs: {},
    },
    {
      prop: "tree_select",
      label: "树形选择器",
      type: "tree-select",
      attrs: {
        data: treeData,
      },
      quickAttrs: {
        tips: '<span style="color:blue;">支持html字符串渲染 <b>tips</b> 文本内容</span>',
      },
    },
    {
      tpl: "T_Identity",
      prop: "identity",
      label: "身份证号",
      quickAttrs: {
        tips: "explain设置弹出层提示；设置valid，内置身份证、密码等校验；添加example属性，拼接在placeholder后面，作为输入示例",
        explain: "这是explain提示",
        example: "这是拼接在placeholder后面的输入示例",
      },
    },
    {
      tpl: "T_Phone",
      prop: "phone",
      label: "电话号码",
      // required: true,
      attrs: {
        placeholder: "电话号码（这是自定义的placeholder）",
        slots: {
          prefix: "Tel",
        },
      },
      quickAttrs: {
        tips: "prefix插槽插入图标（传入文本）；内置电话号码校验；自定义placeholder",
      },
    },
    {
      tpl: "T_Password",
      prop: "password",
      label: "密码",
      attrs: {
        slots: {
          // prefix: h(BaseIcon, { name: "Lock" }),
          // prefix: h(ElButton, {type: "primary" },'按钮'),
          prefix: [BaseIcon, { name: "Lock" }],
          // prefix: [ElButton, { type: "primary" }, { default: "按钮" }],
        },
      },
      quickAttrs: {
        tips: "prefix插槽插入图标（传入组件）；内置密码校验；",
      },
    },
    {
      prop: "time",
      label: "日期(单prop)",
      type: "date-picker",
      quickAttrs: {
        tips: "默认类型是daterange；prop为字符串时，提交表单时是一个数组",
      },
    },
    {
      prop: ["start_time", "end_time"],
      label: "日期(双prop)",
      type: "date-picker",
      quickAttrs: {
        tips: "props传入数组，提交表单数据时，会被拆成两个字段",
      },
    },
    {
      prop: "birthday",
      label: "出生日期",
      type: "date-picker",
      attrs: {
        type: "date",
      },
    },
    {
      prop: "zdbqsrk",
      label: "自动补全输入框",
      type: "autocomplete",
      attrs: {},
    },
    {
      tpl: "T_Age",
      prop: "age",
      label: "年龄",
      rules: [{ validator: checkAge, trigger: "blur" }],
      quickAttrs: {
        tips: "tpl模板规则（最小值、最大值）和自定义校验规则（必须大于18岁）同时使用；设置after属性，往表单项后面添加内容【岁】（可以是文本或组件）",
      },
    },
    { tpl: "T_Number", quickAttrs: { tips: "输入框类型的数值" } },
    {
      prop: "height",
      label: "身高",
      type: "slider",
      attrs: {
        min: 100,
        max: 200,
      },
    },
    {
      prop: "status",
      label: "是否启用",
      type: "switch",
      attrs: {},
      quickAttrs: {
        tips: "考虑【启用/禁用】用的多，故设为内置switch样式，可通过设置attrs覆盖内置默认样式",
      },
    },
    {
      prop: "channel_source",
      label: "渠道来源",
      type: "checkbox-group",
      attrs: {
        options: [
          { label: "来源1", value: 1 },
          { label: "来源2", value: 2 },
          { label: "来源3", value: 3 },
        ],
      },
    },
    {
      prop: "is_remember",
      label: "是否记住我",
      type: "checkbox",
      attrs: {
        slots: "记住我",
        // slots: {
        //   default: "记住我",
        // },
      },
      quickAttrs: {
        tips: "用slots.default改变多选框右侧的文字（默认跟label一样）",
      },
    },
    {
      prop: "region",
      label: "省市区",
      type: "cascader",
      attrs: {
        options: tempAddressOpts,
      },
    },
    {
      prop: "join_ways",
      label: "参与方式",
      labelWidth: "15em",
      type: "radio-group",
      attrs: {
        type: "",
        options: [
          { label: "方式1", value: 1 },
          { label: "方式2", value: 2 },
          { label: "方式3", value: 3 },
        ],
      },
      quickAttrs: {
        tips: "手动指定label宽度，覆盖自动计算宽度",
      },
    },
    {
      prop: "row_show_1",
      label: "并排展示1",
      quickAttrs: {
        grid: 12,
        tips: "表单项禁用",
      },
      attrs: {
        disabled: true,
      },
    },
    {
      prop: "row_show_2",
      label: "并排展示2",
      type: "select",
      attrs: {
        options: [
          { label: "并排展示选项1", value: 1 },
          { label: "并排展示选项2", value: 2 },
        ],
      },
      quickAttrs: {
        tips: "纯文本展示",
        grid: 12,
        pureText: true,
      },
    },
    {
      prop: "remark",
      label: "备注",
      attrs: {
        type: "textarea",
      },
    },
    // { tpl: "T_Remark" }, // 备注也可以像这样用模板进行简写
    {
      prop: ["num_min", "num_max"],
      label: "内置常用组件",
      type: "BaseNumberRange",
      quickAttrs: {
        explain: "内置常用组件BaseNumberRange",
      },
    },
    {
      prop: "img",
      label: "上传图片",
      type: "BaseUpload",
      // required: true,
    },
    {
      prop: "custom_slot",
      label: "自定义组件",
      type: "slot",
      quickAttrs: {
        tips: "只会自定义表单控件（被el-form-item包裹），设置type:'slot'，通过插槽加入",
      },
    },
    {
      type: "custom",
      renderData: "这是完全自定义的表单项（不被el-form-item包裹）。设置type:'custom'，然后通过插槽加入",
      // renderData: ["div", { style: "color:green" }, "这是完全自定义的表单项（不被el-form-item包裹）。设置type:'custom'，然后通过插槽加入"],
      attrs: {
        style: "font-weight:bolder;font-size:var(--font-size-heavy)",
      },
    },
    {
      prop: "open_time",
      label: "开幕时间",
      type: "time-picker",
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
        explain: "点击提交按钮时，有prop，可看到提交参数多嵌套了一层并包裹在prop中，无prop，子级children散开在外层",
      },
    },
    {
      prop: "auth_ways",
      label: "认证方式",
      type: "BaseAnyEleList",
      attrs: {
        fields: authWaysChildren.slice(...(diff_type === 1 ? [0, 2] : [2])),
      },
    },
  ];
});
function handleChange(val: any, prop: string) {
  if (prop === "diff_type") {
    modelData.diff_type = val;
  }
}
const checkAge = (rule: any, value: any, callback: any) => {
  if (value < 18) {
    callback(new Error("年龄必须大于18岁"));
  } else {
    callback();
  }
};
function handleMoreBtns(name: BtnName, params: CommonObj) {
  const map: CommonObj = {
    noValid: () => handleNoValid(),
  };
  handleBtnNext(map, name);
}
function handleNoValid() {
  ElMessage.warning(`validateForm: false，不触发表单校验`);
}
</script>
<style lang="scss" scoped></style>
