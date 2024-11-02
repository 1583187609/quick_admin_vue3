# BaseCopy 复制文本


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
|`clickIconCopy`|是否只当点击图标时才复制文本|`boolean`|`!!_props.to`|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`click`|-|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|默认插槽|-|


## 类型声明

::: details
/src/core/BaseCopy.vue
:::  
