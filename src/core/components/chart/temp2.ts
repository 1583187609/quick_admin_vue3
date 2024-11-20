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
      gridIndex: 0,
      name: "日期",
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
    },
    {
      type: "category",
      gridIndex: 1,
      name: "日期",
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
    },
    {
      show: false,
      gridIndex: 2,
    },
    {
      type: "category",
      gridIndex: 3,
      name: "日期",
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
    },
  ],
  yAxis: [
    {
      type: "value",
      gridIndex: 0,
      name: "金额($)",
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
    },
    {
      type: "value",
      gridIndex: 1,
      name: "数量",
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
    },
    {
      show: false,
      gridIndex: 2,
    },
    {
      type: "value",
      gridIndex: 3,
      name: "%",
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
    },
  ],
  grid: [
    {
      top: "10%",
      left: "2%",
      height: "32%",
      width: "45%",
    },
    {
      top: "10%",
      left: "55%",
      height: "32%",
      width: "45%",
    },
    {
      top: "58%",
      left: "2%",
      height: "32%",
      width: "45%",
    },
    {
      top: "58%",
      left: "55%",
      height: "32%",
      width: "45%",
    },
  ],
  series: [
    {
      type: "line",
      smooth: true,
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 0,
      yAxisIndex: 0,
      datasetIndex: 0,
    },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "bar",
      barWidth: 16,
      xAxisIndex: 1,
      yAxisIndex: 1,
      datasetIndex: 1,
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
    {
      type: "pie",
      radius: 70,
      center: ["12.5%", "75%"],
      datasetIndex: 2,
    },
    {
      type: "pie",
      radius: [45, 70],
      center: ["37.5%", "75%"],
      datasetIndex: 2,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
    {
      type: "line",
      smooth: true,
      xAxisIndex: 3,
      yAxisIndex: 3,
      datasetIndex: 3,
    },
  ],
};
