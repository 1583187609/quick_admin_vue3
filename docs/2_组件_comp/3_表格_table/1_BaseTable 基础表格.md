# BaseTable 基础表格

&emsp;&emsp;基础表格



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
/src/core/table/_types.ts
<<< E:\Quick-Admin\quick_admin_vue3/src/core/table/_types.ts
:::  


