import path from "path";
import { getFileStrByRegexp, getTsFileStrByName, getTsItemsFromVueProps, getWithTagStr, writeFileSync } from "../utils/file";
import { docsPath } from "../utils/consts";
import { getTypeTable } from "./component";

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
  fileStr += `### html标签文本\n\n${getWithTagStr(htmlStr)}\n\n`;
  fileStr += `### 已有Tag标识\n\n${getWithTagStr(mdStr)}\n\n`;
  fileStr += `### 英文单词\n\n${getWithTagStr(wordStr)}\n\n`;
  fileStr += `### 英文语句\n\n${getWithTagStr(sentenceStr)}\n\n`;
  fileStr += `### 复杂情况\n\n${getWithTagStr(complexStr)}\n\n`;
  const rows = getTsItemsFromVueProps("/src/components/form/BaseForm.vue", true);
  fileStr += `## Ts属性示例\n\n`;
  fileStr += `## Vue Props\n\n${getTypeTable("props", rows)}\n\n`;
  // fileStr += `## 获取指定Ts类型 Type\n\n${getTsFileStrByName(
  //   "/src/components/table/_type.ts",
  //   "ColItemType"
  // )}\n\n`;
  // fileStr += `## 获取指定Ts类型 Interface\n\n${getTsFileStrByName(
  //   "/src/components/table/_type.ts",
  //   "TableColAttrs"
  // )}\n\n`;
  fileStr += `## 获取Vue文件的Props\n\n${getFileStrByRegexp(undefined, undefined, false, "ts")}\n\n`;
  fileStr += `## 获取TS文件中指定的Interface\n\n${getTsFileStrByName()}\n\n`;
  fileStr += `## 获取TS文件中指定的Type\n\n${getTsFileStrByName(undefined, "type FormItemType")}\n\n`;
  writePath = path.join(process.cwd(), docsPath, writePath);
  writeFileSync(writePath, fileStr);
};
