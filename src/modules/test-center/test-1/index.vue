<!-- 页面-简介 -->
<template>
  <div class="page-view one f-sb-s f-1">
    <BaseForm
      v-model="modelData"
      class="three f-2"
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
      @submit="PostMockCommon"
    >
      <!--也可写成 @submit="handleFetch"，处理转换 请求参数 -->
      <template #zdy>
        <input placeholder="请输入（自定义组件示例）" v-model="modelData.zdy" />
      </template>
    </BaseForm>
    <ul class="f-1 ml-t tips-list">
      <li class="item" v-for="(item, ind) in tipsList" :key="ind">{{ ind + 1 }}、{{ item }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostMockCommon } from "@/api-mock";
import { CommonObj, OptionItem } from "@/core/_types";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { ElMessage, ElButton } from "element-plus";
import BaseIcon from "@/core/components/BaseIcon.vue";
import { handleBtnNext } from "@/utils";
import CustomPopover from "./_components/CustomPopover.vue";

const tempAddressOpts: OptionItem[] = [
  {
    label: "省1",
    value: "1",
    children: [
      {
        label: "市1-1",
        value: "1-1",
        children: [
          { label: "县1-1-1", value: "1-1-1" },
          { label: "县1-1-2", value: "1-1-2" },
        ],
      },
      {
        label: "市1-2",
        value: "1-2",
        children: [
          { label: "县1-2-1", value: "1-2-1" },
          { label: "县1-2-2", value: "1-2-2" },
        ],
      },
      {
        label: "市1-3",
        value: "1-3",
        children: [
          { label: "县1-3-1", value: "1-3-1" },
          { label: "县1-3-2", value: "1-3-2" },
        ],
      },
    ],
  },
  {
    label: "省2",
    value: "2",
    children: [
      { label: "市2-1", value: "2-1" },
      { label: "市2-2", value: "2-2" },
      { label: "市2-3", value: "2-3" },
    ],
  },
];
const tipsList: string[] = [
  "各个功能组件的默认配置可以根据实际项目情况作灵活处理",
  "label宽度自动计算",
  "ElementPlus中的控件属性一律放在attrs中（实现了UI控件属性全继承）",
  "只要保证父级盒子高度的100%可继承，底部按钮（提交、重置）会自动跟随或固定在下方",
  "BaseFrom继承了所有el-form的属性，故可以进行影响全表单项的设置，例：disabled",
  "底部扩展更多按钮，默认均会触发表单校验，可设置validate: false不触发表单校",
];

const treeData = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
//是否支持： 0否;1=是
const supportSwitchAttrs: CommonObj = {
  activeValue: 1,
  inactiveValue: 0,
  activeText: "支持",
  inactiveText: "不支持",
  inlinePrompt: true,
  style: "width: 5em",
};

const modelData = reactive<CommonObj>({
  widget_size: "default",
  label_position: "right",
  inner_obj: {
    one: "嵌套对象必填项一",
    two: "嵌套对象必填项二",
  },
  xm: "张三",
  dhhm: "18483221518",
  mm: "abc123456",
  xb: 1,
  rq: ["2023-04-02", "2023-04-07"],
  cyxslx: 1,
  bpzs2: 1,
  ly: [1, 2],
  cyfs: 2,
  nzcyzj_min: 1,
  nzcyzj_max: 2,
  zdy: [10, 20],
  // jzw: true,
});

const fields = computed<FormField[]>(() => {
  const { cyxslx } = modelData;
  return [
    {
      label: "组件尺寸",
      prop: "widget_size",
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
      label: "标签所处位置",
      prop: "label_position",
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
      label: "嵌套（对象）",
      prop: "inner_obj",
      // required: true,
      children: [
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
      ],
    },
    {
      label: "嵌套（数组）",
      prop: "inner_arr",
      required: true,
      type: "addDel",
      children: [
        {
          prop: "one",
          label: "一",
          required: true,
          labelWidth: "0",
          quickAttrs: {
            grid: 12,
          },
        },
        {
          prop: "two",
          label: "二",
          required: true,
          labelWidth: "0",
          quickAttrs: {
            grid: 12,
          },
        },
      ],
    },
    {
      prop: "xm",
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
      prop: "xb",
      label: "性别",
      type: "select",
      attrs: {
        options: [
          { label: "男", value: 1 },
          { label: "女", value: 2 },
        ],
      },
      quickAttrs: {
        // popover: h("div", { style: "color:red" }, "这是内容"), // 暂时不要用h函数写，会报错
        // popover: ["div", { style: "color:red" }, "这是内容"],
        popover: CustomPopover, // [CustomPopover],
        tips: "自定义popover（鼠标放在左侧的问号图标上可查看自定义popover的效果）",
      },
    },
    {
      prop: "fl",
      label: "树形选择器",
      type: "tree-select",
      attrs: {
        data: treeData,
      },
    },
    {
      tpl: "T_Identity",
      prop: "sfzh",
      label: "身份证号",
      quickAttrs: {
        tips: "popover设置弹出层提示；设置valid，内置身份证、密码等校验；添加example属性，拼接在placeholder后面，作为输入示例",
        popover: "这是popover提示",
        example: "这是拼接在placeholder后面的输入示例",
      },
    },
    {
      tpl: "T_Phone",
      prop: "dhhm",
      label: "电话号码",
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
      prop: "mm",
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
      prop: "rq",
      label: "日期(单prop)",
      type: "date-picker",
      quickAttrs: {
        tips: "默认类型是daterange；prop为字符串时，提交表单时是一个数组",
      },
    },
    {
      prop: ["rq_s", "rq_e"],
      label: "日期(双prop)",
      type: "date-picker",
      quickAttrs: {
        tips: "props传入数组，提交表单数据时，会被拆成两个字段",
      },
    },
    {
      prop: "csrq",
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
      prop: "nl",
      label: "年龄",
      rules: [{ validator: checkAge, trigger: "blur" }],
      quickAttrs: {
        tips: "rulesType（限制最小值、最大值）和自定义校验规则（必须大于18岁）同时使用；设置after属性，往表单项后面添加内容【岁】（可以是文本或组件）",
      },
    },
    {
      prop: "sg",
      label: "身高",
      type: "slider",
      attrs: {
        min: 100,
        max: 200,
      },
    },
    {
      prop: "sfqy",
      label: "是否启用",
      type: "switch",
      attrs: {},
      quickAttrs: {
        tips: "考虑【启用/禁用】用的多，故设为内置switch样式，可通过设置attrs覆盖内置默认样式",
      },
    },
    {
      prop: "ly",
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
      prop: "jzw",
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
      prop: "ssq",
      label: "省市区",
      type: "cascader",
      attrs: {
        options: tempAddressOpts,
      },
    },
    {
      prop: "cyfs",
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
      prop: "bpzs1",
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
      prop: "bpzs2",
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
      prop: "bz",
      label: "备注",
      attrs: {
        type: "textarea",
      },
    },
    {
      prop: ["nzcyzj_min", "nzcyzj_max"],
      label: "内置常用组件",
      type: "BaseNumberRange",
    },
    {
      prop: "sctp",
      label: "上传图片",
      // required: true,
      type: "BaseUpload",
    },
    {
      prop: "zdy",
      label: "自定义组件",
      type: "slot",
      quickAttrs: {
        tips: "设置type:'custom'通过插槽加入自定义组件，并通过v-model绑定表单值",
      },
    },
    {
      prop: "kmsj",
      label: "开幕时间",
      type: "time-picker",
    },
    {
      prop: "cyxslx",
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
  ];
});
function handleChange(prop: string, val: any) {
  if (prop === "cyxslx") {
    modelData.cyxslx = val;
  }
}
const checkAge = (rule: any, value: any, callback: any) => {
  if (value < 18) {
    callback(new Error("年龄必须大于18岁"));
  } else {
    callback();
  }
};
function handleFetch(args: CommonObj) {
  const newArgs = args; //将args整理成后端需要的数据结构，然后传入接口中
  return PostMockCommon(newArgs).then((res: CommonObj) => {
    return res;
  });
}
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
<style lang="scss" scoped>
.tips-list {
  .item {
    &:not(:last-child) {
      margin-bottom: $gap-half;
    }
  }
}
</style>
