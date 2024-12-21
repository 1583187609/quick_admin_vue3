import { CommonObj } from "@/core/_types";
import { autoMenus } from "@/router/routes/auto";

const simpleFormFields = [
  { tpl: "T_UserName" },
  { tpl: "T_Gender" },
  { tpl: "T_Age" },
  { prop: "type", label: "类型", type: "select" },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Remark" },
];
const complexFormFields = [
  { tpl: "T_UserName", quickAttrs: { popover: "popover示例" } },
  { tpl: "T_Gender", quickAttrs: { tips: "这是注意事项提示文字" } },
  { tpl: "T_Age", quickAttrs: { popover: "popover示例" } },
  { prop: "type", label: "类型", type: "select", quickAttrs: { popover: "popover示例" } },
  { tpl: "T_EnableStatus", quickAttrs: { popover: "popover示例" } },
  { tpl: "T_Remark", quickAttrs: { popover: "popover示例" } },
];

export const defaultGeneratorTplsNew = {
  // 表单
  1: [
    {
      value: "form1",
      label: "基础表单（简洁）",
      data: {
        fields: simpleFormFields,
        apiId: "1-1",
      },
    },
    {
      value: "form2",
      label: "基础表单（全面）",
      data: {
        fields: complexFormFields,
        apiId: "1-1",
      },
    },
    // {
    //   value: "form1",
    //   label: "分块表单（简洁）",
    //   data: {
    //     sections: [
    //       {
    //         title: "基础信息",
    //         fields: [{ prop: "name", label: "姓名" }],
    //       },
    //       {
    //         title: "更多信息",
    //         fields: [{ prop: "phone", label: "电话" }],
    //       },
    //     ],
    //     apiId: "1-1",
    //   },
    // },
  ],
  // 表格
  2: [
    {
      value: "table1",
      label: "基础表格（简洁）",
      data: {
        cols: [],
        operateBtns: [],
      },
    },
    {
      value: "table2",
      label: "基础表格（全面）",
      data: {
        cols: [],
        operateBtns: [],
      },
    },
  ],
  // 增删改查
  3: [
    {
      value: "crud1",
      label: "增删改查1",
      data: {
        fields: [],
        cols: [],
        extraBtns: [],
        operateBtns: [],
      },
    },
    {
      value: "crud2",
      label: "增删改查2",
      data: {
        fields: [],
        cols: [],
        extraBtns: [],
        operateBtns: [],
      },
    },
  ],
};
// 草稿生成文件模板
export const draftGeneratorTpls = [
  // 表单
  {
    value: "activeForm",
    label: "活动表单",
    children: [
      {
        value: "activeForm1",
        label: "活动1",
        data: {
          fields: [],
          apiId: "1-1",
        },
      },
    ],
  },
  // 表格
  {
    value: "userTable",
    label: "用户表格",
    data: {
      cols: [],
      operateBtns: [],
    },
  },
  // 增删改查
  {
    value: "roleCrud",
    label: "角色增删改查",
    data: {
      fields: [],
      cols: [],
      extraBtns: [],
      operateBtns: [],
    },
  },
];
function getNewTpls(arr: CommonObj[]) {
  if (!arr?.length) return [];
  return arr.map((item, ind) => {
    const { id, children } = item;
    item.value = id;
    if (children?.length) item.children = getNewTpls(children);
    else item.data = { fields: ind % 2 === 0 ? simpleFormFields : complexFormFields, apiId: "1-1", isDraft: Math.random() < 0.1 };
    return item;
  });
}
// 已生效的的生成文件模板
export const sysGeneratorTplsNew = getNewTpls(JSON.parse(JSON.stringify(autoMenus)));
// export const sysGeneratorTpls = [
//   // 表单
//   {
//     value: "commonCenter",
//     label: "通用中心",
//     children: [
//       {
//         value: "tempForm1",
//         label: "临时表单1",
//         data: {
//           fields: [],
//           apiId: "1-1",
//         },
//       },
//       {
//         value: "tempForm2",
//         label: "临时表单2",
//         data: {
//           fields: [],
//           apiId: "1-1",
//         },
//       },
//     ],
//   },
//   // 表格
//   {
//     value: "monitorCenter",
//     label: "监控中心",
//     children: [
//       {
//         value: "tempTable1",
//         label: "临时表格1",
//         data: {
//           cols: [],
//           operateBtns: [],
//         },
//       },
//       {
//         value: "tempTable2",
//         label: "临时表格2",
//         data: {
//           cols: [],
//           operateBtns: [],
//         },
//       },
//     ],
//   },
//   // 增删改查
//   {
//     value: "projectCenter",
//     label: "项目中心",
//     children: [
//       {
//         value: "easyNote",
//         label: "轻松笔记",
//         data: {
//           fields: [],
//           cols: [],
//           extraBtns: [],
//           operateBtns: [],
//         },
//       },
//       {
//         value: "smartEducation",
//         label: "智慧教育",
//         data: {
//           fields: [],
//           cols: [],
//           extraBtns: [],
//           operateBtns: [],
//         },
//       },
//     ],
//   },
// ];
