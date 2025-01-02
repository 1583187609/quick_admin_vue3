# StaticRoute 静态路由

&emsp;&emsp;目标：内容分块的布局载体。并提供了折叠等功能。
## 基础用法 -->



::: demo 
/demos/3_路由_route/1_静态路由_static/1_StaticRoute 静态路由/1_BasicUse.vue
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

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`toggle`|-|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`head-right`|-|-|
|`default`|-|-|
