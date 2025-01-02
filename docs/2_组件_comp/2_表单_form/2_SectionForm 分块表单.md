# SectionForm 分块表单

&emsp;&emsp;将字段分区块展示。继承并扩展了基础表单（`BaseForm`），提供了展开/折叠，多级属性设置覆盖等功能。
## 基础用法

&emsp;&emsp;通过 `sections `传入分块及字段信息  
&emsp;&emsp;扩展了`bodyMaxHeight`、`foldable`、`defaultExpands`、`accordion`，其他属性同 `BaseForm`。

::: demo 
/demos/2_组件_comp/2_表单_form/2_SectionForm 分块表单/1_BasicUse.vue
:::
## 属性覆盖原则

&emsp;&emsp;属性覆盖原则：顶层元素`SectionForm`的属性可依次被`SectionItem`、`FormFieldItem`覆盖  
&emsp;&emsp;`labelWidth grid size readonly disabled pureText styleType`

::: demo 
/demos/2_组件_comp/2_表单_form/2_SectionForm 分块表单/2_AttrsOverRule.vue
:::
## 区块上的prop规则

&emsp;&emsp;`section`部分有`prop`属性时，参数会包裹一层，反之，则直接挂在双向绑定的数据上。

::: demo 
/demos/2_组件_comp/2_表单_form/2_SectionForm 分块表单/3_PropRule.vue
:::
## 插槽规则

&emsp;&emsp;`section`部分有`prop`属性时，以插槽名称，反之以`section`的`index`作为插槽名称

::: demo 
/demos/2_组件_comp/2_表单_form/2_SectionForm 分块表单/4_SlotRule.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据|`CommonObj`|`reactive({})`|
|`sections`|-|`SectionFormItem[]`|`[]`|
|`bodyMaxHeight`|`body`内容区域的最大高度|`string`|`90vh`|
|`foldable`|是否允许折叠|`boolean`|`true`|
|`defaultExpands`|默认展开的块|`number[]`|-|
|`accordion`|是否手风琴模式|`boolean`|-|
|`bodyClass`|-|`string`|`f-fs-fs-w`|
|`readonly`|是否只读|`boolean`|-|
|`disabled`|是否禁用|`boolean`|-|
|`pureText`|是否纯文本展示|`boolean`|-|
|`styleType`|-|`FormStyleType`|`common`|
|`footer`|是否显示底部按钮|`boolean \| BaseRenderComponentType`|`true`|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|`true`|
|`submitBtn`|提交按钮的文字|`FootBtn`|-|
|`resetBtn`|提交按钮的文字|`FootBtn`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交按钮是否显示加载图标|`boolean`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`omits`|是否剔除掉值为 `undefined, null, "" `的参数|`boolean \| Array`|`true`|
|`afterSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`afterFail`|`fetch`请求失败之后的回调方法|`() => void`|-|
|`afterReset`|重置之后的处理方法|`AfterReset`|-|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean \| string`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`moreBtns`|-|-|
|`update:modelValue`|-|-|
|`toggle`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`() => void`|
|`validate`|-|`() => void`|
|`reset`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|'`head-right-' + (sItem.prop ?? sInd)`|-|`name, section, index`|
|`sItem.prop ?? `body-${sInd`}`|-|`name, section, index`|
|`scope.field.prop`|-|`name`|
|`footer`|-|-|


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/core/components/form/_types.ts
:::  
