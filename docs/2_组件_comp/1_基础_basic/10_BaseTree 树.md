# BaseTree 树

&emsp;&emsp;继承`el-tree`，并扩展了叶子节点点击事件 `onLeafNodeClick`
## 基础用法

&emsp;&emsp;对`el-tree`进一步处理，方便使用。提供了基础树、过滤树。

::: demo 
/demos/2_组件_comp/1_基础_basic/10_BaseTree 树/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`load`|-|`() => void`|-|
|`lazy`|-|`boolean`|`!!_props.load`|
|`data`|-|`CommonObj[]`|`[]`|
|`slots`|-|`CommonSlots`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`nodeClick`|-|-|
|`leafNodeClick`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`treeRef`|-|`() => void`|
