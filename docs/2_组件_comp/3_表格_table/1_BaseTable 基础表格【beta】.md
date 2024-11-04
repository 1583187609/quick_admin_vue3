# BaseTable 基础表格  <Badge class="title-badge" type="warning" text="beta" />

::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::

&emsp;&emsp;基础表格
## 基础用法

&emsp;&emsp;基础用法

::: demo 
/demos/2_组件_comp/3_表格_table/1_BaseTable 基础表格【beta】/1_BasicUse.vue
:::
## 快捷用法

&emsp;&emsp;内嵌组件

::: demo 
/demos/2_组件_comp/3_表格_table/1_BaseTable 基础表格【beta】/2_QuickUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`cols`|表头|`TableColAttrs[]`|`[]`|
|`rows`|表格行数据|`CommonObj[]`|`[]`|
|`size`|-|`CommonSize`|`defaultCommonSize`|
|`showSummary`|是否显示汇总行|`boolean`|-|
|`operateBtnsAttrs`|-|`OperateBtnsAttrs`|-|
|`summaryMethod`|计算汇总的方法|`() => void`|`handleTableSummary`|
|`filterBtnsByAuth`|-|`() => void`|-|
|`operateBtns`|-|`BtnItem[]`|`[]`|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`tableRef`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`header`|-|-|
|`default`|-|-|
|`c.prop`|-|`row, col, $index, name`|


## 类型声明

::: details
<<< E:\self\quick_admin_vue3/src/core/table/_types.ts
:::  
