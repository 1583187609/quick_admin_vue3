# Echarts 图表

&emsp;&emsp;目标：仅通过传入`data`属性（等价于`echarts`的`dataset`），即可实现图表渲染，而无需关心其他配置，但支持配置覆盖。
## 折线图（Line）

&emsp;&emsp;只需传入一个简单的二维数组即可展示图表。  
&emsp;&emsp;传入`log`可查看渲染此图表的`options`。

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/1_Line.vue
:::
## 柱状图（Bar）

&emsp;&emsp;只需传入一个简单的二维数组即可展示图表。  
&emsp;&emsp;传入`option`可覆盖默认配置

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/2_Bar.vue
:::
## 饼图（Pie）

&emsp;&emsp;只需传入一个简单的一维数组即可展示图表。  
&emsp;&emsp;设置`height`改变高度。

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/3_Pie.vue
:::
## 雷达图（Radar）

&emsp;&emsp;只需传入一个简单的一维数组即可展示图表。

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/4_Radar.vue
:::
## 单例多图

&emsp;&emsp;在一个`dom`元素中，渲染多个图表。  
&emsp;&emsp;`layout`设置行`x`列。

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/5_Charts.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`height`|-|`string \| number`|`300px`|
|`width`|-|`string \| number`|`100%`|
|`theme`|-|`EchartTheme`|`macarons`|
|`option`|-|`CommonObj`|（暂未处理复杂默认值）|
|`renderer`|-|"`canvas" \| "svg"`|-|
|`log`|是否打印`options`|`boolean \| string`|-|
|`use`|-|`any[]`|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`getWidth`|-|`() => void`|
|`getOptions`|-|`() => void`|


## 类型声明

::: details
<<< E:\self\quick_admin_vue3/src/core/components/chart/_types.ts
:::  
