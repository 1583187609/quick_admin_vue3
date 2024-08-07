import path from "path";
import {
  N,
  demosPath,
  docsPath,
  writeFileSync,
  getApiTablesStr,
  getFileName,
  getSummaryFileStr,
  getTsTypeDeclare,
} from "../../../scripts/doc/utils/index.js";

/**
 * 测试2
 */
export default async (
  readPath = `${demosPath}/4_示例_demo/2_文档生成_create/_components/StandardDemoForm.vue`,
  writePath = `${docsPath}/5_测试_test/2_测试2_test2.md`
) => {
  const title = getFileName(writePath);
  const sumStr = getSummaryFileStr(readPath, title);
  let fileStr = `${sumStr}${N}`;
  fileStr += `## Info${N}`;
  fileStr += `${await getApiTablesStr(readPath)}${N}`;
  fileStr += `${getTsTypeDeclare(readPath)}${N}`;
  writePath = path.join(process.cwd(), writePath);
  writeFileSync(writePath, fileStr);
};
