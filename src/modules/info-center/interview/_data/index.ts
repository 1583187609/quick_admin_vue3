import temp from "./temp";

export type LevelType = 1 | 2 | 3 | 4 | 5;
export type ClassifyOne = "1" | "2"; // 一级分类
export type ClassifyTwo = "1" | "2"; // 二级分类
export type ClassifyThree = "1" | "2"; // 三级分类
export interface TopicItem {
  question?: string; // 问题
  answer?: string | string[]; // 回答
  content?: string; // 主体内容
  notice?: string; // 注意事项
  parsing?: string; // 解析
  // 程度情况
  levels?: {
    fresh: LevelType; // 新鲜程度
    frequency: LevelType; // 出现频率
    important: LevelType; // 重要程度
    memory: LevelType; // 记忆程度
    score: LevelType; // 得分情况
    backLook: LevelType; // 回看意愿
  };
  _classify: string[]; // 未知分类
  classify_1?: ClassifyOne[]; // 一级分类
  classify_2?: ClassifyTwo[]; // 二级分类
  classify_3?: ClassifyThree[]; // 三级分类
}
const topics: TopicItem[] = [
  {
    question: "questionquestion",
    answer: "answeranswer",
    content: "contentcontent",
    parsing: "parsingparsing",
    levels: {
      fresh: 1,
      frequency: 1,
      important: 1,
      memory: 1,
      score: 1,
      backLook: 1,
    },
    _classify: [],
    classify_1: ["1", "2"],
    classify_2: ["1", "2"],
    classify_3: ["1", "2"],
  },
];
export default [
  { value: 0, label: "测试（临时）", topics: temp },
  { value: 1, label: "目录1", topics: topics },
];

// export default Array(12)
//   .fill("")
//   .map((it, i) => ({ value: i, label: "目录" + (i + 1), topics: topics }));

// const temp = [
//   { question: "前端需要注意哪些SEO", answer: "合理的 title.....排序的⼀个重要指标", _classify: ["HTML 、HTTP 、web综合问题"] },
//   { question: "<img> 的 title 和 alt 有什么区别", answer: "通常当鼠标......阅读图片 。", _classify: ["HTML 、HTTP 、web综合问题"] },
// ];
