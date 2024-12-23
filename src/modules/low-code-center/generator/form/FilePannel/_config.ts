import { CommonObj, OptionItem } from "@/core/_types";
import { BtnItem } from "@/core/components/BaseBtn/_types";
import { FormFieldAttrs, SectionFormItemAttrs } from "@/core/components/form/_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { autoMenus } from "@/router/routes/auto";
import { deleteAttrs } from "@/utils";

export function getSubOptions(parOptions: OptionItem[] = [], val: number, omitChildren = true, childrenKey = "children") {
  const opts = parOptions.find(it => it.value === val)?.[childrenKey];
  if (!omitChildren) return opts;
  return opts.map(item => deleteAttrs(item, [childrenKey]));
}
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

type CompType = 1 | 2 | 3; // 1表单 2表格 3查询列表
type FormType = 1 | 2 | 3 | 4; // 1基础表单 2新增/编辑表单 3分块表单 4步骤表单
type TableType = 1 | 2; // 1基础表格 2表单表格
type ListType = 1 | 2 | 3; // 1基础查询列表 2卡片查询列表 3自定义查询列表
type FunType = FormType | TableType | ListType; // 详细类型

interface BasicCompInfo {
  type: number; // 详细类型
  apiId: string; // apiId，例：'1-1'
  defaultValues?: CommonObj; // 默认值
}
// 通用表单
interface FormCompInfo extends BasicCompInfo {
  fields: FormFieldAttrs[]; // 表单字段
}
// 分块表单
interface SectionFormCompInfo extends BasicCompInfo {
  sections: SectionFormItemAttrs[];
}
// 通用表格
interface TableCompInfo extends BasicCompInfo {
  cols: TableColAttrs[];
}
// 通用增删改查
interface CrudCompInfo extends BasicCompInfo {
  fields?: FormFieldAttrs[];
  sections?: SectionFormItemAttrs[];
  cols: TableColAttrs[];
  extraBtns?: BtnItem[];
  operateBtns?: BtnItem[];
}

type AllCompsInfo = FormCompInfo | SectionFormCompInfo | TableCompInfo | CrudCompInfo;
interface VueFileInfo {
  compType: CompType; // 组件类型
  compInfo: AllCompsInfo; // 组件信息
  isDraft?: boolean; // 是否是草稿
  // lastTime?: // 上次修改文件时间
}
export const compTypeOptions: OptionItem[] = [
  {
    label: "表单",
    value: 1,
    children: [
      {
        label: "基础表单",
        value: 1,
        tpls: [
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
        ],
      },
      { label: "新增/编辑表单", value: 2, tpls: [] },
      { label: "分块表单", value: 3, tpls: [] },
      { label: "步骤表单", value: 4, tpls: [] },
    ],
  },
  {
    label: "表格",
    value: 2,
    children: [
      {
        label: "基础表格",
        value: 1,
        tpls: [
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
      },
      { label: "表单表格", value: 2, tpls: [] },
    ],
  },
  {
    label: "查询列表",
    value: 3,
    children: [
      {
        label: "基础查询列表",
        value: 1,
        tpls: [
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
      },
      { label: "卡片查询列表", value: 2, disabled: true, tpls: [] },
      { label: "自定义查询列表", value: 3, disabled: true, tpls: [] },
    ],
  },
];
function getNewTpls(arr: CommonObj[]) {
  if (!arr?.length) return [];
  return arr.map((item, ind) => {
    const { id, children } = item;
    item.value = id;
    if (children?.length) {
      item.children = getNewTpls(children);
    } else {
      const fields = ind % 2 === 0 ? simpleFormFields : complexFormFields;
      const isDraft = Math.random() < 0.1;
      // item.data = { fields, apiId: "1-1", isDraft: Math.random() < 0.1 };
      item.fileInfo = {
        compType: 1,
        compInfo: {
          type: 1,
          apiId: "1-1",
          // defaultValues: undefined,
          fields,
        },
        isDraft,
      } as VueFileInfo;
    }
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
