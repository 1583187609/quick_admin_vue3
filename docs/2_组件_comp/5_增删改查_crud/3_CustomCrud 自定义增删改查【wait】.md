# CustomCrud 自定义增删改查  <Badge class="title-badge" type="danger" text="wait" />

::: danger 待完善
本功能暂不可用，敬请期待！
:::

&emsp;&emsp;目标：基础增删改查的扩展，每一项元素的呈现样式可以自定义。
## 相册

&emsp;&emsp;这是相册的摘要描述

::: demo 
/demos/2_组件_comp/5_增删改查_crud/3_CustomCrud 自定义增删改查【wait】/1_Photos.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据，可设默认值|`CommonObj`|-|
|`fields`|表单字段|`FormField[]`|`[]`|
|`sections`|分块的表单字段|`SectionFormItemAttrs[]`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`changeFetch`|是否`onChang`之后就发送请求（仅限于`Select`类组件，不含`Input`类组件）|`boolean`|`true`|
|`immediateFetch`|页面刚准备好时是否发送请求|`boolean`|`true`|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|`true`|
|`grid`|栅格配置，同`ElementPlus`的`el-col`的属性|`Grid`|{ ...`defaultGridAttrsMap[_props.size ?? defaultCommonSize`] }|
|`rowNum`|筛选条件的(表单)展示几行|`number`|-|
|`formAttrs`|`el-form `的属性配置|`FormAttrs`|`defaultFormAttrs`|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`importCfg`|导入的下载模板配置|`ImportCfgAttrs`|-|
|`exportCfg`|导出配置|`ExportCfg`|{ `limit: 10000 `}|
|`showSetBtn`|-|`boolean`|`true`|
|`cols`|表格列数据|`TableCol[]`|`[]`|
|`operateBtns`|操作栏的分组按钮，在表格的操作一栏|`OperateBtnsType`|-|
|`operateBtnsAttrs`|操作栏按钮的配置|`OperateBtnsAttrs`|-|
|`handleAuth`|按钮权限处理逻辑|`HandleAuthFn`|-|
|`tableAttrs`|`el-table `的属性配置|`TableAttrs`|`defaultTableAttrs`|
|`pageSizeNum`|分页大小，如果为`0`，则不按分页条件查询|`number`|`20`|
|`showPagination`|是否显示分页|`boolean`|`!!_props.pageSizeNum`|
|`omits`|是否剔除掉`null, undefined, ""`的属性值|`boolean \| Array`|`true`|
|`size`|整体的控件大小|`CommonSize`|-|
|`readonly`|是否只读|`boolean`|-|
|`disabled`|是否禁用|`boolean`|-|
|`log`|是否打印`console.log(data)`|`boolean \| "req" \| "res"`|`isDev`|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`reqResMap`|请求/响应参数的键名映射|`ReqResMap`|-|
|`fetch`|-|`UniteFetchType`|-|
|`afterSuccess`|请求成功的回调函数|`() => void`|-|
|`afterFail`|请求成功的回调函数|`() => void`|-|
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtns`|-|-|
|`selectionChange`|-|-|
|`rows`|-|-|
|`dargSortEnd`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|-|`() => void`|
|`tableRef`|-|`() => void`|
|`getList`|-|`() => void`|
|`refreshList`|-|`() => void`|
|`getQueryParams`|获取查询参数|`() => void`|
|`getQueryFields`|获取查询字段|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`field.prop as string`|-|`name, field`|
|`middle`|中间插槽|-|
|`content`|内容插槽|`loading, data, total, hasMore, params, onOperateBtns`|
|`col.prop as string`|-|`row, col, $index, name`|
|`default`|默认插槽|-|
