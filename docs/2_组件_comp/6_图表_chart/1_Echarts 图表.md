# Echarts 图表


## 折线图（Line）
::: demo 只需传入一个简单的二维数组即可展示图表
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/1_Line.vue
:::


## 柱状图（Bar）
::: demo 只需传入一个简单的二维数组即可展示图表
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/2_Bar.vue
:::


## 饼图（Pie）
::: demo 只需传入一个简单的一维数组即可展示图表
/demos/2_组件_comp/6_图表_chart/1_Echarts 图表/3_Pie.vue
:::



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`height`|-|`string \| number`|"`300px`"|
|`width`|-|`string \| number`|"`100`%"|
|`theme`|-|`EchartTheme`|"`macarons`"|
|`option`|-|`CommonObj`|{
  `return `{
    `title`: {
      `text: "ECharts `入门示例",
    },
    `tooltip`: {},
    `xAxis`: {
      `data`: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    `yAxis`: {},
    `series`: [
      {
        `name`: "销量",
        `type: "bar`",
        `data: [5, 20, 36, 10, 10, 20`],
      },
    ],
  };
}|



## 类型声明
::: details
/src/components/chart/_config/types.ts

<<< E:\Quick-Admin\quick_admin_vue3/src/components/chart/_config/types.ts
:::  


