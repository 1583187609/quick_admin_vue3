# BaseImg 图片

&emsp;&emsp;目标：定位为基础图片。用作占位，实现快速开发，兼顾细节处理：加载动效、错误提示、图片预览、路由快捷跳转、默认底图等。
## 基础用法

&emsp;&emsp;提供了加载中、加载失败图标状态，默认底图展示。图片预览功能、路由跳转功能。  
&emsp;&emsp;默认可以预览，但当存在`to`属性或`onClick`事件时，不能预览。

::: demo 
/demos/2_组件_comp/1_基础_basic/6_BaseImg 图片/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`size`|-|`StrNum`|-|
|`iconSize`|-|`number`|`getCssNum(size) ?? Math.max(getCssNum(width) ?? 0, getCssNum(height) ?? 0)) * 0.`|
|`width`|-|`StrNum`|-|
|`height`|-|`StrNum`|-|
|`to`|-|`RouteTo`|-|
|`src`|-|`string`|-|
|`round`|-|`boolean`|-|
|`stop`|点击图片时，是否阻止冒泡|`boolean`|-|
|`preview`|-|`boolean`|`true`|
|`loadTips`|-|`string`|玩命加载中…|
|`errTips`|-|`string`|加载失败|
|`errImgSrc`|-|`string`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`error`|-|-|


## 类型声明

::: details


``` ts
export type ImgFitType = "fill" | "contain" | "cover" | "none" | "scale-down";
```

:::  
