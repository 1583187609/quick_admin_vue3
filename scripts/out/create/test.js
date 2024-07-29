import path from "path";
import {
  getAtMdStr,
  writeFileSync,
  toCodeBlock,
  getTsOrObjStrByName,
  getItemsFromTsStr,
  getTable,
  getTsDeclareFromVueFile,
} from "../utils/file";
import { docsPath } from "../utils/consts";
import { getHints, getTypeTable, tableTypeMap } from "./component";

/**
 * 写入生成md文档（测试）
 * @param {*} writePath
 * @advice 方法名建议 writeTestMdDoc
 */
export default (writePath = `/4_示例_demo/2_文档生成_create/2_Md 文档_md.md`) => {
  const htmlStr = "单标签：<BaseForm/>。双标签：<div style='color:red'>内容</div/>。空标签：<div></div>";
  const mdStr = "文件标签：`Hello world`。";
  const wordStr = "单个单词：Base。多个单词：Base Form。更多单词：Base Form Item。";
  const sentenceStr = "单句示例：Hello world! 多句示例：Markdown is fun. Here is an HTML tag: an English phrase.";
  const complexStr =
    "这是行内表单的描述。重点介绍了BaseForm的相关API的使用。这是一个html标签<BaseForm/>的示例。完整英文句子示例：Hello, world!这是一个英语短语示例：Basic Form。哈哈哈，这是html标签示例：<div style='display:inline-block'>Content</div>。Markdown is fun. 英文句子示例：Here is an HTML tag: an English phrase. Markdown is fun. md文档标识示例：`hello world`。";
  let fileStr = "# 测试\n\n";
  fileStr += `## 自动打标签\n\n`;
  fileStr += `### html标签文本\n\n${getAtMdStr(htmlStr)}\n\n`;
  fileStr += `### 已有Tag标识\n\n${getAtMdStr(mdStr)}\n\n`;
  fileStr += `### 英文单词\n\n${getAtMdStr(wordStr)}\n\n`;
  fileStr += `### 英文语句\n\n${getAtMdStr(sentenceStr)}\n\n`;
  fileStr += `### 复杂情况\n\n${getAtMdStr(complexStr)}\n\n`;

  fileStr += `## Ts属性示例\n\n`;
  fileStr += `### Vue Props\n\n`;
  const vueFilePath = "/src/components/form/BaseForm.vue";
  fileStr += `#### Ts类型\n\n${toCodeBlock(getTsOrObjStrByName(vueFilePath, "defineProps").matchStr, "ts")}\n\n`;
  const hints = getHints({ details: toCodeBlock(getTsOrObjStrByName(vueFilePath, "defineProps", true).matchStr) });
  fileStr += `${hints}\n\n`;
  const { cols } = tableTypeMap.props;
  const rows = getItemsFromTsStr(getTsOrObjStrByName(vueFilePath, "defineProps", true).matchStr, true);
  // fileStr += `#### 表格展示\n\n${getTable(cols, rows)}\n\n`;
  fileStr += `#### 表格展示\n\n${getTypeTable("props", rows)}\n\n`;

  fileStr += `### TS Interface\n\n`;
  fileStr += `#### Ts 类型\n\n${toCodeBlock(
    getTsOrObjStrByName("/examples/0_示例_demo/_typescript/standard.ts", "interface FormFieldAttrs").matchStr,
    "ts"
  )}\n\n`;
  const hints_1 = getHints({
    details: toCodeBlock(
      getTsOrObjStrByName("/examples/0_示例_demo/_typescript/standard.ts", "interface FormFieldAttrs", true).matchStr
    ),
  });
  fileStr += `${hints_1}\n\n`;
  const rows_1 = getItemsFromTsStr(
    getTsOrObjStrByName("/examples/0_示例_demo/_typescript/standard.ts", "interface FormFieldAttrs", true).matchStr,
    true
  );
  fileStr += `#### 表格展示\n\n${getTable(cols, rows_1)}\n\n`;

  fileStr += `### TS Type\n\n`;
  fileStr += `#### Ts 类型\n\n${toCodeBlock(
    getTsOrObjStrByName("/examples/0_示例_demo/_typescript/standard.ts", "type FormItemType").matchStr,
    "ts"
  )}\n\n`;
  const hints_2 = getHints({
    details: toCodeBlock(
      getTsOrObjStrByName("/examples/0_示例_demo/_typescript/standard.ts", "type FormItemType", true).matchStr
    ),
  });
  fileStr += `${hints_2}\n\n`;

  const scriptStr = getTsDeclareFromVueFile("/examples/0_示例_demo/_components/GlobalPopupDemo.vue");
  fileStr += `## 从Vue文件中直接获取Ts类型\n\n${toCodeBlock(scriptStr, "ts")}\n\n`;

  writePath = path.join(process.cwd(), docsPath, writePath);
  writeFileSync(writePath, fileStr);
};
