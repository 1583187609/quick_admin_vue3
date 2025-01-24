# CommonPopup 常用弹窗

&emsp;&emsp;目标：通过打开和关闭两个方法，实现打开/关闭全局弹窗，同时让弹窗属性统一，开发时无需关心属性设置，但支持属性值覆盖。  
&emsp;&emsp;目前只提供了两种弹出层：`dialog `和 `drawer`，默认为 `dialog`。
## 通用弹窗

&emsp;&emsp;适合全局常用的弹窗

::: demo 
/demos/2_组件_comp/10_全局_global/2_CommonPopup 常用弹窗/1_CommonUse.vue
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


## 类型声明

::: details


``` ts
import type {  PopupType,  DialogId,  DrawerId,  FootRenderData,  DialogPopup,  DrawerPopup,  ClosePopupType,  CloseDialogType,  CloseDrawerType,  DialogHeadTypes,  DrawerHeadTypes,} from "./_types";
```

:::  
