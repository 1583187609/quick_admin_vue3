# BaseForm 基础表单


## TestForm
::: demo 
/demos/2_表单_form/1_BaseForm 基础表单/0_TestForm.vue
:::


## AllFields
::: demo 
/demos/2_表单_form/1_BaseForm 基础表单/1_AllFields.vue
:::


## ExtraAttrs
::: demo 
/demos/2_表单_form/1_BaseForm 基础表单/2_ExtraAttrs.vue
:::


## ExtendMore
::: demo 
/demos/2_表单_form/1_BaseForm 基础表单/5_ExtendMore.vue
:::



### BaseForm

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

### BaseForm

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`submit`|-|-|
|`change`|-|-|
|`moreBtns`|-|-|

### BaseForm

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`() => void`|
|`formValidate`|-|`() => void`|

### BaseForm

|插槽名|说明|Scope|
|:---|:---|:---|
|`currField.prop`|-|`name, field, form`|



## 类型声明
::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/components/form/_types.ts
:::  


