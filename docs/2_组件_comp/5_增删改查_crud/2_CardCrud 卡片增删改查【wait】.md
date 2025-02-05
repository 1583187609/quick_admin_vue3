# CardCrud 卡片增删改查  <Badge class="title-badge" type="danger" text="wait" />

::: danger 待完善
本功能暂不可用，敬请期待！
:::

&emsp;&emsp;目标：基础增删改查的扩展，每一项元素的呈现样式为卡片。


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


## 类型声明

::: details


``` ts
export type AboutCode = 0 | 1; //| "aboutMe" | "aboutYou";
export type ItemType = "avatar-audit" | "avatar-patrol" | "about" | "photo" | "face";
export type AuditStatus = 0 | 1 | 2; // 0通过 1驳回 2未审核
```

:::  
