# 测试

## 自动打标签

### html标签文本

单标签：`<BaseForm/>`。双标签：`<div style='color:red'>内容</div/>`。空标签：`<div></div>`

### 已有Tag标识

文件标签：`Hello world`。

### 英文单词

单个单词：`Base`。多个单词：`Base Form`。更多单词：`Base Form Item`。

### 英文语句

单句示例：`Hello world! `多句示例：`Markdown is fun. Here is an HTML tag: an English phrase.`

### 复杂情况

这是行内表单的描述。重点介绍了`BaseForm`的相关`API`的使用。这是一个`html`标签`<BaseForm/>`的示例。完整英文句子示例：`Hello, world!`这是一个英语短语示例：`Basic Form`。哈哈哈，这是`html`标签示例：`<div style='display:inline-block'>Content</div>`。`Markdown is fun. `英文句子示例：`Here is an HTML tag: an English phrase. Markdown is fun. md`文档标识示例：`hello world`。

## 从Vue文件中直接获取Ts类型

## 类型声明
::: details
/demos/0_示例_demo/_components/GlobalPopupDemo.vue


``` ts


export type PopupType = "drawer" | "dialog"; //弹窗类型
export type DialogId = `dialog-${number}`; //id必须大于等于0，示例："dialog-1"
export type DrawerId = `drawer-${number}`; //id必须大于等于0，示例："drawer-1"
export type FootRenderData = false | BaseRenderData;
export interface DialogPopup {
  id: number;
  name: "dialog";
  show: boolean;
  attrs: {
    title?: string;
    [key: string]: any;
  };
  body: BaseRenderData;
  foot?: FootRenderData; //底部按钮或自定义节点
  createAt: number; //创建时间戳
}
export type DirectionType = "rtl" | "ltr" | "ttb" | "btt";
export interface DrawerPopup {
  id: number;
  name: "drawer";
  show: boolean;
  attrs: {
    title?: string;
    direction?: DirectionType;
    [key: string]: any;
  };
  body: BaseRenderData;
  createAt: number; //创建时间戳
}
export interface DrawerHeadAttrs {
  title?: string;
  [key: string]: any;
}
export interface DialogHeadAttrs {
  title?: string;
  [key: string]: any;
}
//打开的弹窗类型
export type OpenPopupTypes = PopupType | DialogPopup | DrawerPopup | DialogId | DrawerId;
export type ClosePopupType = OpenPopupTypes | number | "all"; //关闭的弹窗类型：'all' 关闭所有dialog、drawer；number：关闭顶层的 n 个弹窗
export type CloseDialogType = DialogPopup | DialogId | "all";
export type CloseDrawerType = DrawerPopup | DrawerId | "all";
export type DialogHeadTypes = string | DialogHeadAttrs;
export type DrawerHeadTypes = string | DrawerHeadAttrs;









    // 如果不是弹窗类型，则打开dialog，且type的值作为dialog的footer渲染




```

:::  


