# BaseIcon 图标


## 基础用法

&emsp;&emsp;默认图标，方便快速开发（占位，省去引入图标再使用的时间），并可设置名称、大小属性覆盖。

::: demo 
/demos/2_组件_comp/1_基础_basic/1_BaseIcon 图标/1_BasicUse.vue
:::



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`name`|-|`IconNames`|`defaultIconName`|
|`size`|-|`StrNum`|`1em`|



## 类型声明
::: details
/src/core/BaseIcon.vue

``` ts


export type IconNames = keyof typeof Icons;


```

:::  


