# BaseCrud 基础增删改查


## BasicUse
::: demo 
/demos/5_增删改查_crud/1_BaseCrud 基础增删改查/1_BasicUse.vue
:::


## Embedded
::: demo 
/demos/5_增删改查_crud/1_BaseCrud 基础增删改查/2_Embedded.vue
:::



### Index

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|-|`CommonObj`|-|
|`rowKey`|-|`string`|-|
|`formAttrs`|-|`CommonObj`|-|
|`tableAttrs`|-|`CommonObj`|-|
|`pageAttrs`|-|`CommonObj`|-|
|`disabled`|-|`boolean`|-|
|`groupBtnsAttrs`|-|`GroupBtnsAttrs`|-|
|`pagination`|-|`false \| PaginationAttrs`|-|
|`fields`|-|`FormField[ ]`|-|
|`sections`|-|`SectionFieldsItemAttrs[ ]`|-|
|`cols`|-|`TableField[ ]`|-|
|`selectAll`|-|`boolean`|-|
|`fetch`|-|`UniteFetchType`|-|
|`fetchSuccess`|-|`() => void`|-|
|`fetchFail`|-|`() => void`|-|
|`immediate`|-|`boolean`|-|
|`extraBtns`|-|`BaseBtnType[ ]`|-|
|`groupBtns`|-|`GroupBtnsType`|-|
|`reqMap`|-|`ReqMap`|-|
|`resMap`|-|`ResMap`|-|
|`showPagination`|-|`boolean`|-|
|`summaryList`|-|`SummaryListType`|-|
|`sort`|-|`boolean \| UniteFetchType`|-|
|`index`|-|`boolean`|-|
|`selection`|-|`boolean`|-|
|`batchBtn`|-|`boolean`|-|
|`exportCfg`|-|{
  `limit: number`; //一次性导出数据的上限条数
}|-|
|`importCfg`|-|`TplCfgAttrs`|-|
|`extraParams`|-|`CommonObj`|-|
|`log`|-|`boolean`|-|
|`debug`|-|`boolean`|-|
|`isOmit`|-|`boolean`|-|
|`changeFetch`|-|`boolean`|-|
|`inputDebounce`|-|`boolean`|-|
|`filterByAuth`|-|`FilterByAuthFn`|-|
|`colSpanAttrs`|-|`ColSpanAttrs`|-|
|`compact`|-|`boolean`|-|
|`size`|-|`CommonSize`|-|
|`rowNum`|-|`number`|-|
|`handleRequest`|-|`() => void`|-|
|`handleResponse`|-|`() => void`|-|

### Index

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtn`|-|-|
|`groupBtn`|-|-|
|`selectionChange`|-|-|
|`rows`|-|-|
|`dargSortEnd`|-|-|

### Index

|方法名|说明|类型|
|:---|:---|:---|
|`refreshList`|-|`() => void`|
|`getList`|-|`() => void`|
|`getQueryParams`|-|`() => void`|
|`getQueryFields`|-|`() => void`|

### Index

|插槽名|说明|Scope|
|:---|:---|:---|
|`field.prop`|-|`name, field, form`|
|`middle`|-|-|
|`default`|-|`loading, rows, total, hasMore, params, onGroupBtn`|
|`col.prop`|-|`row, col, $index, name`|



## 类型声明
::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/components/crud/BaseCrud/_types.ts
:::  


