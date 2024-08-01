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


### 事件

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`||-|
|`extraBtn`||-|
|`groupBtn`||-|
|`selectionChange`||-|
|`rows`||-|
|`dargSortEnd`||-|


### 方法

|方法名|说明|类型|
|:---|:---|:---|
|`refreshList`|-|`unknown`（类型推断）|
|`getList`|-|`unknown`（类型推断）|
|`getQueryParams`|-|`Function`（类型推断）|
|`getQueryFields`|-|`Function`（类型推断）|





## 类型声明
::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/components/crud/BaseCrud/_types.ts
:::  


