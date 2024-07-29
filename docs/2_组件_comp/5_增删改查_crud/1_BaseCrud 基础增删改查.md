# BaseCrud 基础增删改查




## 基础用法
::: demo 摘要介绍暂时略
/demos/5_增删改查_crud/1_BaseCrud 基础增删改查/1_BasicUse.vue
:::


## 内嵌组件
::: demo 内嵌组件的说明
/demos/5_增删改查_crud/1_BaseCrud 基础增删改查/2_Embedded.vue
:::



## API

### 属性

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据|`CommonObj`|-|
|`rowKey`|-|`string`|-|
|`formAttrs`|`el-form`的属性配置|`CommonObj`|-|
|`tableAttrs`|`el-table`的属性配置|`CommonObj`|-|
|`pageAttrs`|分页配置|`CommonObj`|-|
|`disabled`|是否禁用|`boolean`|-|
|`groupBtnsAttrs`|分页配置|`GroupBtnsAttrs`|-|
|`pagination`|是否分页|`false \| PaginationAttrs`|-|
|`fields`|-|`FormField[]`|-|
|`sections`|-|`SectionFieldsItemAttrs[]`|-|
|`cols`|-|`TableField[]`|-|
|`selectAll`|-|`boolean`|-|
|`fetch`|-|`UniteFetchType`|-|
|`fetchSuccess`|请求成功的回调函数|`(res: any) => void`|-|
|`fetchFail`|请求成功的回调函数|`(err: any) => void`|-|
|`immediate`|页面刚创建时是否立即发起请求获取数据|`boolean`|-|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`groupBtns`|分组按钮，在表格的操作一栏|`GroupBtnsType`|-|
|`reqMap`|请求参数的键名映射|`ReqMap`|-|
|`resMap`|响应参数的键名映射|`ResMap`|-|
|`showPagination`|-|`boolean`|-|
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|
|`sort`|是否展示排序列|`boolean \| UniteFetchType`|-|
|`index`|是否展示序号列|`boolean`|-|
|`selection`|是否展示选择框|`boolean`|-|
|`batchBtn`|是否显示批量按钮|`boolean`|-|
|`exportCfg`|-|{|-|
|`limit`|一次性导出数据的上限条数|`number`|-|
|}|-|}|-|
|`importCfg`|导入的下载模板配置|`TplCfgAttrs`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`log`|是否`console.log(rows`)|`boolean`|-|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`isOmit`|是否剔除掉`undefined, `''的属性值|`boolean`|-|
|`changeFetch`|是否`onChang`之后就发送请求（仅限于`Select`类组件，不含`Input`类组件）|`boolean`|-|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|-|
|`filterByAuth`|-|`FilterByAuthFn`|-|
|`colSpanAttrs`|-|`ColSpanAttrs`|-|
|`compact`|表单项之间排列是否紧凑点|`boolean`|-|
|`size`|-|`CommonSize`|-|
|`rowNum`|筛选条件的表单展示几行|`number`|-|
|`handleRequest`|处理参数|`(args: CommonObj) => CommonObj`|-|
|`handleResponse`|处理响应数据|`(res: any) => any`|-|


### 事件

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtn`|-|-|
|`groupBtn`|-|-|
|`selectionChange`|-|-|
|`rows`|-|-|
|`dargSortEnd`|-|-|


### 方法

|方法名|说明|类型|
|:---|:---|:---|
|`refreshList`|-|-|
|`getList`|-|-|
|`getQueryParams`|-|`Function`（类型推断）|
|`return isOmit ? omitAttrs(params`) |-|`Function`（类型推断）|
|}|-|-|
|`getQueryFields(excludeKeys = [reqMap!.curr_page`|-|-|
|`const queryFields`|-|`Array`（类型推断）|
|`const rangeKeys`|-|`Array`（类型推断）|
|`const propFields = queryFormRef.value.getFields`|-|`Function`（类型推断）|
|`propFields.forEach((it`|-|`Function`（类型推断）|
|`if `|-|`Function`（类型推断）|
|`rangeKeys.push`|-|`Function`（类型推断）|
|}) `as unknown as FormFieldAttrs`[]|-|`Array`（类型推断）|
|`for `|-|`Function`（类型推断）|
|`if `|-|`Function`（类型推断）|
|`const target = propFields.find((it`|-|`Function`（类型推断）|
|`if `|-|`Function`（类型推断）|
|`const val = params[prop`]|-|`Array`（类型推断）|
|`if `|-|`Function`（类型推断）|
|`queryFields.push`|-|`Function`（类型推断）|
|`label: target.label`|-|-|
|`value: getQueryFieldValue(target`|-|-|
|`rangeKeys.forEach`|-|`Function`（类型推断）|
|`const [minKey`|-|-|
|`const minVal = params[minKey`]|-|`Array`（类型推断）|
|`const maxVal = params[maxKey`]|-|`Array`（类型推断）|
|`const target = propFields.find((it`|-|`Function`（类型推断）|
|`if `|-|`Function`（类型推断）|
|`queryFields.push`|-|`Function`（类型推断）|
|`label: target.label`|-|-|
|`value: [minVal`|-|-|
|}|-|-|
|`const { rowKey } = props`|-|`Object`（类型推断）|
|`Sortable.create(ele`|-|-|
|`handle: ".sort-cell`"|-|-|
|`animation: 300`|-|-|
|`onEnd(res`|-|`Function`（类型推断）|
|`const { newIndex`|-|-|
|`emits("dargSortEnd`"|-|-|
|`showMessage(tips`)|`newRows.value.splice(newIndex, 0, removeItem); const removeItem = newRows.value.splice(oldIndex, 1)[0`];|-|
|} `else `|-|`Object`（类型推断）|
||(`props.sort as any)({[rowKey`]})|`Function`（类型推断）|
|}|-|-|





## 类型声明
::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/components/crud/BaseCrud/_types.ts
:::  


