# Echarts 图表


## 折线图（Line）

&emsp;&emsp;只需传入一个简单的二维数组即可展示图表

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/1_Line.vue
:::

## 柱状图（Bar）

&emsp;&emsp;只需传入一个简单的二维数组即可展示图表

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/2_Bar.vue
:::

## 饼图（Pie）

&emsp;&emsp;只需传入一个简单的一维数组即可展示图表

::: demo 
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/3_Pie.vue
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
|`getOptions`|-|`() => void`|


## 类型声明

::: details
/src/core/chart/_config/types.ts<<< E:\Quick-Admin\quick_admin_vue3/src/core/chart/_config/types.ts
:::  
