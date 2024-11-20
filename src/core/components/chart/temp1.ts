export default {
  color: ["#2EB7F5", "#FFAA00", "#F95741", "#5087EC", "#68BBC4", "#58A55C", "#F2BD42", "#EE752F", "#D95040", "#9940D9"],
  tooltip: {
    trigger: "axis",
  },
  legend: {
    y: "96%",
  },
  title: [
    {
      text: "折线图",
      top: "0%",
      left: "25%",
    },
    {
      text: "柱状图",
      top: "0%",
      left: "75%",
    },
    {
      text: "饼状图",
      top: "50%",
      left: "25%",
    },
    {
      text: "折线图",
      top: "50%",
      left: "75%",
    },
  ],
  dataset: [
    {
      source: [
        ["type", "销售额", "订单量", "客单价", "动销率"],
        ["2019-01-01", 100, 20, 4, 30],
        ["2019-01-02", 110, 21, 5, 30],
        ["2019-01-03", 120, 22, 6, 30],
        ["2019-01-04", 140, 23, 7, 30],
        ["2019-01-05", 150, 24, 8, 30],
        ["2019-01-06", 160, 25, 9, 30],
      ],
    },
    {
      source: [
        ["type", "销售额", "订单量", "客单价", "动销率"],
        ["2019-01-01", 100, 20, 44, 30],
        ["2019-01-02", 110, 21, 55, 30],
        ["2019-01-03", 120, 22, 66, 30],
        ["2019-01-04", 140, 23, 72, 30],
        ["2019-01-05", 150, 24, 180, 30],
        ["2019-01-06", 160, 25, 92, 30],
      ],
    },
    {
      source: [
        ["type", "销售额"],
        ["销售额", 100],
        ["订单量", 110],
        ["客单价", 120],
        ["动销率", 150],
      ],
    },
    {
      source: [
        ["type", "销售额", "订单量", "客单价", "动销率"],
        ["2019-01-01", 100, 20, 44, 30],
        ["2019-01-02", 110, 21, 55, 30],
        ["2019-01-03", 120, 22, 66, 30],
        ["2019-01-04", 140, 23, 72, 30],
        ["2019-01-05", 150, 24, 180, 30],
        ["2019-01-06", 160, 25, 92, 30],
      ],
    },
  ],
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eee",
        },
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
      },
      nameTextStyle: {
        color: "#999",
      },
      gridIndex: 0,
      name: "日期",
    },
    {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eee",
        },
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
      },
      nameTextStyle: {
        color: "#999",
      },
      gridIndex: 1,
      name: "日期",
    },
    {
      gridIndex: 2,
      show: false,
    },
    {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eee",
        },
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
      },
      nameTextStyle: {
        color: "#999",
      },
      gridIndex: 3,
      name: "日期",
    },
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eee",
        },
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
      },
      nameTextStyle: {
        color: "#999",
      },
      gridIndex: 0,
      name: "金额($)",
    },
    {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eee",
        },
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
      },
      nameTextStyle: {
        color: "#999",
      },
      gridIndex: 1,
      name: "数量",
    },
    {
      gridIndex: 2,
      show: false,
    },
    {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eee",
        },
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
      },
      nameTextStyle: {
        color: "#999",
      },
      gridIndex: 3,
      name: "%",
    },
  ],
  series: [
    {
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
      smooth: true,
    },
    {
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
      smooth: true,
    },
    {
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
      smooth: true,
    },
    {
      type: "line",
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
      smooth: true,
    },
    {
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      barWidth: 16,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      barWidth: 16,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      barWidth: 16,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      barWidth: 16,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "pie",
      datasetIndex: 2,
      radius: 70,
      center: ["12.5%", "75%"],
    },
    {
      type: "pie",
      datasetIndex: 2,
      radius: [45, 70],
      center: ["37.5%", "75%"],
    },
    {
      type: "line",
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
      smooth: true,
    },
    {
      type: "line",
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
      smooth: true,
    },
    {
      type: "line",
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
      smooth: true,
    },
    {
      type: "line",
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
      smooth: true,
    },
  ],
};
