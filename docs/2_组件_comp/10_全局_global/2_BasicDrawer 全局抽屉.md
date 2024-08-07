# BasicDrawer 全局抽屉



### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据的双向绑定值|`CommonObj`|`reactive({})`|
|`fields`|表单字段项(数组)|`FormField[]`|`[]`|
|`pureText`|是否纯文本展示|`boolean`|-|
|`fetch`|请求接口，一般跟`fetchSuccess`，`fetchFail`一起配合使用|`UniteFetchType`|-|
|`fetchSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`fetchFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`span`|同`ElementPlus `的`span`，`1 ~ 24`|`string \| number`|`24`|
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
|`handleRequest`|处理参数（如果有`type`，则返回`type`，否则返回 `param `和 `return `推导的类型|`(args: CommonObj) => CommonObj`|-|

### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|双向绑定更新值|(`vals: CommonObj`)|
|`submit`|提交事件|(`args: CommonObj`)|
|`change`|提交事件|(`prop: string, val: string \| number`)|
|`moreBtns`|更多按钮|(`name: string, args: CommonObj, cb: FinallyNext`)|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|表单实例|`(str: string, arr: string[])=>void`|
|`formValidate`|表单校验|`(str: string, arr: string[]) => void`|
|`tempTestFn_1`|表单测试|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`currField.prop`|`prop `名称即为 插槽名称|`name, field, form`|
|`defaultTest`|默认插槽|-|
|`itemTest`|`item`插槽|-|



## 类型声明
::: details
/src/components/BasicDrawer.vue


``` ts


```

:::  


