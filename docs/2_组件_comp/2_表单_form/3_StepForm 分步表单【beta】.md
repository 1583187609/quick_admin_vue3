# StepForm 分步表单  <Badge class="title-badge" type="warning" text="beta" />


::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::




## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`sections`|-|`SectionFormItem[]`|`[]`|
|`direction`|-|`StepDirection`|`vertical`|
|`stepAttrs`|-|`StepItemAttrs`|-|
|`formAttrs`|-|`SectionFormAtrrs`|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|'`head-right-' + (scope.section.prop ?? scope.index + 1)`|-|`name`|
|'`body-' + scope.section.prop`|-|`name`|
|`scope.field.prop`|-|`name`|



## 类型声明
::: details
/src/components/form/_types.ts
<<< E:\Quick-Admin\quick_admin_vue3/src/components/form/_types.ts
:::  


