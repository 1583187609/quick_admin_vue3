import path from "path";
import { getWithTagStr, writeFileSync, toCodeBlock, getTsStrByName, getItemsFromTsStr, getTable } from "../utils/file";
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
  fileStr += `### html标签文本\n\n${getWithTagStr(htmlStr)}\n\n`;
  fileStr += `### 已有Tag标识\n\n${getWithTagStr(mdStr)}\n\n`;
  fileStr += `### 英文单词\n\n${getWithTagStr(wordStr)}\n\n`;
  fileStr += `### 英文语句\n\n${getWithTagStr(sentenceStr)}\n\n`;
  fileStr += `### 复杂情况\n\n${getWithTagStr(complexStr)}\n\n`;

  fileStr += `## Ts属性示例\n\n`;
  fileStr += `### Vue Props\n\n`;
  const vueFilePath = "/src/components/form/BaseForm.vue";
  fileStr += `#### Ts类型\n\n${toCodeBlock(getTsStrByName(vueFilePath, "defineProps"), "ts")}\n\n`;
  const hints = getHints({ details: toCodeBlock(getTsStrByName(vueFilePath, "defineProps", true)) });
  fileStr += `${hints}\n\n`;
  const { cols } = tableTypeMap.props;
  const rows = getItemsFromTsStr(getTsStrByName(vueFilePath, "defineProps", true), true);
  // fileStr += `#### 表格展示\n\n${getTable(cols, rows)}\n\n`;
  fileStr += `#### 表格展示\n\n${getTypeTable("props", rows)}\n\n`;

  fileStr += `### TS Interface\n\n`;
  fileStr += `#### Ts 类型\n\n${toCodeBlock(
    getTsStrByName("/examples/0_示例_demo/ts.ts", "interface FormFieldAttrs"),
    "ts"
  )}\n\n`;
  const hints_1 = getHints({
    details: toCodeBlock(getTsStrByName("/examples/0_示例_demo/ts.ts", "interface FormFieldAttrs", true)),
  });
  fileStr += `${hints_1}\n\n`;
  const rows_1 = getItemsFromTsStr(getTsStrByName("/examples/0_示例_demo/ts.ts", "interface FormFieldAttrs", true), true);
  fileStr += `#### 表格展示\n\n${getTable(cols, rows_1)}\n\n`;

  fileStr += `### TS Type\n\n`;
  fileStr += `#### Ts 类型\n\n${toCodeBlock(getTsStrByName("/examples/0_示例_demo/ts.ts", "type FormItemType"), "ts")}\n\n`;
  const hints_2 = getHints({ details: toCodeBlock(getTsStrByName("/examples/0_示例_demo/ts.ts", "type FormItemType", true)) });
  fileStr += `${hints_2}\n\n`;

  writePath = path.join(process.cwd(), docsPath, writePath);
  writeFileSync(writePath, fileStr);
};
