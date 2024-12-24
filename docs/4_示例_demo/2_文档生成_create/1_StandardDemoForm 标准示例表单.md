# StandardDemoForm 标准示例表单

&emsp;&emsp;这是标准示例表单。也是摘要描述内容示例，在这个文件里，会以标准写法来完成文件撰写

::: tip
这是声明的 `tip `信息
:::

::: warning
这是声明的 `warning `信息
:::

::: danger
这是声明的 `danger `信息
:::

::: details
这是声明的 `details `信息
:::

## 测试表单

&emsp;&emsp;这是行内表单的描述。重点介绍了`BaseForm`的相关`API`的使用。这是一个`html`标签`<BaseForm/>`的示例。完整英文句子示例：`Hello, world!ddddd`  
&emsp;&emsp;这是第二行描述

::: demo 
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/0_TestForm.vue
:::


::: tip
这是`tip`信息示例
:::
## 全部控件类型

&emsp;&emsp;全部控件类型包含：`ElementPlus`（`input, select`）、内置（`BaseNumberRange`）、自定义扩展（`UserInfo`）三部分。

::: demo 
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/1_AllFields.vue
:::
## 额外属性

&emsp;&emsp;除了`ElementPlus`的属性外，其他的功能属性一律添加在 `quickAttrs `中

::: demo 
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/2_ExtraAttrs.vue
:::
## 继承与扩展

&emsp;&emsp;插槽及其他属性功能，完全继承自`ElementPlus`。需谨记 `Dom`嵌套跟`JSON`嵌套保持一致的原则

::: demo 
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/5_ExtendMore.vue
:::


## API 

### Props属性自定义标题

&emsp;&emsp;这是`props`的描述

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据的双向绑定值|`CommonObj`|`reactive({})`|
|`fields`|表单字段项(数组)|`FormField[]`|`[]`|
|`pureText`|是否纯文本展示|`boolean`|-|
|`fetch`|请求接口，一般跟`fetchSuccess`，`fetchFail`一起配合使用|`UniteFetchType`|-|
|`afterSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`onFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`span`|同`ElementPlus `的`span`，`1 ~ 24`|`string \| number`|-|
|`footer`|是否显示底部按钮|`boolean`|`true`|
|`submitBtn`|提交按钮的文字|`FootBtn`|-|
|`resetBtn`|提交按钮的文字|`FootBtn`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交按钮是否显示加载图标|`boolean`|-|
|`omits`|是否剔除掉值为 `undefined, null, "" `的参数|`boolean`|`true`|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|`true`|
|`handleRequest`|处理参数（如果有`type`，则返回`type`，否则返回 `param `和 `return `推导的类型|`(args: CommonObj) => CommonObj`|-|
|`grid`|-|-|`24`|

::: tip
这是 `props `的 `tip `信息
:::

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`change`|提交事件|(`prop: string, val: string \| number)`|
|`moreBtns`|更多按钮|(`name: string, args: CommonObj, cb: FinallyNext)`|
|`submit`|提交事件|(`args: CommonObj)`|
|`update:modelValue`|双向绑定更新值|(`vals: CommonObj)`|

### 方法(expose)

&emsp;&emsp;这是 `expose `的 `description`。通过写入 `description `获得

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

::: tip
这是默认的 `tip `信息
:::

::: warning
这是 `warning `信息
:::

::: danger
这是 `danger `信息
:::

::: details
这是 `details `信息
:::


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/demos/4_示例_demo/2_文档生成_create/_typescript/standard.ts
:::  
