type LevelType = 1 | 2 | 3 | 4 | 5; // 1~5 很差、较差、一般、较好、很好

interface LevelItem {
  value: number; // id值
  label: string; // 例：新鲜程度
  level: LevelType;
  icon: any; // 图标
  words: [string, string]; // 程度关键词，例：["老", "新"]
}

type ListItem = string | { content: string; list: ListItem[] };
interface TableData {
  cols: CommonObj[];
  rows: CommonObj[];
}
interface TopicItem {
  id: number; // 题目id
  levels: LevelItem[]; //程度说明
  question: string; // 问题
  content: string;
  // 内容
  // content: {
  //   list?: ListItem[]; // 罗列条例点
  //   table?: TableData;
  // };
  // 注意事项
  // notice?: {
  //   info?: string;
  //   danger?: string;
  //   warning?: string;
  // };
}
export const list: TopicItem[] = [
  { id: 1, levels: [], question: "前端需要注意哪些SEO？", content: "" },
  { id: 1, levels: [], question: "HTML", content: "" },
];
