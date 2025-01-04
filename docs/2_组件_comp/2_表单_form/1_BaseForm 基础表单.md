# BaseForm 基础表单

&emsp;&emsp;目标：定位为基础（通用）表单，继承并扩展 `el-form `的功能，提供快捷属性，实现快速开发。  
&emsp;&emsp;快捷属性：在 `quickAttrs `中，例：`grid`、`example`、`popover`、`tips`、`pureText`、`before`、`after`、……  
&emsp;&emsp;表单样式风格：通用表单、单元格表单、纯文本表单
## 基础用法

&emsp;&emsp;最外一层是`el-form-item`的属性（除`tpl`、`type`、`quickAttrs`，`attrs`、`slots`外），`attrs`是`el-form-item`内部的控件属性  
&emsp;&emsp;为了减少编码量，某些使用频率较高的控件会作为默认值，或自带默认属性（可在全局`config`中进行配置修改）。例：表单项控件类型默认为`input`，`el-date-picker`的`type`默认为`daterange`或`datetimerange`（根据`format`而决定）  
&emsp;&emsp;设置`v-model`绑定数据的初始值即可设置默认值

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/1_BasicUse.vue
:::
## 模板用法（非必须）

&emsp;&emsp;用模板实现上述效果，代码量更少  
&emsp;&emsp;字段模板（`tpl`）：以`T_`开头。可在全局配置文件中配置修改  
&emsp;&emsp;字典模板（`options`）：以`D_`开头。可在全局配置文件中配置修改

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/2_TplsUse.vue
:::
## 快捷属性

&emsp;&emsp;扩展的快捷属性，放置在 `quickAttrs `中。例：`pureText`、`grid`、`example`、`tips`、`popover`、`before`、`after`

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/3_QuickAttrs.vue
:::
## 字段显示与隐藏

&emsp;&emsp;单个或多个字段的隐藏方式

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/4_ShowHide.vue
:::
## 扩展的组件

&emsp;&emsp;系统内置组件：`BaseImg, BaseUpload, BaseNumberRange, `…  
&emsp;&emsp;外部内嵌组件：`UserInfo`（后面再考虑是否加入，先直接用插槽吧）  
&emsp;&emsp;使用插槽，设置 `type `为 `slot`

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/5_ExtendComponent.vue
:::
## 插槽规则

&emsp;&emsp;插槽可接受字符串（等价于`default`插槽）、对象（键名即为插槽名，值可为字符串、数组、同/异步引入的`vue`组件，渲染规则见`基础/BaseRender渲染`章节内容）。  
&emsp;&emsp;`JSON`跟实际`DOM`保持一致嵌套，`slots`也是。下面的示例中，`el-form-item`的插槽在最外层的`slots`中，`el-input`的插槽在`attrs.slots`中  
&emsp;&emsp;如果想要不被`el-form-item`包裹，`type`应被指定为`custom`，同时设置`renderData`属性

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/6_SlotsRule.vue
:::
## 底部按钮

&emsp;&emsp;`submitBtn`：支持传入模板（`save`、`submit`等）、文字（创建、确认）、对象（遵循`BaseBtn`的对象规则），监听事件始终为 `onSubmit`  
&emsp;&emsp;`resetBtn`：支持传入模板、文字、对象（规则同`submit`），监听事件始终为 `onReset`  
&emsp;&emsp;`moreBtns`：支出传入数组，数组元素遵循`BaseBtn`的规则，监听事件为：`onMoreBtns(name, params, next, e)`。通过设置`validateForm`为`false`，让点击按钮后不进行表单校验。  
&emsp;&emsp;`footer `默认（提交、重置按钮）和自定义（使用`footer`插槽方式实现）  
&emsp;&emsp;设置：`autoFixedFoot`，默认为`true`，若为`true`，则底部按钮会自适应固定在底部，若超出，内容区域会出现滚动条  
&emsp;&emsp;注：要保证最外层表单（`BaseForm`、`SectionForm`）的高度可获得（`height`：`50vh`这种，若百分比高度，如果某一级没有传递百分比，则会导致传递链路整体失效）。

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/7_FootBtns.vue
:::
## 表单提交处理

&emsp;&emsp;`fetch `配合 `extraParams`

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/8_HandleSubmit.vue
:::
## 处理请求参数

&emsp;&emsp;`extraParams`  
&emsp;&emsp;`omits`  
&emsp;&emsp;`afterSuccess`  
&emsp;&emsp;`afterFail`  
&emsp;&emsp;`afterReset`  
&emsp;&emsp;额外参数  
&emsp;&emsp;一次性统一处理

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/9_HandleParamsResult.vue
:::
## 表单样式

&emsp;&emsp;`styleType`  
&emsp;&emsp;`pureText`

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/10_FormStyle.vue
:::
## 调试属性

&emsp;&emsp;`log`为`true`，会打印请求信息，为字符串时，会作为标头文本。  
&emsp;&emsp;`debug`为`true`会在发起提交请求前打断点

::: demo 
/demos/2_组件_comp/2_表单_form/1_BaseForm 基础表单/11_DebugAttrs.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据|`CommonObj`|`reactive({})`|
|`fields`|表单字段项|`FormField[]`|`[]`|
|`pureText`|是否纯文本展示|`boolean`|-|
|`styleType`|表格样式类型：`cell`单元格、`common`常用|`FormStyleType`|`common`|
|`footer`|是否显示底部按钮|`boolean \| BaseRenderComponentType`|`true`|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|`true`|
|`submitBtn`|提交按钮的文字|`FootBtn`|-|
|`resetBtn`|提交按钮的文字|`FootBtn`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交请求状态。控制提交按钮是否显示加载图标|`boolean`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`omits`|是否剔除掉值为 `undefined, null, "" `的请求参数|`boolean \| Array`|`true`|
|`fetch`|-|`UniteFetchType`|-|
|`afterSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`afterFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`afterReset`|重置之后的处理方法|`AfterReset`|-|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean \| string`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`blur`|-|-|
|`focus`|-|-|
|`change`|-|-|
|`moreBtns`|-|-|
|`submit`|-|-|
|`reset`|-|-|
|`update:modelValue`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`() => void`|
|`validate`|-|`() => void`|
|`reset`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`header`|顶部插槽|-|
|`content`|内容插槽|-|
|`currField.prop`|-|`name, field`|
|`footer`|底部插槽|-|


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/core/components/form/_types.ts
:::  
