# BaseForm 基础表单

&emsp;&emsp;基础表单。除了实现`ElementPlus`的默认功能外，还在`extraAttrs`中提供了`grid`、`example`、`popover`、`tips`、`pureText`、`rulesType`、`before`、`after`、……等功能
## 基础用法

&emsp;&emsp;支持的控件类型包括以下三部分：  
&emsp;&emsp;`ElementPlus`：`input, select, `…  
&emsp;&emsp;内置：`BaseImg, BaseUpload, BaseNumberRange, `…  
&emsp;&emsp;自定义扩展：`UserInfo, `…

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/1_BasicUse.vue
:::
## 快捷属性

&emsp;&emsp;除了`ElementPlus`的属性外，提供了一系列额外属性，方便快速开发，放置在 `quickAttrs `中。

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/2_ExtraAttrs.vue
:::
## 字段显示与隐藏

&emsp;&emsp;下面介绍了如何控制字段的显示与隐藏，实现快速开发页面。

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/3_QuickUse.vue
:::
## 栅格布局

&emsp;&emsp;通过`grid`属性实现。遵循子级覆盖父级原则。

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/4_GridUse.vue
:::
## 继承与扩展

&emsp;&emsp;插槽及其他属性功能，完全继承自`ElementPlus`。需谨记 `Dom `嵌套跟`JSON`嵌套保持一致的原则

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/5_ExtendMore.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`type`|表格样式类型：`cell`单元格、`common`常用|`FormStyleType`|`common`|
|`size`|-|`CommonSize`|`defaultCommonSize`|
|`modelValue`|表单数据|`CommonObj`|`reactive({})`|
|`fields`|表单字段项|`FormField[]`|`[]`|
|`readonly`|是否只读|`boolean`|-|
|`pureText`|是否纯文本展示|`boolean`|-|
|`grid`|同`ElementPlus `的 `el-col `的属性，也可为数值：`1 ~ 24`|`Grid`|`_props.type === "cell" ? 8 : 24`|
|`footer`|是否显示底部按钮|`boolean`|`true`|
|`submitText`|提交按钮的文字|`string`|-|
|`resetText`|提交按钮的文字|`string`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交请求状态。控制提交按钮是否显示加载图标|`boolean`|-|
|`omit`|是否剔除掉值为 `undefined, null, `“” 的参数|`boolean`|`true`|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|`true`|
|`fetch`|请求接口，一般跟`fetchSuccess`，`fetchFail`一起配合使用|`UniteFetchType`|-|
|`afterSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`afterFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`handleRequest`|处理请求参数|`() => void`|-|
|`handleResponse`|处理请求数据|`() => void`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`change`|-|-|
|`moreBtns`|-|-|
|`submit`|-|-|
|`update:modelValue`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`() => void`|
|`formValidate`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`header`|顶部插槽|-|
|`currField.prop`|-|`name, field, form`|
|`footer`|底部插槽|-|


## 类型声明

::: details
<<< E:\self\quick_admin_vue3/src/core/form/_types.ts
:::  
