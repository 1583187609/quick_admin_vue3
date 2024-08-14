# BaseTable 基础表格

基础表格



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`cols`|表头|`TableColAttrs[]`|`[]`|
|`rows`|表格行数据|`CommonObj[]`|`[]`|
|`sort`|是否显示排序列|`boolean \| TableColAttrs`|-|
|`index`|是否展示序号列|`boolean \| TableColAttrs`|-|
|`selection`|是否显示选择框|`boolean \| TableColAttrs`|-|
|`size`|-|`CommonSize`|`defaultCommonSize`|
|`showSummary`|是否显示汇总行|`boolean`|-|
|`operateBtnsAttrs`|-|`OperateBtnsAttrs`|-|
|`summaryMethod`|计算汇总的方法|`() => void`|`handleTableSummary`|
|`filterBtnsByAuth`|-|`() => void`|-|
|`operateBtns`|-|`BtnItem[]`|-|

### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`operateBtns`|-|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`header`|-|-|
|`default`|-|-|
|`c.prop`|-|`row, col, $index, name`|



## 类型声明
::: details
/src/components/table/_types.ts

<<< E:\Quick-Admin\quick_admin_vue3/src/components/table/_types.ts
:::  


