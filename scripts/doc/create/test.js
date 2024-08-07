import path from "path";
import { getAtMdStr, writeFileSync, getTsTypeDeclare } from "../utils/file/index.js";
import { docsPath, demosPath, N } from "../utils/consts.js";

/**
 * 写入生成md文档（测试）
 * @param {*} writePath
 * @advice 方法名建议 writeTestMdDoc
 */
export default (writePath = `/4_示例_demo/2_文档生成_create/2_Md 文档_md.md`) => {
  const NN = `${N}${N}`;
  const htmlStr = "单标签：<BaseForm/>。双标签：<div style='color:red'>内容</div/>。空标签：<div></div>";
  const mdStr = "文件标签：`Hello world`。";
  const wordStr = "单个单词：Base。多个单词：Base Form。更多单词：Base Form Item。";
  const sentenceStr = "单句示例：Hello world! 多句示例：Markdown is fun. Here is an HTML tag: an English phrase.";
  const complexStr =
    "这是行内表单的描述。重点介绍了BaseForm的相关API的使用。这是一个html标签<BaseForm/>的示例。完整英文句子示例：Hello, world!这是一个英语短语示例：Basic Form。哈哈哈，这是html标签示例：<div style='display:inline-block'>Content</div>。Markdown is fun. 英文句子示例：Here is an HTML tag: an English phrase. Markdown is fun. md文档标识示例：`hello world`。";
  let fileStr = `# 测试${NN}`;
  fileStr += `## 自动打标签${NN}`;
  fileStr += `### html标签文本${NN}${getAtMdStr(htmlStr)}${NN}`;
  fileStr += `### 已有Tag标识${NN}${getAtMdStr(mdStr)}${NN}`;
  fileStr += `### 英文单词${NN}${getAtMdStr(wordStr)}${NN}`;
  fileStr += `### 英文语句${NN}${getAtMdStr(sentenceStr)}${NN}`;
  fileStr += `### 复杂情况${NN}${getAtMdStr(complexStr)}${NN}`;

  fileStr += `## 从Vue文件中直接获取Ts类型${NN}`;
  const globalPopupDemoPath = `${demosPath}/0_示例_demo/_components/GlobalPopupDemo.vue`;
  const tsStr = getTsTypeDeclare(globalPopupDemoPath);
  fileStr += `${tsStr}${NN}`;

  writePath = path.join(process.cwd(), docsPath, writePath);
  writeFileSync(writePath, fileStr);
};
