import { CommonObj, OptionItem } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { defaultFormItemType, sortObjArrByKey, typeOf } from "@/utils";
import _ from "lodash";

const { merge } = _;

/**
 * 属性配置映射
 * @param {number} frequency 排序，数字越小越靠前
 * @param {number} frequency 0 默认值 0-99 常用 100 ~ 199 偶尔用 200~299 几乎不用（区间设为100，考虑后续扩展，或通过计算得出百分比）
 */
interface WidgetPropAttrs {
  tpl?: string; // 模板名称
  value: string; // 值
  label: string; // 描述类文案
  frequency?: number; // 使用频率。0 代表默认值 0-99 常用 100 ~ 199 偶尔用 200~299 几乎不用（区间设为100，考虑后续扩展，或通过计算得出百分比）
  remark?: string; // 备注（提示）信息
  effect?: CommonObj; // 是否生效
  example?: string | string[]; // 示例
  enums?: OptionItem[]; // 枚举类型
  defaultValue?: string;
  link?: string; // 参考链接
  status?: 0 | 1 | 2; // 0 已废弃 1 使用中 2 实验中
  type?: "boolean" | "natural";
}
type WidgetProp = WidgetPropAttrs | string;
// 公共属性（模板属性）
const widgetAttrsTpls: CommonObj = {
  placeholder: {
    label: "占位文本",
    frequency: 0,
  },
  // tabindex: {
  //   label: "",
  //   remark: "原生属性",
  //   frequency: 0,
  // },
  "model-value/v-model": {
    label: "选中项绑定值",
    remark: "",
    frequency: 0,
  },
  clearable: { label: "清除按钮", type: "boolean", frequency: 0 },
  // name: { label: "", remark: "原生属性", frequency: 0 },
  autocomplete: { label: "自动填充", remark: "原生属性", type: "boolean", frequency: 10000 },
  disabled: { label: "是否禁用", remark: "", type: "boolean" },
  size: {
    label: "尺寸大小",
    enums: [
      { label: "小型", value: "small" },
      { label: "中等", value: "middle" },
      { label: "大型", value: "large" },
    ],
    remark: "",
  },
  readonly: { label: "是否只读", remark: "", type: "boolean", frequency: 10000 },
};
// 控件属性
const widgetAttrsMap: CommonObj = {
  input: [
    // "model-value/v-model",
    // {
    //   value: "type",
    //   label: "类型",
    //   frequency: 0,
    //   enums: [
    //     { value: "text", label: "文本", frequency: 0 },
    //     { value: "textarea", label: "文本域", frequency: 1 },
    //     { value: "password", label: "密码", frequency: 1 },
    //     { value: "number", label: "数字", frequency: 1 },
    //     { value: "file", label: "文件", frequency: 100 },
    //     { value: "checkbox", label: "多选框", frequency: 200 },
    //     { value: "radio", label: "单选框", frequency: 201 },
    //     { value: "button", label: "按钮", frequency: 202 },
    //   ],
    // },
    {
      value: "show-word-limit",
      label: "输入字数",
      frequency: 0,
      type: "boolean",
      effect: { type: ["text", "textarea"] },
    },
    { value: "minlength", label: "最小长度", type: "natural", frequency: 1 },
    { value: "maxlength", label: "最大长度", type: "natural", frequency: 2 },
    "placeholder",
    { tpl: "clearable", effect: { "type|not": ["textarea"] } },
    { value: "formatter", label: "输入值格式", effect: { type: ["text"] }, frequency: 10000 },
    // { value: "parser", label: "指定从格式化器输入中提取的值", effect: { type: ["text"] } },
    { value: "show-password", label: "密码图标", type: "boolean", effect: { type: ["password"] } },
    "disabled",
    { tpl: "size", effect: { "type|not": ["textarea"] } },
    { value: "prefix-icon", label: "前缀图标", frequency: 10000 },
    { value: "suffix-icon", label: "后缀图标", frequency: 10000 },
    { value: "rows", label: "显示行数", type: "natural", effect: { type: ["textarea"] } },
    {
      value: "autosize",
      label: "自适应高度",
      type: "boolean",
      example: ["{ minRows: 2, maxRows: 6 }"],
      effect: { type: ["textarea"] },
      frequency: 10000,
    },
    "autocomplete",
    // "name",
    "readonly",
    { value: "max", label: "最大值", type: "natural", remark: "原生属性" },
    { value: "min", label: "最小值", type: "natural", remark: "原生属性" },
    { value: "step", label: "数字间隔", type: "natural", effect: { type: ["number"] }, remark: "原生属性", frequency: 10000 },
    { value: "resize", label: "能否被缩放", type: "boolean", frequency: 10000 },
    { value: "autofocus", label: "自动获取焦点", type: "boolean", remark: "原生属性", frequency: 10000 },
    // { value: "form", label: "原生属性" },
    // { value: "aria-label", label: "", remark: "原生属性" },
    // "tabindex",
    // { value: "validate-event", label: "输入时是否触发表单的校验" },
    // { value: "input-style", label: "", remark: "input元素或textarea元素的 style" },
    // { value: "label", label: "", remark: "原生属性" },
  ],
  select: [
    // "model-value/v-model",
    { value: "multiple", label: "是否多选", remark: "" },
    "disabled",
    "size",
    // { value: "value-key", label: "", remark: "作为 value 唯一标识的键名，绑定值为对象类型时必填" },
    "clearable",
    // { value: "collapse-tags多选时是否将选中值按文字的形式展示", label: "", remark: "" },
    {
      value: "collapse-tags-tooltip",
      label: "当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签",
      remark: "要使用此属性，collapse-tags属性必须设定为 true",
    },
    // {
    //   value: "multiple-limitmultiple",
    //   label: "",
    //   remark: "属性设置为 true 时，代表多选场景下用户最多可以选择的项目数，为0则不限制",
    // },
    // "name",
    "autocomplete",
    "placeholder",
    {
      value: "effecttooltip",
      label: "主题",
      enums: [
        { value: "dark", label: "dark" },
        { value: "light", label: "light" },
      ],
    },
    { value: "filterable", label: "是否可筛选", remark: "" },
    { value: "allow-create", label: "是否允许用户创建新条目", effect: [], remark: "只有当 filterable 设置为 true 时才会生效。" },
    { value: "filter-method", label: "自定义筛选方法", remark: "" },
    { value: "remote", label: "远程加载选项", remark: "" },
    { value: "remote-method", label: "自定义远程搜索方法", remark: "" },
    { value: "remote-show-suffix", label: "远程搜索方法显示后缀图标", remark: "" },
    { value: "loading", label: "远程获取数据加载状态", remark: "" },
    { value: "loading-text", label: "从服务器加载数据时显示的文本", remark: "", defaultValue: "Loading" },
    {
      value: "no-match-text",
      label: "搜索条件无匹配时显示的文字",
      remark: "也可以使用 empty 插槽设置",
      defaultValue: "No matching data",
    },
    {
      value: "no-data-text",
      label: "无选项时显示的文字",
      remark: "也可以使用 empty 插槽设置自定义内容",
      defaultValue: "No data",
    },
    { value: "popper-class", label: "选择器下拉菜单的自定义类名", remark: "" },
    // {
    //   value: "reserve-keyword",
    //   label: "",
    //   remark: "当 multiple 和 filterable被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词",
    // },
    {
      value: "default-first-option",
      label: "是否在输入框按下回车时，选择第一项",
      remark: "需配合 filterable 或 remote 使用",
    },
    { value: "teleported", label: "是否使用 teleport", remark: "设置成 true则会被追加到 append-to 的位置" },
    { value: "append-to", label: "挂载元素", remark: "下拉框挂载到哪个 DOM 元素" },
    // { value: "persistent", label: "", remark: "当下拉选择器未被激活并且persistent设置为false，选择器会被删除" },
    // { value: "automatic-dropdown", label: "", remark: "对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单" },
    { value: "clear-icon", label: "自定义清除图标", remark: "" },
    // { value: "fit-input-width", label: "", remark: "下拉框的宽度是否与输入框相同" },
    { value: "suffix-icon", label: "自定义后缀图标组件", remark: "" },
    { value: "tag-type", label: "标签类型", remark: "" },
    { value: "tag-effect", label: "标签效果", remark: "" },
    { value: "validate-event", label: "是否触发表单验证", remark: "" },
    { value: "offset", label: "下拉面板偏移量", remark: "" },
    { value: "show-arrow", label: "下拉菜单的内容是否有箭头", remark: "" },
    { value: "placement", label: "下拉框出现的位置", remark: "" },
    // { value: "bottom-start", label: "", remark: "" },
    { value: "fallback-placements", label: "可用的 positions", remark: "请查看popper.js 文档" },
    {
      value: "max-collapse-tags",
      label: "需要显示的 Tag 的最大数量",
      remark: "只有当 collapse-tags 设置为 true 时才会生效",
      effect: [],
    },
    // { value: "aria-label", label: "", remark: "原生属性" },
    { value: "empty-values", label: "空值", link: "参考config-provider" },
    { value: "value-on-clear", label: "清空选项", link: "参考config-provider" },
    // { value: "suffix-transition", label: "下拉菜单显示/消失时后缀图标的动画", remark: "", status:0 }, // 已废弃
    // "tabindex",
  ],
};

function getStandardAttrsItem(simpleProps: WidgetProp): WidgetPropAttrs {
  const t = typeOf(simpleProps);
  if (t === "String") {
    const tplProps = widgetAttrsTpls[simpleProps as string];
    if (!tplProps) throw new Error(`暂未配置此模板：${simpleProps}`);
    return { value: simpleProps, ...tplProps };
  } else if (t === "Object") {
    const { tpl, ...restProps } = simpleProps as WidgetPropAttrs;
    if (tpl) {
      const tplProps = widgetAttrsTpls[tpl as string];
      if (!tplProps) throw new Error(`暂未配置此模板：${tpl}`);
      return merge({ value: tpl }, tplProps, restProps);
    }
    return simpleProps as WidgetPropAttrs;
  } else {
    throw new Error(`暂未处理此类型：${t}`);
  }
}
// 获取最近使用的配置
function getNearList(): OptionItem[] {
  return [];
}
function getOptions(enums?: OptionItem[]) {
  if (!enums) return;
  sortObjArrByKey(enums, "asc", "frequency");
  const heightList: OptionItem[] = [];
  const commonList: OptionItem[] = [];
  const neverList: OptionItem[] = [];
  enums.forEach(item => {
    const { frequency } = item;
    if (frequency < 100) {
      heightList.push(item);
    } else if (frequency < 200) {
      commonList.push(item);
    } else if (frequency < 300) {
      neverList.push(item);
    }
  });
  let num = 0;
  if (heightList.length) num++;
  if (commonList.length) num++;
  if (neverList.length) num++;
  if (num > 1)
    return [
      // { value: 0, label: "近用",  children: getNearList() },
      { value: 1, label: "总用", children: heightList },
      { value: 2, label: "常用", children: commonList },
      { value: 3, label: "不用", children: neverList },
    ];
  return heightList.length ? heightList : commonList.length ? commonList : neverList;
}
const switchShowHideAttrs = {
  activeText: "显示",
  inactiveText: "隐藏",
};
function getType(standProps: CommonObj) {
  const { value, label, enums, type } = standProps;
  const typeMap = {
    boolean: "switch",
    natural: "input-number",
    text: "input",
  };
  if (typeMap[type]) return typeMap[type];
  if (enums) {
    // if (enums.length <= 5) return "radio-group";
    return "select";
  }
  return defaultFormItemType;
}
// 获取控件属性的字段信息
export function getWidgetAttrsFields(type: string): FormFieldAttrs[] {
  const propList: WidgetProp[] = widgetAttrsMap[type].filter(it => (it.frequency ?? 0) < 999);
  if (!propList) {
    console.warn(`暂未配置此控件类型：${type}`);
    return [];
  }
  sortObjArrByKey(propList as CommonObj[], "asc", "frequency");
  return propList.map(item => {
    const standProps = getStandardAttrsItem(item);
    const { value, label, enums, type } = standProps;
    sortObjArrByKey(enums, "asc", "frequency");
    const typeMap = {
      boolean: "switch",
      natural: "input-number",
      text: "input",
    };
    return {
      prop: value,
      type: getType(standProps),
      label,
      attrs: {
        options: getOptions(enums),
        ...(typeMap[type ?? ""] === "switch" ? switchShowHideAttrs : {}),
      },
      quickAttrs: {
        grid: 12,
      },
      //   example: "",
    };
  });
}
