# BaseIcon 图标

&emsp;&emsp;目标：占位，方便快速开发。
## 基础用法

&emsp;&emsp;带默认属性值，并可设置属性覆盖（名称、大小等）。

::: demo 
/demos/2_组件_comp/1_基础_basic/1_BaseIcon 图标/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`name`|-|`IconNames`|`defaultIconName`|
|`size`|-|`StrNum`|`1em`|
|`to`|-|`RouteTo \| TSParenthesizedType`|-|
|`data`|`to `的函数要传递的参数|`any`|-|


## 类型声明

::: details


``` ts
export type IconNames = keyof typeof Icons;
```

:::  
