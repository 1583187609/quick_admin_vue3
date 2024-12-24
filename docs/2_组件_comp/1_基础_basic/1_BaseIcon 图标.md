# BaseIcon 图标

&emsp;&emsp;目标：占位，方便快速开发。
## 基础用法

&emsp;&emsp;属性可设置：`name`（图标类型）、`size`（图标大小）、`to`（跳转链接，等同于 `router.push(to)`）

::: demo 
/demos/2_组件_comp/1_基础_basic/1_BaseIcon 图标/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`name`|-|`IconNames`|`defaultIconName`|
|`size`|-|`StrNum`|`1em`|
|`to`|-|`RouteTo`|-|


## 类型声明

::: details


``` ts
export type IconNames = keyof typeof Icons;
```

:::  
