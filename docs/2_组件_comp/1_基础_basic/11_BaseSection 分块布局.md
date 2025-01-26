# BaseSection 分块布局

&emsp;&emsp;目标：内容分块的布局载体。并提供了折叠等功能。
## 基础用法

&emsp;&emsp;提供内容分块的布局容器。用于表单字段分块、页面内容分块等场景。

::: demo 
/demos/2_组件_comp/1_基础_basic/11_BaseSection 分块布局/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`title`|-|`string`|未命名标题|
|`popover`|-|`PopoverType`|-|
|`badgeAttrs`|-|`CommonObj`|-|
|`foldable`|-|`boolean`|-|
|`border`|-|`boolean`|`true`|
|`bodyClass`|-|`string`||
|`bodyMaxHeight`|-|`string`|`90vh`|
|`defaultFold`|-|`boolean`|-|
|`gap`|-|`boolean`|`true`|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`toggle`|-|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`head-right`|-|-|
|`default`|-|-|
