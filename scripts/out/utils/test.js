import path from "path";
import { getWithTagStr, writeFileSync } from "./file";
import { docsPath } from "./consts";

/**
 * 写入测试文件
 * @param {*} writePath
 */
export function writeTestFile(writePath = `/5_测试_test/2_Test.md`) {
  const htmlStr = "单标签：<BaseForm/>。双标签：<div style='color:red'>内容</div/>。空标签：<div></div>";
  const mdStr = "文件标签：`Hello world`。";
  const wordStr = "单个单词：Base。多个单词：Base Form。更多单词：Base Form Item。";
  const sentenceStr = "单句示例：Hello world! 多句示例：Markdown is fun. Here is an HTML tag: an English phrase.";
  const complexStr =
    "这是行内表单的描述。重点介绍了BaseForm的相关API的使用。这是一个html标签<BaseForm/>的示例。完整英文句子示例：Hello, world!这是一个英语短语示例：Basic Form。哈哈哈，这是html标签示例：<div style='display:inline-block'>Content</div>。Markdown is fun. 英文句子示例：Here is an HTML tag: an English phrase. Markdown is fun. md文档标识示例：`hello world`。";
  let fileStr = "# 测试\n\n## 自动打标签\n\n";
  fileStr += `### html标签文本\n\n${getWithTagStr(htmlStr)}\n\n`;
  fileStr += `### 已有Tag标识\n\n${getWithTagStr(mdStr)}\n\n`;
  fileStr += `### 英文单词\n\n${getWithTagStr(wordStr)}\n\n`;
  fileStr += `### 英文语句\n\n${getWithTagStr(sentenceStr)}\n\n`;
  fileStr += `### 复杂情况\n\n${getWithTagStr(complexStr)}\n\n`;
  writePath = path.join(process.cwd(), docsPath, writePath);
  writeFileSync(writePath, fileStr);
}
