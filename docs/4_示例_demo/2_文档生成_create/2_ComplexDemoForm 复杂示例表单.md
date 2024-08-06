# ComplexDemoForm 复杂示例表单





### ComplexDemoForm

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|-|`CommonObj`|-|
|`fields`|-|`FormField[ ]`|-|
|`pureText`|-|`boolean`|-|
|`fetch`|-|`UniteFetchType`|-|
|`fetchSuccess`|-|`FinallyNext`|-|
|`fetchFail`|-|`FinallyNext`|-|
|`span`|-|`string \| number`|-|
|`footer`|-|`boolean`|-|
|`submitText`|-|`string`|-|
|`resetText`|-|`string`|-|
|`extraParams`|-|`CommonObj`|-|
|`moreBtns`|-|`BaseBtnType[ ]`|-|
|`loading`|-|`boolean`|-|
|`isOmit`|-|`boolean`|-|
|`log`|-|`boolean`|-|
|`debug`|-|`boolean`|-|
|`isCache`|-|`boolean`|-|
|`autoFixedFoot`|-|`boolean`|-|
|`noSubmitProps`|-|`string[ ]`|-|
|`handleRequest`|-|`() => void`|-|



### ComplexDemoForm

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`submit`|-|-|
|`change`|-|-|
|`moreBtns`|-|-|



### ComplexDemoForm

|方法名|说明|类型|
|:---|:---|:---|
|`refreshList`|-|`() => void`|
|`getList`|-|`() => void`|
|`getQueryParams`|-|`() => void`|
|`getQueryFields`|-|`() => void`|



### ComplexDemoForm

|插槽名|说明|Scope|
|:---|:---|:---|
|`currField.prop`|-|`name, field, form`|
|`default`|-|-|
|`tempTest`|-|-|





## 类型声明
::: details
<<< E:\Quick-Admin\quick_admin_vue3/demos/0_示例_demo/_typescript/complex.ts
:::  


