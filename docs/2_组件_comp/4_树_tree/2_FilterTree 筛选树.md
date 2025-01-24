# FilterTree 筛选树

&emsp;&emsp;继承自`BaseTree`，带过滤条件的树。
## 基础用法



::: demo 
/demos/2_组件_comp/4_树_tree/2_FilterTree 筛选树/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`class`|外层盒子的类名|`any`|-|
|`style`|外层盒子的样式|`any`|-|
|`inputAttrs`|-|`CommonObj`|-|
|`options`|-|`OptionItem[]`|-|
|`defaultSelectValue`|-|`number`|`0`|
|`filterNodeMethod`|-|`() => void`|（暂未处理复杂默认值）|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`baseTreeRef`|-|`() => void`|


## 类型声明

::: details
<<< E:\self\quick_admin_vue3/src/core/components/tree/_types.ts
:::  
