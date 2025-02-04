# FormTable 表单表格  <Badge class="title-badge" type="warning" text="beta" />

::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::

&emsp;&emsp;目标：定位为表单表格。继承自`BaseForm`和`BaseTable`，兼顾了表单编辑校验，并且样式以表格呈现。
## 基础用法

&emsp;&emsp;`cols`接受表格列  
&emsp;&emsp;`v-model`接受表单数据  
&emsp;&emsp;`formAttrs`接收表单属性  
&emsp;&emsp;表单属性透传  
&emsp;&emsp;注：表单属性、表格属性同`BaseForm`和`BaseTable`

::: demo 
/demos/2_组件_comp/3_表格_table/2_FormTable 表单表格【beta】/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`cols`|表头|`FormTableColAttrs[]`|-|
|`modelValue`|表格行数据|`CommonObj[]`|`reactive([])`|
|`formAttrs`|表单属性|`CommonObj`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`() => void`|
|`tableRef`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`header`|-|-|
|`scope.col.prop`|-|`name`|
|`footer`|-|-|


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/core/components/table/_types.ts
:::  
