# StepForm 分步表单

&emsp;&emsp;目标：定位为步骤表单。  
&emsp;&emsp;功能：结合了分块表单（`SectionForm`）和步骤条的功能。
## 基础用法

&emsp;&emsp;这是步骤表单基础用法的介绍内容，待完善。

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
|`sectionFormRef`|-|`() => void`|

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
