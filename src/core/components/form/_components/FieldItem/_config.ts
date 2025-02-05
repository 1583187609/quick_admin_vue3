import { CommonObj } from "@/core/_types";
import { FormFieldAttrs, FormTplType } from "@/core/components/form/_types";
import { defaultRegexp } from "@/core/config";
import { defaultRangeJoinChar } from "@/core/config";
import config from "@/config";

//日期快捷方式
// const defaultDateShortcuts = config.element?.datePicker?.shortcuts?.date ?? [
//   {
//     text: "今天",
//     value: new Date(),
//   },
//   {
//     text: "昨天",
//     value: () => {
//       const date = new Date();
//       date.setTime(date.getTime() - 3600 * 1000 * 24);
//       return date;
//     },
//   },
//   {
//     text: "一周内",
//     value: () => {
//       const date = new Date();
//       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
//       return date;
//     },
//   },
// ];

//日期区间快捷方式
const defaultDateRangeShortcuts = config.element?.datePicker?.shortcuts?.dateRange ?? [
  {
    text: "近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "近一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "近三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

// 当选择同一天时，会以[2024-09-03 00:00:00, 2024-09-03 23:59:59]查询
const defaultTime = config.element?.datePicker?.defaultTime ?? [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)];
const dateRangeMap: CommonObj = {
  daterange: {
    text: "日期",
    attrs: {
      shortcuts: defaultDateRangeShortcuts,
      defaultTime, // 范围选择时选中日期所使用的当日内具体时刻
      // defaultValue: [], //选择器打开时默认显示的时间
    },
  },
  datetimerange: {
    text: "时间",
    attrs: {
      shortcuts: defaultDateRangeShortcuts,
      defaultTime,
    },
  },
  monthrange: {
    text: "月份",
    attrs: {},
  },
};

//覆盖重写el-form-item 的默认属性值
export const defaultFieldAttrs: CommonObj = Object.assign(
  {
    input: {
      attrs: {
        placeholder: "请输入${label}",
        clearable: true,
        showWordLimit: true,
      },
    },
    select: {
      attrs: {
        clearable: true,
        tagType: "primary", // 用户标签类型 success/info/warning/danger/primary
        loadingText: "玩命加载中……",
        getInferredAttrs(field: FormFieldAttrs) {
          return { placeholder: field.attrs?.remote ? "请输入关键字搜索${label}" : "请选择${label}" };
        },
      },
    },
    "tree-select": {
      attrs: {
        placeholder: "请选择${label}",
        clearable: true,
      },
    },
    cascader: {
      attrs: {
        placeholder: "请选择${label}",
        clearable: true,
      },
    },
    "date-picker": {
      attrs: {
        type: "daterange", // 'year' | 'years' |'month' | 'months' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'| 'yearrange'
        rangeSeparator: defaultRangeJoinChar,
        format: "YYYY-MM-DD", // 显示在输入框中的格式。
        valueFormat: "YYYY-MM-DD", // 绑定值的格式。不指定则绑定值为 Date 对象。
        placeholder: "请选择${label}",
        clearable: true,
        getInferredAttrs(field: FormFieldAttrs) {
          const { attrs = {} } = field;
          const { type, format } = attrs;
          const newAttrs: CommonObj = {};
          // 如果 format 为 YYYY-MM-DD HH:mm:ss 类型，则将 type 变为 datetimerange 类型
          if (format?.includes(" ")) newAttrs.type = "datetimerange";
          const newType = newAttrs.type ?? type;
          if (!newType.endsWith("range")) return newAttrs;
          const { text, attrs: selfAttrs } = dateRangeMap[newType];
          newAttrs.startPlaceholder = `开始${text}`;
          newAttrs.endPlaceholder = `结束${text}`;
          Object.assign(newAttrs, selfAttrs);
          return newAttrs;
        },
      },
    },
    "time-picker": {
      attrs: {
        format: "HH:mm:ss", //显示在输入框中的格式
        valueFormat: "HH:mm:ss", //绑定值的格式。 不指定则绑定值为 Date 对象
        placeholder: "请选择${label}",
        rangeSeparator: defaultRangeJoinChar,
        clearable: true,
      },
    },
    "time-select": {
      attrs: {
        placeholder: "请选择${label}",
        clearable: true,
      },
    },
    switch: {
      attrs: {
        activeValue: 1,
        inactiveValue: 0,
        activeText: "启用",
        inactiveText: "禁用",
        inlinePrompt: true,
      },
      quickAttrs: {
        middleFlexGrow: 0,
      },
    },
    checkbox: {
      quickAttrs: {
        middleFlexGrow: 0,
      },
    },
    "checkbox-group": {
      attrs: {
        options: [], // [{ label: "多选项1" }]
      },
      quickAttrs: {
        middleFlexGrow: 0,
      },
    },
    "radio-group": {
      attrs: {
        options: [], // [{ label: "单选项-error" }]
        type: "button",
      },
      quickAttrs: {
        middleFlexGrow: 0,
      },
    },
    "input-number": {
      attrs: {
        placeholder: "${label}",
        // getInferredAttrs(field: FormFieldAttrs) {
        //   const { style = {} } = field.attrs;
        //   const { before, after } = field;
        //   if ((before || after) && !style.width) {
        //     style.flex = 1;
        //     return style;
        //   }
        // },
      },
      quickAttrs: {
        middleFlexGrow: 0,
      },
    },
    // slider: {
    //   attrs: {
    //     // showInput: false,
    //   },
    // },
    autocomplete: {
      attrs: {
        placeholder: "请输入${label}",
        // maxlength: 30,
        clearable: true,
        showWordLimit: true,
        fetchSuggestions(val: string, cb: any) {
          cb([{ label: val, value: val }]);
        },
        // onSelect(item: CommonObj) {
        //   console.log(item);
        // },
      },
    },
    BaseNumberRange: {
      attrs: {},
    },
    BaseUpload: {
      quickAttrs: {
        middleFlexGrow: 0,
      },
    },
    // BaseEditor: {
    //   attrs: { },
    // },
  },
  config.tpls?.formItem
);

/**
 * 获取表单的表单项模板
 * @param type 表单模板类型，可选值：common, query
 * @returns
 */
function getFormItemTpls(type: FormTplType = "common") {
  const isQuery = type === "query";
  return {
    /***** 文本类 *****/
    // id
    T_Id: {
      prop: "id",
      label: "ID",
      attrs: {
        maxlength: 10,
      },
    },
    // 用户姓名
    T_UserName: {
      label: "姓名",
      attrs: {},
    },
    // 备注
    T_Remark: {
      // prop: "remark", // 省略不写，则和键名保持一致
      label: "备注",
      type: "input",
      attrs: {
        type: isQuery ? undefined : "textarea",
        maxlength: 50,
      },
    },
    /***** 日期时间类 *****/
    // 创建时间
    T_CreateTime: {
      prop: "create_time",
      label: "创建时间",
      type: "date-picker",
      attrs: {
        type: isQuery ? "datetimerange" : "datetime",
      },
    },
    /***** 表单校验类 *****/
    //电话号码
    T_Phone: {
      // prop: "phone", // 省略不写，则和键名保持一致
      label: "电话",
      rules: isQuery ? undefined : [{ pattern: defaultRegexp.phone, message: "请输入11位合法的电话号码" }],
      attrs: {
        maxlength: 11,
      },
    },
    //密码
    T_Password: {
      label: "密码",
      ...(isQuery
        ? { attrs: { maxlength: 16 } }
        : {
            rules: [
              { min: 6, message: "密码长度不能小于6位" },
              { pattern: defaultRegexp.password, message: "请输入正确的6~16位字母 + 数字组合密码" },
            ],
            attrs: {
              type: "password",
              maxlength: 16,
              showPassword: true,
            },
          }),
    },
    //15~18位身份证号
    T_Identity: {
      label: "身份证号",
      rules: isQuery
        ? undefined
        : [
            { min: 15, message: "身份证号长度不能小于15位" },
            { pattern: defaultRegexp.identity, message: "请输入正确的15~18位身份证号" },
          ],
      attrs: {
        maxlength: 18,
      },
    },
    //邮箱
    T_Email: {
      label: "邮箱",
      rules: isQuery ? undefined : [{ pattern: defaultRegexp.email, message: "请输入正确的邮箱地址" }],
    },
    /***** 数值类 *****/
    T_Number: {
      label: "数值",
      type: "input",
      rules: [{ type: "number", message: "必须为数字" }],
      attrs: {
        type: "number",
        // max: 99999,
        // maxlength: 6,
      },
    },
    //年龄
    T_Age: {
      label: "年龄",
      ...(isQuery
        ? { type: "BaseNumberRange", attrs: { min: 0, max: 150 } }
        : {
            type: "input-number",
            attrs: { min: 0, max: 150, slots: { suffix: "岁" } },
          }),
    },
    // 数量
    T_Amount: {
      label: "数量",
      ...(isQuery
        ? { type: "BaseNumberRange", attrs: { min: 0, max: 100 } }
        : { type: "input-number", attrs: { min: 0, max: 100, slots: { suffix: "个" } } }),
    },
    // 人民币：最小值为0，保留两位小数
    T_Price: {
      prop: "price",
      label: "价格",
      ...(isQuery
        ? { type: "BaseNumberRange", attrs: { min: 0, max: 99999, precision: 2 } }
        : {
            type: "input-number",
            attrs: {
              min: 0,
              max: 99999,
              precision: 2,
              step: 0.1,
              controlsPosition: "right",
              slots: {
                suffix: "￥", // 单位：元、￥
              },
            },
          }),
    },
    /***** 开关类 *****/
    // 是否开关
    T_YesNoStatus: {
      prop: "is",
      label: "是否",
      ...(isQuery
        ? { type: "select", attrs: { options: "D_YesNoStatus" } }
        : {
            type: "switch",
            attrs: { activeText: "是", inactiveText: "否" },
          }),
    },
    // 是否禁用下拉项
    T_EnableStatus: {
      prop: "status",
      label: "启用状态",
      ...(isQuery
        ? {
            type: "select",
            attrs: { options: "D_EnableStatus" },
          }
        : {
            type: "switch",
            attrs: { activeText: "启用", inactiveText: "禁用" },
          }),
    },
    /***** 枚举类 *****/
    // 性别
    T_Gender: {
      label: "性别",
      type: isQuery ? "select" : "radio-group",
      attrs: {
        options: "D_Gender",
      },
    },
    /***** 级联类 *****/
    // 行政地址
    T_Region: {
      label: "地址",
      type: "cascader",
      attrs: {
        options: "C_Region",
      },
    },
    ...config.tpls?.formItem?.(type),
  };
}

// 表单模板类型映射
export const defaultFormItemTplsMap = {
  common: getFormItemTpls("common"), // 常规表单（新增/编辑表单、分块表单）表单项字段模板
  query: getFormItemTpls("query"), // 查询表单的表单项模板
};
