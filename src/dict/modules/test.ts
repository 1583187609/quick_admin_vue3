import { GetMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";
// import { lazyFetch } from "..";

const tempCascaderOpts = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency",
          },
          {
            value: "feedback",
            label: "Feedback",
          },
          {
            value: "efficiency",
            label: "Efficiency",
          },
          {
            value: "controllability",
            label: "Controllability",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation",
          },
          {
            value: "top nav",
            label: "Top Navigation",
          },
        ],
      },
    ],
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout",
          },
          {
            value: "color",
            label: "Color",
          },
          {
            value: "typography",
            label: "Typography",
          },
          {
            value: "icon",
            label: "Icon",
          },
          {
            value: "button",
            label: "Button",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio",
          },
          {
            value: "checkbox",
            label: "Checkbox",
          },
          {
            value: "input",
            label: "Input",
          },
          {
            value: "input-number",
            label: "InputNumber",
          },
          {
            value: "select",
            label: "Select",
          },
          {
            value: "cascader",
            label: "Cascader",
          },
          {
            value: "switch",
            label: "Switch",
          },
          {
            value: "slider",
            label: "Slider",
          },
          {
            value: "time-picker",
            label: "TimePicker",
          },
          {
            value: "date-picker",
            label: "DatePicker",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker",
          },
          {
            value: "upload",
            label: "Upload",
          },
          {
            value: "rate",
            label: "Rate",
          },
          {
            value: "form",
            label: "Form",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table",
          },
          {
            value: "tag",
            label: "Tag",
          },
          {
            value: "progress",
            label: "Progress",
          },
          {
            value: "tree",
            label: "Tree",
          },
          {
            value: "pagination",
            label: "Pagination",
          },
          {
            value: "badge",
            label: "Badge",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert",
          },
          {
            value: "loading",
            label: "Loading",
          },
          {
            value: "message",
            label: "Message",
          },
          {
            value: "message-box",
            label: "MessageBox",
          },
          {
            value: "notification",
            label: "Notification",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "Menu",
          },
          {
            value: "tabs",
            label: "Tabs",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb",
          },
          {
            value: "dropdown",
            label: "Dropdown",
          },
          {
            value: "steps",
            label: "Steps",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog",
          },
          {
            value: "tooltip",
            label: "Tooltip",
          },
          {
            value: "popover",
            label: "Popover",
          },
          {
            value: "card",
            label: "Card",
          },
          {
            value: "carousel",
            label: "Carousel",
          },
          {
            value: "collapse",
            label: "Collapse",
          },
        ],
      },
    ],
  },
  {
    value: "resource",
    label: "Resource",
    children: [
      {
        value: "axure",
        label: "Axure Components",
      },
      {
        value: "sketch",
        label: "Sketch Templates",
      },
      {
        value: "docs",
        label: "Design Documentation",
      },
    ],
  },
];

const tempTreeOpts = [
  {
    label: "Level one 1",
    value: "1",
    children: [
      {
        label: "Level two 1-1",
        value: "1-1",
        children: [
          {
            label: "Level three 1-1-1",
            value: "1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    value: "2",
    children: [
      {
        label: "Level two 2-1",
        value: "2-1",
        children: [
          {
            label: "Level three 2-1-1",
            value: "2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        value: "2-2",
        children: [
          {
            label: "Level three 2-2-1",
            value: "2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    value: "3",
    children: [
      {
        label: "Level two 3-1",
        value: "3-1",
        children: [
          {
            label: "Level three 3-1-1",
            value: "3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        value: "3-2",
        children: [
          {
            label: "Level three 3-2-1",
            value: "3-2-1",
          },
        ],
      },
    ],
  },
];

export default {
  // 文本类型
  D_TestText: {
    1: "文本1",
    2: "文本2",
  },
  // 数组类型
  D_TestArray: [
    { value: 1, label: "数组1" },
    { value: 2, label: "数组2" },
  ],
  // 对象类型
  D_TestObj: {
    1: {
      text: "对象1",
    },
    2: {
      text: "对象2（带attrs属性）",
      attrs: {
        type: "primary",
      },
    },
  },
  // 写死的级联
  D_TestCascader: tempCascaderOpts,
  // 写死的树
  D_TestTree: tempTreeOpts,
  // 函数类型
  D_TestFunction() {
    return {
      1: "函数1",
      2: "函数2",
    };
  },
  // Promise 类型（返回数组）
  D_TestPromiseArray: new Promise(resolve => {
    resolve([
      { value: 1, label: "数组Promise1" },
      { value: 2, label: "数组Promise2" },
    ]);
  }),
  // Promise 类型（返回对象）
  D_TestPromiseObject: new Promise(resolve => {
    resolve({
      1: "对象Promise1",
      2: "对象Promise2",
    });
  }),
  // 直接请求（不带attrs）
  D_TestFetch: GetMockCommon().then((res: CommonObj) => {
    const list = res.records.slice(0, 5);
    return list.map((item: string, ind: number) => {
      return { label: "直接请求_" + ind, value: ind };
    });
  }),
  // 按需（懒）加载请求（带attrs）
  D_TestFetchLazy() {
    return GetMockCommon().then((res: CommonObj) => {
      const list = res.records.slice(0, 10);
      return list.map((item: string, ind: number) => {
        return { label: "按需请求_" + ind, value: ind };
      });
    });
  },
};
