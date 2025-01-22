import { PopupType } from "@/core/components/BasicPopup/_types";
import { FormItemType, FormTplType } from "@/core/components/form/_types";
import { CommonObj, CommonSize, ThemeName } from "@/core/_types";
import { LanguageTypes, LayoutType } from "@/store/modules/set";

// 全局配置
export interface QuickGlobalConfig {
  mockServer?: boolean; // 是否启用mock服务
  //正则表达式
  regexp?: { [key: string]: RegExp };
  // 路径配置
  paths?: {
    home?: string; // 首页路径
    noAuth?: string[]; // 不需要授权就能进入的路径
  };
  // 日期（el-date-picker的一些预配置项）
  date?: {
    // 格式化
    format?: {
      tableCol?: string;
    };
    // 有效期
    valid?: {
      login?: number;
      dict?: number;
    };
  };
  // 系统设置
  system?: {
    size?: CommonSize;
    emptyStr?: string;
    rangeJoinChar?: string;
    language?: LanguageTypes; // 语言
    // 布局
    layout?: {
      type?: LayoutType;
    };
    // 主题
    theme?: {
      name?: ThemeName;
    };
  };
  // 性能
  performance?: {
    enableTpl?: boolean;
    enableOptimize?: boolean;
  };
  // ElementPlus（覆盖element-plus组件的默认属性）
  element?: {
    // el-dialog 的属性
    dialog?: CommonObj;
    // el-drawer 的属性
    drawer?: CommonObj;
    // el-tooltip 的属性
    tooltip?: CommonObj;
    // el-popover 弹出层
    popover?: CommonObj;
    // el-popconfirm 弹出层
    popconfirm?: CommonObj;
    // el-form 的属性
    form?: CommonObj;
    // el-table的属性
    table?: CommonObj;
    // el-table-column 的属性
    tableColumn?: CommonObj;
    // el-pagination 的属性
    pagination?: CommonObj;
    // el-date-picker 的属性
    datePicker?: {
      defaultTime?: Date[];
      shortcuts?: {
        date?: CommonObj[];
        dateRange?: CommonObj[];
      };
    };
  };
  // 弹窗
  popup?: {
    defaultType?: PopupType; // 默认弹窗类型
  };
  // 模板
  tpls?: {
    tableCol?: CommonObj; // 表格列模板
    formItem?: (type?: FormTplType) => CommonObj; // 表单项模板
    baseBtns?: CommonObj; // 基础按钮模板
  };
  // 表单项组件
  FormItem?: CommonObj;
  // 表格列组件
  Column?: CommonObj;
  // 分页组件
  Pagination?: CommonObj;
  OperateBtns?: CommonObj;
  // 基础增删改查组件
  BaseCrud?: {
    Index?: CommonObj;
    ExtraBtns?: CommonObj;
    BatchBtns?: CommonObj;
    OperateBtns?: CommonObj;
    Pagination?: CommonObj;
    QueryForm?: {
      gridAttrsMap?: CommonObj;
      [key: string]: any;
    };
    QueryTable?: CommonObj;
    SetPrint?: CommonObj;
    SetTable?: CommonObj;
  };
  // 基础表单组件
  BaseForm?: {
    Index?: {
      log?: boolean;
    };
  };
  // 分块表单组件
  SectionForm?: {
    Index?: {
      log?: boolean;
    };
  };
  // 基础图标组件
  BaseIcon?: {
    name?: string;
  };
  // 基础按钮组件
  BaseBtn?: {
    defaultBtns?: CommonObj;
  };
  // 基础上传组件
  BaseUpload?: CommonObj;
}
