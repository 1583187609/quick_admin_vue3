# BaseForm 基础表单




## 测试表单
::: demo 这是行内表单的描述。重点介绍了`BaseForm`的相关`API`的使用。这是一个`html`标签`<BaseForm/>`的示例。完整英文句子示例：`Hello, world!`
/demos/2_表单_form/1_BaseForm 基础表单/0_TestForm.vue
:::

::: tip
这是`tip`信息示例
:::


## 全部控件类型
::: demo 全部控件类型包含：`ElementPlus`（`input, select`）、内置（`BaseNumberRange`）、自定义扩展（`UserInfo`）三部分。
/demos/2_表单_form/1_BaseForm 基础表单/1_AllFields.vue
:::


## 额外属性
::: demo 除了`ElementPlus`的属性外，其他的功能属性一律添加在 `extraAttrs `中
/demos/2_表单_form/1_BaseForm 基础表单/2_ExtraAttrs.vue
:::


## 继承与扩展
::: demo 插槽及其他属性功能，完全继承自`ElementPlus`。需谨记 `Dom`嵌套跟`JSON`嵌套保持一致的原则
/demos/2_表单_form/1_BaseForm 基础表单/5_ExtendMore.vue
:::



## API

### 属性

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据|`CommonObj`|-|
|`fields`|表单字段项|`FormField[]`|-|
|`pureText`|是否纯文本展示|`boolean`|-|
|`fetch`|请求接口，一般跟`fetchSuccess`，`fetchFail`一起配合使用|`UniteFetchType`|-|
|`fetchSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`fetchFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`span`|同`ElementPlus `的`span`，`1 ~ 24`|`string \| number`|-|
|`footer`|是否显示底部按钮|`boolean`|-|
|`submitText`|提交按钮的文字|`string`|-|
|`resetText`|提交按钮的文字|`string`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交按钮是否显示加载图标|`boolean`|-|
|`isOmit`|是否剔除掉 `undefined`，'' 参数|`boolean`|-|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|
|`isCache`|是否缓存|`boolean`|-|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|-|
|`noSubmitProps`|提交表单时，不要提交的`prop`属性|`string[]`|-|


### 事件

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`||-|
|`submit`||-|
|`change`||-|
|`moreBtns`||-|


### 方法

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`any`|





## 类型声明
::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/components/form/_types.ts
:::  


