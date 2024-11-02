# EditTable 基础表格

&emsp;&emsp;可编辑的表格


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`cols`|表头|`TableColAttrs[]`|-|
|`modelValue`|表格行数据|`CommonObj[]`|`reactive([])`|
|`formAttrs`|表单属性|`CommonObj`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|...`tableRef.value,`|`() => void`|
|`tableRef`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`front`|-|-|
|`scope.col.prop`|-|`name`|
|`behind`|-|-|


## 类型声明

::: details
/src/core/table/_types.ts<<< E:\Quick-Admin\quick_admin_vue3/src/core/table/_types.ts
:::  
