# StepForm 分步表单

&emsp;&emsp;步骤表单。结合了步骤条和分块表单(`SectionForm)`的功能
## 基础用法

&emsp;&emsp;`SectionForm`属性通过`formAttrs`传入，步骤条属性通过`stepAttrs`传入。

::: demo 
/demos/2_组件_comp/2_表单_form/3_StepForm 分步表单/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`sections`|-|`SectionFormItem[]`|`[]`|
|`direction`|-|`StepDirection`|`vertical`|
|`stepAttrs`|-|`StepItemAttrs`|-|
|`formAttrs`|`SectionFormAttrs`;|`CommonObj`|-|
|`footer`|-|`boolean`|`true`|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`blur`|-|-|
|`change`|-|-|
|`focus`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`stepsRef`|-|`() => void`|
|`formRef`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|'`head-right-' + (scope.section.prop ?? scope.index + 1)`|-|`name`|
|'`body-' + scope.section.prop`|-|`name`|
|`scope.field.prop`|-|`name`|
|`footer`|-|-|


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/core/components/form/_types.ts
:::  
