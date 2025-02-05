# BaseCopy 复制

&emsp;&emsp;目标：定位为复制文本。提供文本复制功能，并扩展路由跳转、自定义点击时间、同时兼顾复制文本（仅点击图标时可复制）等功能，同时自带样式。
## 基础用法

&emsp;&emsp;支持仅复制、`to`跳转和复制、自定义`click`事件和复制。点击区域和文本区域鼠标样式会自动变化。  
&emsp;&emsp;设置`maxLine`，最多显示几行。

::: demo 
/demos/2_组件_comp/1_基础_basic/4_BaseCopy 复制/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`to`|路由跳转，等价于 `router.push(to)`|`RouteTo`|-|
|`stop`|是否阻止点击事件的冒泡|`boolean`|-|
|`maxLine`|最多显示几行，超出文本会显示省略号|`StrNum`|`1`|
|`clickIconCopy`|是否只当点击图标时才复制文本|`boolean`|`undefined`|
|`successText`|复制成功之后的提示文案|`string`|复制成功|
|`toTooltip`|提示跳转的文案|`string`|点击跳转|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|默认插槽|-|
