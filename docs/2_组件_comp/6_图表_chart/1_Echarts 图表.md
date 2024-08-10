# Echarts 图表


## Line
::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/1_Line.vue
:::


## Bar
::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/2_Bar.vue
:::


## Pie
::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/3_Pie.vue
:::



### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据，可设默认值|`CommonObj`|-|
|`fields`|表单字段|`FormField[]`|-|
|`sections`|分块的表单字段|`SectionFieldsItemAttrs[]`|-|
|`cols`|表格列数据|`TableField[]`|-|
|`fetch`|列表请求接口|`UniteFetchType`|-|
|`sort`|是否展示排序列|`boolean \| UniteFetchType`|-|
|`index`|是否展示序号列|`boolean`|-|
|`selection`|是否展示选择框|`boolean`|-|
|`immediate`|页面刚创建时是否立即发起请求获取数据|`boolean`|-|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`operateBtns`|操作栏的分组按钮，在表格的操作一栏|`OperateBtnsType`|-|
|`reqMap`|请求参数的键名映射|`ReqMap`|-|
|`resMap`|响应参数的键名映射|`ResMap`|-|
|`disabled`|是否禁用|`boolean`|-|
|`readonly`|是否只读|`boolean`|-|
|`selectAll`|是否选择全部|`boolean`|-|
|`groupBtnsAttrs`|操作栏按钮的配置|`GroupBtnsAttrs`|-|
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|
|`batchBtn`|是否显示批量按钮|`boolean`|-|
|`importCfg`|导入的下载模板配置|`TplCfgAttrs`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`log`|是否`console.log(rows`)|`boolean`|-|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`isOmit`|是否剔除掉`undefined, `''的属性值|`boolean`|-|
|`changeFetch`|是否`onChang`之后就发送请求（仅限于`Select`类组件，不含`Input`类组件）|`boolean`|-|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|-|
|`filterByAuth`|按钮权限处理逻辑|`FilterByAuthFn`|-|
|`gridAttrs`|栅格配置，同`ElementPlus`的`el-col`的属性|`GridAttrs`|-|
|`compact`|表单项之间排列是否紧凑点|`boolean`|-|
|`size`|-|`CommonSize`|-|
|`rowNum`|筛选条件的表单展示几行|`number`|-|
|`fetchSuccess`|请求成功的回调函数|`() => void`|-|
|`fetchFail`|请求成功的回调函数|`() => void`|-|
|`handleRequest`|处理参数|`() => void`|-|
|`handleResponse`|处理响应数据|`() => void`|-|
|`exportCfg`|导出配置|`ExportCfg`|-|
|`pageAttrs`|分页配置|`CommonObj`|-|
|`pagination`|是否分页|`false \| PaginationAttrs`|-|
|`showPagination`|是否显示分页|`boolean`|-|
|`formAttrs`|`el-form `的属性配置|`FormAttrs`|-|
|`tableAttrs`|`el-table `的属性配置|`TableAttrs`|-|

### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtns`|-|-|
|`operateBtns`|-|-|
|`selectionChange`|-|-|
|`rows`|-|-|
|`dargSortEnd`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`refreshList`|-|`() => void`|
|`getList`|-|`() => void`|
|`getQueryParams`|-|`() => void`|
|`getQueryFields`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`field.prop`|-|`name, field, form`|
|`middle`|-|-|
|`default`|-|`loading, rows, total, hasMore, params, onOperateBtns`|
|`col.prop`|-|`row, col, $index, name`|



## 类型声明
::: details
/src/components/chart/_config/types.ts

<<< E:\Quick-Admin\quick_admin_vue3/src/components/chart/_config/types.ts
:::  


