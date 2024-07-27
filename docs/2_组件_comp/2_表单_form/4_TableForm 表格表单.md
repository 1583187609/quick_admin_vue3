# TableForm 表格表单

待完善

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
|`span`|同`ElementPlus `的`span`，`1 `~ `24`|`string \| number`|-|
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
|`handleRequest`|处理参数|`(args: CommonObj) => CommonObj`|-|

### 方法

|方法名|说明|类型|
|:---|:---|:---|
|-|-|-|

::: tip
这是`tip`消息
:::


### 事件

|事件名称|说明|回调参数|
|:---|:---|:---|
|-|-|-|

::: tip
这是`tip`消息
:::


::: warning
这是`warning`消息
:::


::: danger
这是`danger`消息
:::


::: details
这是`details`消息
:::


### 插槽

|插槽名|说明|子标签|
|:---|:---|:---|
|-|-|-|

::: warning
这是`warning`消息
:::




## 类型声明
::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/components/form/_types.ts
:::  

