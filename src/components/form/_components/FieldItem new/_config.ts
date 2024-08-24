// import { h } from "vue";
import { CommonObj } from "@/vite-env";
import { FormFieldAttrs } from "@/components/form/_types";
import { deleteAttrs, getExportData, rangeJoinChar, regexp } from "@/components/_utils";
import config from "@/config";
// import {
//   ElSelect,
//   ElOption,
//   ElInput,
//   ElTreeSelect,
//   ElDatePicker,
//   ElRadioGroup,
//   ElRadioButton,
//   ElRadio,
//   ElCheckboxGroup,
//   ElCheckbox,
//   ElInputNumber,
//   ElSwitch,
//   ElCascader,
//   ElAutocomplete,
//   ElSlider,
//   ElTimePicker,
//   ElTimeSelect,
// } from "element-plus";
// import BaseRender from "@/components/BaseRender.vue";
// import BaseNumberRange from "@/components/BaseNumberRange.vue";
// import BaseUpload from "@/components/upload/BaseUpload.vue";
// import BaseEditor from "@/components/BaseEditor.vue";

const formCfg = config?.form;

// 获取控件映射
// export const getWidgetMap = ({ props, newField, newVal, emits }) => {
//   const { size } = props;
//   const { label, prop, attrs = {}, options = [], extraAttrs = {}, slots } = newField.value;
//   const { before, after } = extraAttrs;
//   const flexClass = before ?? after ? "f-1" : "";
//   const baseAttrs = {
//     "v-model.trim": newVal.value,
//     "v-bind": attrs,
//   };
//   function handleInput(e: any, prop: string) {
//     if (props.inputDebounce) {
//       const inp = e.querySelector("input") || e.querySelector("textarea");
//       const val = inp.value;
//       emits("change", prop, val);
//     }
//   }
//   return {
//     input: [
//       ElInput,
//       {
//         class: flexClass,
//         "v-debounce:input": (e: any) => handleInput(e, prop as string),
//         onClear: () => emits("change", prop, ""),
//         ...baseAttrs,
//       },
//       slots,
//     ],
//     select: [
//       ElSelect,
//       {
//         class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       options?.map((opt, ind) => {
//         const { customOption } = opt;
//         return h(
//           ElOption,
//           {
//             "v-bind": customOption ? deleteAttrs(opt, ["customOption"]) : opt,
//             key: ind,
//           },
//           customOption ? h(BaseRender, { data: customOption }) : undefined
//         );
//       }),
//     ],
//     "tree-select": [
//       ElTreeSelect,
//       {
//         class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//     ],
//     "date-picker": [
//       ElDatePicker,
//       {
//         class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       slots,
//     ],
//     "radio-group": [
//       ElRadioGroup,
//       {
//         // class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       options.map((opt, ind) => {
//         const { type } = attrs;
//         const { label, ...restAttrs } = opt;
//         return h(type === "button" ? ElRadioButton : ElRadio, { key: ind, ...restAttrs }, label);
//       }),
//     ],
//     "checkbox-group": [
//       ElCheckboxGroup,
//       {
//         // class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       options.map((opt, ind) => {
//         const { label, ...restAttrs } = opt;
//         return h(ElCheckbox, { name: prop, key: ind, ...restAttrs }, label);
//       }),
//     ],
//     "input-number": [
//       ElInputNumber,
//       {
//         // class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//     ],
//     switch: [
//       ElSwitch,
//       {
//         // class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//     ],
//     cascader: [
//       ElCascader,
//       {
//         class: flexClass,
//         options,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       slots,
//     ],
//     custom: [
//       "slot",
//       {
//         name: "custom",
//         field: newField.value,
//       },
//       h("div", { class: "color-danger" }, `【自定义】${label}（${prop})`),
//     ],
//     BaseNumberRange: [
//       BaseNumberRange,
//       {
//         class: flexClass,
//         size,
//         onChange: (prop: string, val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//     ],
//     BaseUpload: [
//       BaseUpload,
//       {
//         // class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//     ],
//     // BaseEditor: [
//     //   BaseEditor,
//     //   {
//     //     // class: flexClass,
//     //     onChange: (val: any) => emits("change", prop, val ?? ""),
//     //     ...baseAttrs,
//     //   },
//     // ],
//     autocomplete: [
//       ElAutocomplete,
//       {
//         class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       slots,
//     ],
//     slider: [
//       ElSlider,
//       {
//         class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       slots,
//     ],
//     checkbox: [
//       ElCheckbox,
//       {
//         // class: flexClass,
//         onChange: (val: any) => emits("change", prop, val ?? ""),
//         ...baseAttrs,
//       },
//       slots,
//     ],
//     // "time-picker": [
//     //   ElTimePicker,
//     //   {
//     //     // class: flexClass,
//     //     onChange: (val: any) => emits("change", prop, val ?? ""),
//     //     ...baseAttrs,
//     //   },
//     //   slots,
//     // ],
//     // "time-select": [
//     //   ElTimeSelect,
//     //   {
//     //     // class: flexClass,
//     //     onChange: (val: any) => emits("change", prop, val ?? ""),
//     //     ...baseAttrs,
//     //   },
//     //   slots,
//     // ],
//     empty: [
//       "div",
//       {
//         class: "empty",
//         "v-bind": attrs,
//       },
//     ],
//   };
// };

//日期快捷方式
export const defaultDateShortcuts = getExportData(
  [
    {
      text: "今天",
      value: new Date(),
    },
    {
      text: "昨天",
      value: () => {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        return date;
      },
    },
    {
      text: "一周内",
      value: () => {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        return date;
      },
    },
  ],
  formCfg?.defaultDateShortcuts,
  "alert"
);

//日期区间快捷方式
export const defaultDateRangeShortcuts = getExportData(
  [
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
  ],
  formCfg?.defaultDateRangeShortcuts,
  "alert"
);

//覆盖重写el-form-item 的默认属性值
export const defaultFieldAttrs: CommonObj = getExportData(
  {
    input: {
      attrs: {
        placeholder: "请输入${label}",
        // maxlength: 30,
        clearable: true,
        showWordLimit: true,
      },
    },
    select: {
      attrs: {
        style: {
          // width: "100%",
          minWidth: "150px", // minWidth 在作为表单子项时，是需要设置的，不然宽度会塌陷
        },
        // placeholder: "请选择${label}",
        clearable: true,
        tagType: "primary", // 用户标签类型 success/info/warning/danger/primary
        loadingText: "玩命加载中……",
        getAttrs(field: FormFieldAttrs) {
          const { remote, multiple } = field.attrs || {};
          const multiAttrs = multiple
            ? {
                collapseTags: true,
                collapseTagsTooltip: true,
                maxCollapseTags: 2,
              }
            : undefined;
          return {
            placeholder: remote ? "请输入关键字搜索${label}" : "请选择${label}",
            ...multiAttrs,
          };
        },
      },
      // options: [],
    },
    cascader: {
      attrs: {
        style: { width: "100%" },
        placeholder: "请选择${label}",
        clearable: true,
      },
    },
    "date-picker": {
      attrs: {
        // style: { width: "100%" },
        type: "daterange", // year/month/date/dates/datetime/ week/datetimerange/daterange/monthrange
        rangeSeparator: rangeJoinChar,
        valueFormat: "YYYY-MM-DD",
        placeholder: "请选择${label}",
        clearable: true,
        getAttrs(field: FormFieldAttrs) {
          const { attrs = {} } = field;
          const { type } = attrs;
          const newAttrs: CommonObj = {};
          if (type.includes("range")) {
            const textMap: CommonObj = {
              date: "日期",
              month: "月份",
              datetime: "时间",
            };
            newAttrs.startPlaceholder = `开始${textMap[type.slice(0, -5)]}`;
            newAttrs.endPlaceholder = `结束${textMap[type.slice(0, -5)]}`;
            if (type === "daterange") {
              newAttrs.shortcuts = defaultDateRangeShortcuts;
            }
          } else {
            // newAttrs.placeholder = "请选择${label}";
          }
          return newAttrs;
        },
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
    },
    // checkbox: {
    //   attrs: {},
    // },
    "checkbox-group": {
      attrs: {},
      options: [{ label: "多选项1" }],
    },
    "radio-group": {
      attrs: { type: "button" },
      options: [{ label: "单选项-error" }],
    },
    pureText: {
      attrs: {
        style: { "line-height": "22px", "margin-top": "4px" },
      },
    },
    "input-number": {
      attrs: {
        // style: { width: "100%" },
        placeholder: "${label}",
        // getAttrs(field: FormFieldAttrs) {
        //   const { style = {} } = field.attrs;
        //   const { before, after } = field;
        //   if ((before || after) && !style.width) {
        //     style.flex = 1;
        //     return style;
        //   }
        // },
      },
    },
    slider: {
      attrs: {
        // showInput: false,
      },
    },
    autocomplete: {
      attrs: {
        // style: { width: "100%" },
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
    "time-picker": {
      attrs: {
        // style: { width: "100%" },
        placeholder: "请选择${label}",
        rangeSeparator: rangeJoinChar,
        clearable: true,
      },
    },
    "time-select": {
      attrs: {
        // style: { width: "100%" },
        placeholder: "请选择${label}",
        clearable: true,
      },
    },
    BaseNumberRange: {
      attrs: {
        // style: { width: "100%" },
      },
    },
    // BaseUpload: {
    //   attrs: {},
    // },
    // BaseEditor: {
    //   attrs: {
    // style: { width: "100%" },
    //   },
    // },
  },
  formCfg?.defaultFieldAttrs
);

export const defaultPopoverAttrs: CommonObj = getExportData(
  {
    // placement: "top",
    // title: "Title",
    // width: 300,
    // trigger: "hover",
    // content: "自定义提示内容",
  },
  formCfg?.defaultPopoverAttrs
);

//默认的校验类型
export const defaultValidTypes: CommonObj = getExportData(
  {
    //手机号
    phone: {
      rules: [
        {
          pattern: regexp.phone,
          message: "请输入正确的11位电话号码",
          trigger: "blur",
        },
      ],
      attrs: {
        maxlength: 11,
      },
    },
    //密码
    password: {
      rules: [
        {
          min: 6,
          message: "密码长度不能小于6位",
          trigger: "blur",
        },
        {
          pattern: regexp.password,
          message: "请输入正确的6~16位字母 + 数字组合密码",
          trigger: "blur",
        },
      ],
      attrs: {
        type: "password",
        maxlength: 16,
        showPassword: true,
      },
    },
    //15~18位身份证号
    identity: {
      rules: [
        {
          min: 15,
          message: "身份证号长度不能小于15位",
          trigger: "blur",
        },
        {
          pattern: regexp.identity,
          message: "请输入正确的15/18位身份证号",
          trigger: "blur",
        },
      ],
      attrs: {
        maxlength: 18,
      },
    },
    //邮箱
    email: {
      rules: [
        {
          pattern: regexp.email,
          message: "请输入正确的邮箱地址",
          trigger: "blur",
        },
      ],
    },
    //年龄
    age: {
      type: "input-number",
      attrs: {
        min: 0,
        max: 100,
      },
      extraAttrs: {
        after: "岁",
      },
    },
  },
  formCfg?.defaultValidTypes
);