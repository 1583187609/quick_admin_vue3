# EditTable 基础表格

&emsp;&emsp;可编辑的表格



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表格行数据|`CommonObj[]`|`reactive([])`|
|`class`|-|`ClassType`|-|
|`style`|-|`StyleType`|-|
|`cols`|表头|`TableColAttrs[]`|-|
|`formAttrs`|表单属性|`CommonObj`|-|

### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`scope.col.prop`|-|`name`|



## 类型声明
::: details
/src/components/table/_types.ts
<<< E:\Quick-Admin\quick_admin_vue3/src/components/table/_types.ts
:::  


