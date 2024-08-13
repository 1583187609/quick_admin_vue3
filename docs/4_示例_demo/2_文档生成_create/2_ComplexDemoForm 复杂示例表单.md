# ComplexDemoForm 复杂示例表单

在这里，会考虑其他复杂边界情况的解析处理


::: tip
此表单仅做示例使用，不含任何业务功能
:::




## API 
### Props


通过设置 `@title: Props` 可覆盖默认的 title（属性）。
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据|`CommonObj`|`reactive({})`|
|`fields`|表单字段项|`FormField[]`|`[]`|
|`pureText`|是否纯文本展示|`boolean`|-|
|`fetch`|请求接口，一般跟`fetchSuccess`，`fetchFail`一起配合使用|`UniteFetchType`|-|
|`fetchSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`fetchFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`span`|同`ElementPlus `的`span`，`1 ~ 24`|`string \| number`|-|
|`footer`|是否显示底部按钮|`boolean`|`true`|
|`submitText`|提交按钮的文字|`string`|-|
|`resetText`|提交按钮的文字|`string`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交按钮是否显示加载图标|`boolean`|-|
|`isOmit`|是否剔除掉 `undefined`，'' 参数|`boolean`|`true`|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean`|`!isProd`|
|`debug`|是否终止提交，并打印传参|`boolean`|-|
|`isCache`|是否缓存|`boolean`|-|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|`true`|
|`noSubmitProps`|提交表单时，不要提交的`prop`属性|`string[]`|-|
|`handleRequest`|处理参数|`() => void`|-|
|`grid`|-|-|`24`|


::: tip
这是 `props `的`tip`信息
:::


### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`submit`|-|-|
|`change`|-|-|
|`moreBtns`|-|-|


::: tip
提示类信息可以设置一个，也可以设置多个
:::

::: warning
这是 `emits `的 `warning `信息
:::


### 方法(expose)


这是 expose 的 description。通过写入 description 获得
|方法名|说明|类型|
|:---|:---|:---|
|`refreshList`|这是测试方法|`() => void`|
|`getList`|-|`() => void`|
|`getQueryParams`|-|`() => void`|
|`getQueryFields`|-|`() => void`|


::: warning
注意这部分的`title`——【方法(`expose`)】是通过写入覆盖默认值的
:::


### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`currField.prop`|-|`name, field, form`|
|`default`|默认插槽|-|
|`tempTest`|这是临时写的用作测试的插槽|-|


::: danger
这是 `slots `的`tip`信息
:::




## 类型声明
::: details
/demos/4_示例_demo/2_文档生成_create/_typescript/complex.ts

<<< E:\Quick-Admin\quick_admin_vue3/demos/4_示例_demo/2_文档生成_create/_typescript/complex.ts
:::  


