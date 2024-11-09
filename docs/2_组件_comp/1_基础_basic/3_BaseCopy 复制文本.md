# BaseCopy 复制文本

&emsp;&emsp;目标：定位为复制文本。提供文本复制功能，并扩展路由跳转、自定义点击时间、同时兼顾复制文本（仅点击图标时可复制）等功能，同时自带样式。
## 基础用法



::: demo 
/demos/2_组件_comp/1_基础_basic/3_BaseCopy 复制文本/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`to`|-|`RouteTo \| TSParenthesizedType`|-|
|`data`|-|`CommonObj`|-|
|`text`|-|`StrNum`|-|
|`line`|最多显示几行，超出文本会显示省略号|`StrNum`|`1`|
|`stop`|是否阻止点击事件的冒泡|`boolean`|-|
|`clickIconCopy`|是否只当点击图标时才复制文本|`boolean`|`undefined`|
|`successTips`|-|`string`|复制成功！|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|默认插槽|-|
