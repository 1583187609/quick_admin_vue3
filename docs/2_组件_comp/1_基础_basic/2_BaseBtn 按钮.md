# BaseBtn 按钮

基础按钮，用于增删改查列表页中间或表格操作栏按钮的权限、图标、样式、位置等的统一



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据，可设默认值|`CommonObj`|-|
|`fields`|表单字段|`FormField[]`|-|
|`sections`|分块的表单字段|`SectionFormItemAttrs[]`|-|
|`fetch`|列表请求接口|`UniteFetchType`|-|
|`immediate`|页面刚创建时是否立即发起请求获取数据|`boolean`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`changeFetch`|是否`onChang`之后就发送请求（仅限于`Select`类组件，不含`Input`类组件）|`boolean`|-|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|-|
|`grid`|栅格配置，同`ElementPlus`的`el-col`的属性|`Grid`|-|
|`rowNum`|筛选条件的(表单)展示几行|`number`|-|
|`reqMap`|请求参数的键名映射|`ReqMap`|-|
|`resMap`|响应参数的键名映射|`ResMap`|-|
|`fetchSuccess`|请求成功的回调函数|`() => void`|-|
|`fetchFail`|请求成功的回调函数|`() => void`|-|
|`handleRequest`|处理参数|`() => void`|-|
|`handleResponse`|处理响应数据|`() => void`|-|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`importCfg`|导入的下载模板配置|`TplCfgAttrs`|-|
|`exportCfg`|导出配置|`ExportCfg`|-|
|`cols`|表格列数据|`TableCol[]`|-|
|`sort`|是否展示排序列|`boolean \| UniteFetchType`|-|
|`index`|是否展示序号列|`boolean`|-|
|`selection`|是否展示选择框|`boolean`|-|
|`operateBtns`|操作栏的分组按钮，在表格的操作一栏|`OperateBtnsType`|-|
|`operateBtnsAttrs`|操作栏按钮的配置|`OperateBtnsAttrs`|-|
|`filterByAuth`|按钮权限处理逻辑|`FilterByAuthFn`|-|
|`formAttrs`|`el-form `的属性配置|`FormAttrs`|-|
|`disabled`|是否禁用|`boolean`|-|
|`readonly`|是否只读|`boolean`|-|
|`log`|是否`console.log(rows`)|`boolean`|-|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`isOmit`|是否剔除掉`undefined, `''的属性值|`boolean`|-|
|`size`|整体的控件大小|`CommonSize`|-|
|`compact`|表单项、表格列之间排列是否紧凑点|`boolean`|-|
|`tableAttrs`|`el-table `的属性配置|`TableAttrs`|-|
|`pageAttrs`|分页配置|`CommonObj`|-|
|`pagination`|是否分页|`false \| TablePaginationAttrs`|-|
|`showPagination`|是否显示分页|`boolean`|-|
|`selectAll`|是否选择全部|`boolean`|-|
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|
|`batchBtn`|是否显示批量按钮|`boolean`|-|

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
/src/components/BaseBtn/Index.vue


``` ts




```

:::  


