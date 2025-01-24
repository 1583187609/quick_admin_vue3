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
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|
|`handleAuth`|-|`HandleButtonAuth`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtns`|-|-|
|`selectionChange`|-|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`list`|-|`list, total, hasMore`|
