# BaseTree 基础树

&emsp;&emsp;继承`el-tree`，并扩展了叶子节点点击事件 `onLeafNodeClick`
## 基础用法



::: demo 
/demos/2_组件_comp/4_树_tree/1_BaseTree 基础树/1_BasicUse.vue
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


## 类型声明

::: details
<<< E:\self\quick_admin_vue3/src/core/components/tree/_types.ts
:::  
