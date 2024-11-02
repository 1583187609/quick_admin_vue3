# SectionForm 分块表单

&emsp;&emsp;分块（组）表单
## 基础用法

&emsp;&emsp;这是分块表单基础用法的介绍内容，待完善。

::: demo 
/demos/2_组件_comp/2_表单_form/2_SectionForm 分块表单/1_BasicUse.vue
:::
## 传参规则

&emsp;&emsp;这是分块表单传参规则的介绍内容，待完善。

::: demo 
/demos/2_组件_comp/2_表单_form/2_SectionForm 分块表单/2_ParamsRules.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据|`CommonObj`|`reactive({})`|
|`type`|-|`FormStyleType`|`common`|
|`sections`|-|`SectionFormItem[]`|`[]`|
|`pureText`|是否纯文本展示|`boolean`|-|
|`readonly`|是否只读|`boolean`|-|
|`disabled`|是否禁用|`boolean`|-|
|`size`|是否禁用|`CommonSize`|`defaultCommonSize`|
|`labelWidth`|`label`的宽度|`string`|-|
|`foldable`|是否允许折叠|`boolean`|`true`|
|`fetch`|接口请求|`UniteFetchType`|-|
|`afterSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`afterFail`|`fetch`请求失败之后的回调方法|`() => void`|-|
|`footer`|是否显示底部按钮|`boolean`|`true`|
|`grid`|同`ElementPlus`的`el-col`的属性，可为数值：`1~24`|`Grid`|`24`|
|`submitText`|提交按钮的文字|`string`|-|
|`resetText`|提交按钮的文字|`string`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交按钮是否显示加载图标|`boolean`|-|
|`omit`|是否剔除掉值为 `undefined, null, `“” 的参数|`boolean`|`true`|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|`true`|
|`handleRequest`|处理请求参数|`() => void`|-|
|`handleResponse`|处理请求数据|`() => void`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`blur`|-|-|
|`focus`|-|-|
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
|`head-right`|-|`section, index`|
|'`head-right-' + (sItem.prop ?? sInd + 1)`|-|`name`|
|`body`|-|`section, index`|
|`sItem.prop`|-|`name`|
|`field`|-|`field`|
|`scope.field.prop`|-|`name, field`|
|`footer`|-|-|


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/core/form/_types.ts
:::  
